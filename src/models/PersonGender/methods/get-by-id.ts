import type {ClientSession} from 'mongoose';
import type {PersonGenderType} from '..';
import {PersonGenderModel} from '../schema';

/**
 * Get person gender by id
 *
 * @param {string} id - Person gender id
 * @param {ClientSession} session
 *
 * @return {PersonGenderType | null} Return a person gender or null if not found
 */
export default async function (id: string, session?: ClientSession): Promise<PersonGenderType | null> {
  const result = await PersonGenderModel.findOne({_id: id}, null, {session: session});

  return result;
}
