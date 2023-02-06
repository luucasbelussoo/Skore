import { HttpException } from '@nestjs/common';

export class InvalidArgumentException extends HttpException {
  constructor() {
    const code = 'INVALID_ARGUMENT';
    const INVALID_ARGUMENT_ERROR = {
      code,
      message:
        'Client specified an invalid argument, request body or query param',
    };
    super(INVALID_ARGUMENT_ERROR, 400);
  }
}
