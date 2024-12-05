import { UnauthorizedException } from '../../domain/exceptions/UnauthorizedException';

export class TokenUtils {
  static validate(token: string): void {
    if (!token || token.trim() === '') {
      throw new UnauthorizedException('Empty token provided');
    }
  }

  static extract(authHeader?: string): string {
    if (!authHeader) {
      throw new UnauthorizedException('No authorization header');
    }

    if (!authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException(
        'Invalid token format - must be Bearer token'
      );
    }

    const token = authHeader.split(' ')[1];
    this.validate(token);

    return token;
  }
}
