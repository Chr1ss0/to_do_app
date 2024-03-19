import { ValidationChain, body } from 'express-validator';
import { Priority } from '../enums/Priority';
import { Status } from '../enums/Status';
export const createValidator: ValidationChain[] = [
  body('title')
    .not()
    .isEmpty()
    .withMessage('The task title is mandatory')
    .trim()
    .isString()
    .withMessage('Title need to be in a text format'),
  body('date')
    .not()
    .isEmpty()
    .withMessage('The task date id mandatory')
    .isString()
    .withMessage(
      'The date needs to be a valid date foramt',
    ),
  body('description')
    .trim()
    .isString()
    .withMessage('Description needs to be in text format'),
  body('priority')
    .trim()
    .isIn([Priority.high, Priority.normal, Priority.low])
    .withMessage(
      'Priority can only be normal, high or low',
    ),
  body('status')
    .trim()
    .isIn([
      Status.inProgress,
      Status.completed,
      Status.todo,
    ])
    .withMessage(
      'Status can only be inProgress, completed, todo',
    ),
];

export const updateValidator = [
  body('id')
    .not()
    .isEmpty()
    .withMessage('The task id is mandatory')
    .trim()
    .isString()
    .withMessage('Id need to be a valid uuid format'),
  body('status')
    .trim()
    .isIn([
      Status.inProgress,
      Status.completed,
      Status.todo,
    ])
    .withMessage(
      'Priority can only be normal, high or low',
    ),
];
