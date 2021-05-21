import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { jwtConstants } from './constants';
// import { ConfigService } from '@nestjs/config';

// const fromAuthCookie = function () {
// 	return function (request) {
// 		let token = null;
// 		if (request && request.cookies ) {
// 			token = request.cookies['Authorization'];
// 		}
// 		return token;
// 	}
// }

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor(
		// private readonly config: ConfigService
	) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: false,
			secretOrKey: jwtConstants.secret,
		});
	}

	async validate(payload: any) {
		// return { userId: payload.sub, username: payload.username };
		return { message : "success!"};
	}
}