import type {Request, Response} from 'express';
import type {ClientSession} from 'mongoose';
import type {PersonType} from 'src/models/Person';
import Person from 'src/models/Person';
import parameterValidation from './parameter-validation';

/**
 * POST - Create a new person
 *
 * Method to create a new person
 *
 * @param {Request} request - Request body must contain: name (string), birthDate (Date), genderId (string)
 * @param {Response} response - Response json object with status code
 * @param {ClientSession} session - Database session
 *
 * @returns {Promise<Response} - Returns a response with status with 400 if name is empty or not provided (NAME_REQUIRED)
 * @returns {Promise<Response} - Returns a response with status with 400 if name is less than 3 characters (NAME_MIN_LENGTH)
 * @returns {Promise<Response} - Returns a response with status with 400 if name is more than 30 characters (NAME_MAX_LENGTH)
 * @returns {Promise<Response} - Returns a response with status with 400 if name is invalid (NAME_INVALID)
 * @returns {Promise<Response} - Returns a response with status with 400 if birthdate is empty or not provided (BIRTH_DATE_REQUIRED)
 * @returns {Promise<Response} - Returns a response with status with 400 if birthdate is a invalid date (BIRTH_DATE_INVALID)
 * @returns {Promise<Response} - Returns a response with status with 400 if birthdate is less than 13 years (BIRTH_DATE_MIN_DATE)
 * @returns {Promise<Response} - Returns a response with status with 400 if gender is empty or not provided (GENDER_REQUIRED)
 * @returns {Promise<Response} - Returns a response with status with 400 if gender is invalid (GENDER_INVALID)
 * @returns {Promise<Response} - Returns a response with status with 400 if gender not found (GENDER_NOT_FOUND)
 * @returns {Promise<Response} - Returns a response with status with 200 and json with a object with property 'person' (PersonType) if successful create a new person
 */
async function method (request: Request, response: Response, session?: ClientSession): Promise<Response> {
  const {
    name,
    birthDate,
    genderId
  } = request.body;

  const person: PersonType = {
    name: name,
    birthDate: birthDate,
    gender: {
      _id: genderId
    }
  };

  const personResult = await Person.add(person, session);

  return response.status(201).json({
    person: personResult
  });
}

export default {
  validation: parameterValidation,
  method: method
};
