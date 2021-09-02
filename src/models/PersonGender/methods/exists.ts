import type {PersonGenderType} from '..';
import {PersonGenderModel} from '../schema';

/**
 * Check if a person gender exists
 *
 * @param {PersonGenderType} filter - Person gender object filter
 * @returns {boolean}
 */
export default async function (filter: PersonGenderType): Promise<boolean> {
  const exists = await PersonGenderModel.findOne(filter).exec();

  return !!exists;
}
