import type {
  NextFunction, Request, RequestHandler, Response
} from 'express';
import {validationResult} from 'express-validator';
import type {ClientSession} from 'mongoose';
import {db} from 'src/database';
import RequestLog from 'src/models/RequestLog';
import ValidationError from 'src/util/Error/validation-error';

export type CallBackType = (request: Request, response: Response, session?: ClientSession) => Promise<Response>;
export type CallBackOptionsType = {
  session: boolean,
};

export default (callback: CallBackType, options: CallBackOptionsType = {session: true}): RequestHandler => async (request: Request, response: Response, next: NextFunction): Promise<Response> => {
  let session;

  const requestStartedAt = new Date();

  let logError;
  let logErrorStacktrace;
  try {
    // Request parameter validation - express-validator
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      logError = {
        messages: {
          errors: errors.array({onlyFirstError: true}).map((error: any) => ({
            code: error.msg.code,
            message: error.msg.message
          }))
        }
      };

      return response.status(400).json(logError);
    }

    if (options.session) {
      session = await db.startSession();
      session.startTransaction();
    }

    const result = await callback(request, response, session);

    if (session) {
      await session.commitTransaction();
    }

    return result;
  } catch (e: any) {
    if (session) {
      await session.abortTransaction();
    }

    if (e instanceof ValidationError) {
      const code: number | undefined = e.getDetails()?.code && parseInt(e.getDetails()?.code as string, 10);

      logError = {
        messages: {
          error: {
            code: e.getCode(),
            message: e.getMessage(),
            details: e.getDetails()
          }
        }
      };
      logErrorStacktrace = e.stack;

      return response.status(code || 400).json(logError);
    }

    logError = {
      messages: {
        error: {
          code: 'INTERNAL_ERROR',
          message: 'An internal error occurred'
        }
      }
    };
    logErrorStacktrace = e.stack;

    next(e);

    return response.status(500).json(logError);
  } finally {
    if (session) {
      session.endSession();
    }

    const requestIp = require('request-ip');
    const ip = requestIp.getClientIp(request);
    const userAgent = request.get('User-Agent');

    const {
      path, method, body, query, params, headers
    } = request;

    if (body.password) {
      body.password = '*****';
    }

    if (body.newPassword) {
      body.newPassword = '*****';
    }

    if (body.currentPassword) {
      body.currentPassword = '*****';
    }

    if (headers && headers.cookie) {
      headers.cookie = '*****';
    }

    RequestLog.add({
      ip: ip,
      requestUserAgent: userAgent,
      requestPath: path,
      requestType: method,
      requestHeaders: JSON.stringify(headers),
      requestBody: JSON.stringify(body),
      requestQuery: JSON.stringify(query),
      requestParams: JSON.stringify(params),
      responseCode: response.statusCode.toString(),
      error: logError ? JSON.stringify(logError) : undefined,
      errorStacktrace: logErrorStacktrace,
      startedAt: requestStartedAt,
      endedAt: new Date()
    });
  }
};
