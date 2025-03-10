import { Catch, ExceptionFilter, ArgumentsHost, HttpException } from '@nestjs/common';
import { Response } from 'express';
import { CustomHttpException } from '../exceptions/custom-http.exception';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    if (exception instanceof CustomHttpException) {
      response.status(exception.getStatus()).json({
        errorCode: exception.errorCode,
        message: exception.errorMessage,
        metadata: exception.metadata,
        timestamp: new Date().toISOString(),
      });
      return;
    }

    if (exception instanceof HttpException) {
      const status = exception.getStatus();
      const exceptionResponse = exception.getResponse();
      const error = typeof exceptionResponse === 'string' ? { message: exceptionResponse } : exceptionResponse;
      response.status(status).json({
        timestamp: new Date().toISOString(),
        ...error,
      });
      return;
    }

    console.error(exception);
    response.status(500).json({
      message: 'Internal server error',
      timestamp: new Date().toISOString(),
    });
  }
}
