import { Request, Response, NextFunction, response } from 'express';
import { validationResult } from 'express-validator';
import { RequestValidationError } from '../errors/request-validation-errors';


export const validationRequest = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        throw new RequestValidationError(errors.array());
    }

    next()
}