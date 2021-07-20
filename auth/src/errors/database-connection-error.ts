import { CustomError } from './custom-error';

export class DatabaseConnectionError extends CustomError {
    reason = "Error connecting to the database";
    statusCode = 500;
    constructor() {
        super('error connecting to the database');

        Object.setPrototypeOf(this, DatabaseConnectionError.prototype);

    }

    serializedErrors() {
        return [{ message: this.reason }];
    }
}
