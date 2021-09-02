import type {ClientSession} from 'mongoose';
import type {PersonGenderType} from '..';
import makePersonGender from '../model';
import {PersonGenderModel} from '../schema';

type NewPersonType = {
  gender: PersonGenderType,
  isNew: boolean,
};

/**
 * Add person gender
 *
 * Save a new person gender. If a person gender with the same code already exists returns the person gender else creates a new one.
 *
 * @param {PersonGenderType} gender - Person gender without _id
 * @param {ClientSession} session
 *
 * @returns {NewPersonType} A object with 'gender' and 'isNew' properties
 */
export default async function (gender: PersonGenderType, session?: ClientSession): Promise<NewPersonType> {
  const exists = await PersonGenderModel.findOne({code: gender.code}).exec();
  if (exists) {
    return {
      gender: exists,
      isNew: false
    };
  }
  const personGender = makePersonGender(gender);

  const result = new PersonGenderModel(personGender);
  await result.save({session: session});

  return {
    gender: result,
    isNew: true
  };
}
