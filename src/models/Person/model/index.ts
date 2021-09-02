import {differenceInYears, isValid} from 'date-fns';
import PersonGender from 'src/models/PersonGender';
import ValidationError from 'src/util/Error/validation-error';
import {uuidValidateV4} from 'src/util/uuid';
import {v4 as uuidv4} from 'uuid';
import type {PersonType} from '..';

export default async function makePerson (person: PersonType): Promise<Readonly<PersonType>> {
  if (person._id && !uuidValidateV4(person._id)) {
    throw new ValidationError('ID_INVALID', 'Invalid identifier');
  }
  if (!person.name) {
    throw new ValidationError('NAME_REQUIRED', 'Name must be provided');
  }
  if (person.name.length < 3) {
    throw new ValidationError('NAME_MIN_LENGTH', 'Name must be at least 3 characters', {value: 3});
  }
  if (person.name.length > 30) {
    throw new ValidationError('NAME_MAX_LENGTH', 'Name must be at least 30 characters', {value: 30});
  }
  if (!person.name.match(/^([A-Z][a-z]+([ ]?[a-z]?['-]?[A-Z][a-z]+)*)$/g)) {
    throw new ValidationError('NAME_INVALID', 'Invalid name');
  }
  if (!person.birthDate) {
    throw new ValidationError('BIRTH_DATE_REQUIRED', 'Birth date must be provided');
  }
  if (!(person.birthDate instanceof Date)) {
    throw new ValidationError('BIRTH_DATE_INVALID', 'Birth date is invalid');
  }
  if (!isValid(person.birthDate)) {
    throw new ValidationError('BIRTH_DATE_INVALID', 'Birth date is invalid');
  }

  const age = differenceInYears(new Date(), person.birthDate);
  if (age < 13) {
    throw new ValidationError('BIRTH_DATE_MIN_DATE', 'You must have at least 13 years to sign up in our platform', {value: 13});
  }
  if (age > 116) {
    throw new ValidationError('BIRTH_DATE_INVALID', 'Birth date is invalid');
  }

  if (!person.gender) {
    throw new ValidationError('GENDER_REQUIRED', 'Gender must be provided');
  }

  const genderExists = await PersonGender.exists(person.gender);
  if (!genderExists) {
    throw new ValidationError('GENDER_INVALID', 'Gender is invalid');
  }

  return Object.freeze({
    _id: person._id || uuidv4(),
    name: person.name,
    birthDate: person.birthDate,
    gender: person.gender
  });
}
