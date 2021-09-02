import {body} from 'express-validator';

export default [
  body('name')
    .not().isEmpty()
    .withMessage({
      code: 'NAME_REQUIRED',
      message: 'Name is required'
    })
    .trim()
    .escape(),
  body('birthDate')
    .not().isEmpty()
    .withMessage({
      code: 'BIRTH_DATE_REQUIRED',
      message: 'Birth date is required'
    })
    .isDate()
    .withMessage({
      code: 'BIRTH_DATE_INVALID',
      message: 'Birth date is invalid'
    })
    .toDate(),
  body('genderId')
    .not().isEmpty()
    .withMessage({
      code: 'GENDER_REQUIRED',
      message: 'Gender is required'
    })
    .isString()
    .withMessage({
      code: 'GENDER_INVALID',
      message: 'Gender is invalid'
    })
    .trim()
    .escape()
];
