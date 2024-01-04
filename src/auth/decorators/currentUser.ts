import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CurrentUser = createParamDecorator(
  (executionContext: string, context: ExecutionContext) => {
    const req = context.switchToHttp().getRequest();

    return req.user;
  },
);
