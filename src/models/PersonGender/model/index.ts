import ValidationError from 'src/util/Error/validation-error';
import {uuidValidateV4} from 'src/util/uuid';
import {v4 as uuidv4} from 'uuid';
import type {PersonGenderType} from '..';

export enum PERSON_GENDER {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
  OTHER = 'OTHER'
}

export default function makePersonGender (gender: PersonGenderType): Readonly<PersonGenderType> {
  if (gender._id && !uuidValidateV4(gender._id)) {
    throw new ValidationError('ID_INVALID', 'Invalid identifier');
  }
  if (!gender.code) {
    throw new ValidationError('CODE_REQUIRED', 'Person gender must have an code');
  }
  if (gender.code.length < 2) {
    throw new ValidationError('CODE_MIN_LENGTH', 'Person gender must be at least 2 characters', {value: 2});
  }
  if (gender.code.length > 24) {
    throw new ValidationError('CODE_MAX_LENGTH', 'Person gender must be at most 24 characters', {value: 24});
  }
  if (!gender.code.match(/^[A-Za-z]+$/g)) {
    throw new ValidationError('CODE_INVALID_SPECIAL_CHARACTERS', 'Code is invalid. Code must be a string with only letters');
  }

  return Object.freeze({
    _id: gender._id || uuidv4(),
    code: gender.code
  });
}
