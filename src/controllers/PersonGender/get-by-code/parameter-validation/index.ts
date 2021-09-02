import {param} from 'express-validator';

export default [
  param('code')
    .not().isEmpty()
    .withMessage({
      code: 'CODE_REQUIRED',
      message: 'Code is required'
    })
    .trim()
    .escape()
];
