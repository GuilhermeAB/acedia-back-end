import {model, Schema} from 'mongoose';
import {personGenderSchema} from 'src/models/PersonGender/schema';
import type {PersonType} from '..';

export const PERSON = 'Person';

export const personSchema = new Schema({
  _id: String,
  name: String,
  birthDate: Date,
  gender: personGenderSchema
});

export const PersonModel = model<PersonType>(PERSON, personSchema);
