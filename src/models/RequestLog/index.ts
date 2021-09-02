import add from './methods/add';

export type RequestLogType = {
  _id?: string,
  ip?: string,
  requestUserAgent?: string,
  requestPath: string,
  requestType?: string,
  requestHeaders?: string,
  requestBody?: string,
  requestQuery?: string,
  requestParams?: string,
  responseCode?: string,
  error?: string,
  errorStacktrace?: string,
  startedAt: Date,
  endedAt: Date,
};

export default {
  add: add
};
