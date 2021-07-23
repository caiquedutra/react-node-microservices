import express, { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { RequestValidationError } from '../errors/request-validation-errors';
import { User } from '../models/user';
import { BadRequestError } from '../errors/bad-request-error'

const router = express.Router();

router.post('/api/users/signup', [
    body('email')
        .isEmail()
        .withMessage('Email must be valid'),
    body('password')
        .trim()
        .isLength({ min: 4, max: 20 })
        .withMessage('Password must be between 4 and 20')
], async (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        throw new RequestValidationError(errors.array());
    }
    const { email, password } = req.body;

    const existingEmail =  User.findOne({ email });

    if ((existingEmail)) {
       return res.status(404).send({errors:{message: 'Email in use'}})
    }

    const user = User.build({ email, password });
    await user.save();

    res.status(201).send(user);
})

export { router as signUpRouter };