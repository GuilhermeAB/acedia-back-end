import type {ClientSession} from 'mongoose';
import type {RequestLogType} from '..';
import makeRequestLog from '../model';
import {RequestLogModel} from '../schema';

/**
 * Add a new request log
 *
 * @param {RequestLogType} log - Log object without _id
 * @param {ClientSession} session
 * @returns {RequestLogType} a request log type object
 */
export default async function (log: RequestLogType, session?: ClientSession): Promise<RequestLogType> {
  const newLog = makeRequestLog(log);
  const result = new RequestLogModel(newLog);
  await result.validate();
  await result.save({session: session});
  const item = result.toJSON();

  return item;
}
