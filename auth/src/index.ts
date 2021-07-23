import express from 'express';
import { signUpRouter } from './routes/signup';
import { signInRouter } from './routes/signin';
import { signOutRouter } from './routes/signout';
import { currentUserRouter } from './routes/current-user';
import { errorHandler } from './middlewares/error-handle';
import { NotFoundError } from './errors/not-found-error';
require('express-async-errors');
import mongoose from 'mongoose';


const app = express();

app.use(express.json());

app.use(currentUserRouter);
app.use(signUpRouter);
app.use(signInRouter);
app.use(signOutRouter);

app.all('*', async () => {
    throw new NotFoundError();
})

app.use(errorHandler);

const start = async () => {
    try {
        await mongoose.connect('mongodb://auth-mongo-srv:27017/auth', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });
    } catch (err) {
        console.log(err);
    }
    app.listen(3000, () => {
        console.log('Listening on port 3000');
    });
}

start();