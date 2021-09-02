import type {Request, Response} from 'express';
import type {ClientSession} from 'mongoose';
import PersonGender from 'src/models/PersonGender';
import parameterValidation from './parameter-validation';

/**
 * GET - Get one person gender by informed code
 *
 * @param {Request} request - Request params must contain a 'code' (only letters) like 'CODE'
 * @param {Response} response - Response json object with status code
 * @param {ClientSession} session - Database session
 *
 * @returns {Promise<Response>} - Returns a response with status 404 and json with a object with property 'gender' null if no gender was found
 * @returns {Promise<Response>} - Returns a response with status 200 and json with a object with property 'gender' with person gender ({PersonGender}) if a person gender was found
 */
async function method (request: Request, response: Response, session?: ClientSession): Promise<Response> {
  const {
    code
  } = request.params;

  const result = await PersonGender.getByCode(code, session);

  if (!result) {
    return response.status(404).json({
      gender: null
    });
  }

  return response.status(200).json({
    gender: result
  });
}

export default {
  validation: parameterValidation,
  method: method
};
