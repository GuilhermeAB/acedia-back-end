import type {ClientSession} from 'mongoose';
import type {PersonType} from '..';
import {PersonModel} from '../schema';

/**
 * Get person list
 *
 * Get all person
 * @param {ClientSession} session
 * @returns a person array or empty array if no one is found
 */
export default async function (session?: ClientSession): Promise<PersonType[]> {
  const result = await PersonModel.find({}, null, {session: session});

  return result;
}
