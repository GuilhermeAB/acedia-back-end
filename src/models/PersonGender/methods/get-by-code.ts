import type {ClientSession} from 'mongoose';
import type {PersonGenderType} from '..';
import {PersonGenderModel} from '../schema';

/**
 * Get person gender by code
 *
 * @param {string} code - Person gender code
 * @param {ClientSession} session
 *
 * @return {PersonGenderType | null} Return a person gender or null if not found
 */
export default async function (code: string, session?: ClientSession): Promise<PersonGenderType | null> {
  const result = await PersonGenderModel.findOne({code: code}, null, {session: session});

  return result;
}
