import type {ClientSession} from 'mongoose';
import type {PersonGenderType} from '..';
import {PersonGenderModel} from '../schema';

/**
 * Get person gender list
 *
 * Get all person genders
 * @param {ClientSession} session
 * @returns a person gender array or empty array if no one is found
 */
export default async function (session?: ClientSession): Promise<PersonGenderType[]> {
  const result = await PersonGenderModel.find({}, null, {session: session});

  return result;
}
