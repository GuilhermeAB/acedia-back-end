import {model, Schema} from 'mongoose';
import type {RequestLogType} from '..';

export const REQUEST_LOG = 'Request_log';

export const requestLogSchema = new Schema({
  _id: String,
  ip: String,
  requestUserAgent: String,
  requestPath: String,
  requestType: String,
  requestHeaders: String,
  requestBody: String,
  requestQuery: String,
  requestParams: String,
  responseCode: String,
  error: String,
  errorStackTrace: String,
  startedAt: Date,
  endedAt: Date
});

export const RequestLogModel = model<RequestLogType>(REQUEST_LOG, requestLogSchema);
