import express, { Request, Response } from 'express';
import { User } from '../models/user';
import { body } from 'express-validator';
import { validationRequest } from '../middlewares/validation-request';
import { BadRequestError } from '../errors/bad-request-error';
import jwt from 'jsonwebtoken';

const router = express.Router();

router.post('/api/users/signup', [
    body('email')
        .isEmail()
        .withMessage('Email must be valid'),
    body('password')
        .trim()
        .isLength({ min: 4, max: 20 })
        .withMessage('Password must be between 4 and 20')

], validationRequest, async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const existingEmail = await User.findOne({ email });

    if (existingEmail) {
        throw new BadRequestError('Email in use');
    }

    const user = await User.build({ email, password });
    await user.save();

    const token = jwt.sign({
        userid: user.id,
        email: user.email,
        password: user.password
    }, process.env.JWT_KEY!)

    req.session = {
        jwt: token
    }

    res.status(201).send(user);
})

export { router as signUpRouter };