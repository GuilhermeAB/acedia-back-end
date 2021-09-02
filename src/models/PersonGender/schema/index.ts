import {model, Schema} from 'mongoose';
import type {PersonGenderType} from '..';

export const PERSON_GENDER = 'Person_Gender';

export const personGenderSchema = new Schema({
  _id: String,
  code: {type: String, index: true}
});

export const PersonGenderModel = model<PersonGenderType>(PERSON_GENDER, personGenderSchema);
