import { ValidationChain, body } from 'express-validator';

const registerValidation: ValidationChain[] = [
  body('email')
    .isEmail().withMessage('Please enter a valid email address'),
  body('firstName')
    .isString().withMessage('Please provide a valid first name'),
  body('lastName')
    .isString().withMessage('Please provide a valid last name'),
  body('password')
    .isLength({ min: 6 }).withMessage('Password should be at least 6 characters long'),
];

const loginValidation: ValidationChain[] = [
  body('email')
    .isEmail().withMessage('Please enter a valid email address'),
  body('password')
    .isLength({ min: 6 }).withMessage('Password should be at least 6 characters long'),
];

export { registerValidation, loginValidation };