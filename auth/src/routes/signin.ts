import express, { Request, Response } from 'express';
import { User } from '../models/user';
import { BadRequestError } from '../errors/bad-request-error';
import { validationRequest } from '../middlewares/validation-request';
import { Password } from '../services/password';
import jwt from 'jsonwebtoken';

const router = express.Router();

router.post('/api/users/signin', validationRequest, async (
    req: Request,
    res: Response
) => {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (!existingUser) {
        throw new BadRequestError('Invalid credentials');
    }

    const passwordMatch = await Password.toCompare(existingUser.password, password)

    if (!passwordMatch) {
        throw new BadRequestError('Invalid credentials');
    }
    const token = jwt.sign({
        userid: existingUser.id,
        email: existingUser.email,
        password: existingUser.password
    }, process.env.JWT_KEY!)

    req.session = {
        jwt: token
    }

    res.send({ existingUser });
})

export { router as signInRouter };