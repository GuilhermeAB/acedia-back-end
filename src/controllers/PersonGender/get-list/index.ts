import type {Request, Response} from 'express';
import type {ClientSession} from 'mongoose';
import PersonGender from 'src/models/PersonGender';

/**
 * GET - Get the person gender list
 *
 * Return the person gender list
 *
 * @param {Request} request - Request body - empty
 * @param {Response} response - Response json object with status code
 * @param {ClientSession} session - Database session
 *
 * @returns {Promise<Response>} - Returns a response with status 404 and json with a object with property 'genders' null if the person gender list is empty
 * @returns {Promise<Response>} - Returns a response with status 200 and json with a object with property 'genders' with person gender list ({PersonGenderType[]}) if has a person gender list
 */
async function method (request: Request, response: Response, session?: ClientSession): Promise<Response> {
  const result = await PersonGender.getList(session);

  if (!result) {
    return response.status(404).json({
      genders: null
    });
  }

  return response.status(200).json({
    genders: result
  });
}

export default {
  method: method
};
