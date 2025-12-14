import { Injectable, UnauthorizedException } from '@nestjs/common';
import { TokenExpiredError } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    handlerRequest(err: any, user: any, info: any) {
        if (info instanceof TokenExpiredError){
            throw new TokenExpiredError('JWT token has expired', info.expiredAt);
        }

        if(err || !user){
            throw err || new UnauthorizedException('Unauthorized');
        }

        return user;
    }
}
