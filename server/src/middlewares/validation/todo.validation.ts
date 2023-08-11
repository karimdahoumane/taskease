import { ValidationChain, body } from 'express-validator';

const todoValidation: ValidationChain[] = [
  body('name')
    .isString().withMessage('Please provide a valid name'),
  body('description')
    .isString().withMessage('Please provide a valid description'),
  body('done')
    .isBoolean(),
];

export { todoValidation };