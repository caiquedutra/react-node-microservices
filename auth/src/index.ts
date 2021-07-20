import express from 'express';
import { signUpRouter } from './routes/signup';
import { signInRouter } from './routes/signin';
import { signOutRouter } from './routes/signout';
import { currentUserRouter } from './routes/current-user';
import { errorHandler } from './errors/error-handle';
import { NotFoundError } from './middlewares/not-found-error';
require('express-async-errors');


const app = express();

app.use(express.json());

app.use(currentUserRouter);
app.use(signUpRouter);
app.use(signInRouter);
app.use(signOutRouter);

app.all('*', async() =>{
     throw new NotFoundError();
})

app.use(errorHandler);


app.listen(3000, () => {
    console.log('Listening on port 3000');
});