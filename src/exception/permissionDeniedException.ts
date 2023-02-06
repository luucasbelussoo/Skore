import { HttpException } from '@nestjs/common';

export class PermissionDeniedException extends HttpException {
  constructor() {
    const code = 'PERMISSION_DENIED';
    const INVALID_ARGUMENT_ERROR = {
      code,
      message:
        'Authenticated user has no permission to access the requested resource',
    };
    super(INVALID_ARGUMENT_ERROR, 403);
  }
}
