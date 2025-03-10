import { HttpException, HttpStatus } from '@nestjs/common';

export class CustomHttpException extends HttpException {
    constructor(
        public readonly errorCode: string,
        public readonly errorMessage: string,
        public readonly metadata?: any
    ) {
        super(
            {
                errorCode,
                message: errorMessage,
                metadata,
            },
            HttpStatus.BAD_REQUEST, 
        );
    }
}
