import { body } from 'express-validator';

export const flightValidationRules = [
    body('flightId')
        .isMongoId()
        .withMessage('Invalid flight ID'),

    body('flyingFrom')
        .isString()
        .notEmpty()
        .withMessage('Flying from is required'),

    body('flyingTo')
        .isString()
        .notEmpty()
        .withMessage('Flying to is required'),

    body('departure.departureDate')
        .isISO8601()
        .toDate()
        .withMessage('Invalid departure date'),

    body('departure.departureTime')
        .isISO8601()
        .toDate()
        .withMessage('Invalid departure time'),

    body('return.returnDate')
        .isISO8601()
        .toDate()
        .withMessage('Invalid return date'),

    body('return.returnTime')
        .isISO8601()
        .toDate()
        .withMessage('Invalid return time'),

    body('travelClass')
        .isString()
        .notEmpty()
        .withMessage('Travel class is required'),

    body ('flightStatus')
        .isString()
        .notEmpty()
        .withMessage('Flight Status is required'),
];