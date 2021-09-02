import type {Request, Response} from 'express';
import {Router} from 'express';
import Person from 'src/controllers/Person';
import PersonGender from 'src/controllers/PersonGender';
import makeExpressCallback from './util/make-express-callback';

const routes = Router();

routes.get('/', (_request: Request, response: Response) => response.json({message: 'Hello there'}));

routes.get('/person-gender/:code', PersonGender.getByCode.validation, makeExpressCallback(PersonGender.getByCode.method));
routes.get('/person-gender', makeExpressCallback(PersonGender.getList.method));

routes.post('/person', Person.post.validation, makeExpressCallback(Person.post.method));
routes.get('/person', makeExpressCallback(Person.getList.method));

export default routes;
