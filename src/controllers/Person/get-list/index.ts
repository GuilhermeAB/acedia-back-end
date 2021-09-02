import type {Request, Response} from 'express';
import type {ClientSession} from 'mongoose';
import Person from 'src/models/Person';

/**
 * GET - Get the person list
 *
 * Return the person list
 *
 * @param {Request} request - Request body - empty
 * @param {Response} response - Response json object with status code
 * @param {ClientSession} session - Database session
 *
 * @returns {Promise<Response>} - Returns a response with status 404 and json with a object with property 'list' null if the person list is empty
 * @returns {Promise<Response>} - Returns a response with status 200 and json with a object with property 'list' with person list ({PersonType[]}) if has a person list
 */
async function method (request: Request, response: Response, session?: ClientSession): Promise<Response> {
  const result = await Person.getList(session);

  if (!result) {
    return response.status(404).json({
      list: null
    });
  }

  return response.status(200).json({
    list: result
  });
}

export default {
  method: method
};
