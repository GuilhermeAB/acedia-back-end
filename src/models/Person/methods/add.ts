import type {ClientSession} from 'mongoose';
import PersonGender from 'src/models/PersonGender';
import ValidationError from 'src/util/Error/validation-error';
import type {PersonType} from '..';
import makePerson from '../model';
import {PersonModel} from '../schema';

/**
 * Add a new person
 *
 * @param {PersonType} person - Person without _id
 * @param {ClientSession} session
 *
 * @returns {PersonType} a person type object
 */
export default async function (person: PersonType, session?: ClientSession): Promise<PersonType> {
  if (person._id) {
    throw new ValidationError('PERSON_ALREADY_EXIST', 'Person already exists');
  }

  // Get person gender by id
  const gender = await PersonGender.getById(person.gender!._id!, session);
  if (!gender) {
    throw new ValidationError('GENDER_NOT_FOUND', 'Gender not found');
  }
  person.gender = gender;

  const newPerson = await makePerson(person);
  const result = new PersonModel(newPerson);
  await result.validate();
  await result.save({session: session});
  const item = result.toJSON();

  return item;
}
