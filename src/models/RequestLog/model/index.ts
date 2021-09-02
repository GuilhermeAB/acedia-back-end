import ValidationError from 'src/util/Error/validation-error';
import {uuidValidateV4} from 'src/util/uuid';
import {v4 as uuidv4} from 'uuid';
import type {RequestLogType} from '..';

export default function makeRequestLog (log: RequestLogType): Readonly<RequestLogType> {
  if (log._id && !uuidValidateV4(log._id)) {
    throw new ValidationError('ID_INVALID', 'Invalid identifier');
  }

  return Object.freeze({
    _id: log._id || uuidv4(),
    ip: log.ip,
    requestUserAgent: log.requestUserAgent,
    requestPath: log.requestPath,
    requestType: log.requestType,
    requestHeaders: log.requestHeaders,
    requestBody: log.requestBody,
    requestQuery: log.requestQuery,
    requestParams: log.requestParams,
    responseCode: log.responseCode,
    error: log.error,
    errorStacktrace: log.errorStacktrace,
    startedAt: log.startedAt,
    endedAt: log.endedAt
  });
}
