import { sign, verify } from 'jsonwebtoken';
import { IJwtPayload } from '../../jwt/interfaces/IJwtPayload';
import { IJwtService } from '../../jwt/interfaces/IJwtService';
import { injectable } from 'inversify';
import { environment } from '../../environments/environment';

@injectable()
export class AuthService implements IJwtService {
  private readonly SECRET_KEY = environment.SECRET_KEY;
  private readonly EXPIRES_IN = environment.EXPIRES_IN;

  generateToken(payload: IJwtPayload): string {
    return sign(payload, this.SECRET_KEY!, { expiresIn: this.EXPIRES_IN });
  }

  verifyToken(token: string): IJwtPayload {
    return verify(token, this.SECRET_KEY!) as IJwtPayload;
  }
}
