import { ValidationChain, body } from 'express-validator';

const registerValidation: ValidationChain[] = [
  body('email')
    .isEmail().withMessage('Please enter a valid email address'),
  body('firstName')
    .isString().isAlpha().isLength({ min: 2, max: 50 }).withMessage('Please provide a valid first name (2-50 characters)'),
  body('lastName')
    .isString().isAlpha().isLength({ min: 2, max: 50 }).withMessage('Please provide a valid last name (2-50 characters)'),
  body('password')
    .isLength({ min: 6 }).withMessage('Password should be at least 6 characters long'),
];

const loginValidation: ValidationChain[] = [
  body('email')
    .isEmail().withMessage('Please enter a valid email address'),
  body('password')
];

export { registerValidation, loginValidation };