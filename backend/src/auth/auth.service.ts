import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  private readonly passwordAdmin: string;
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {
    this.passwordAdmin = this.configService.get<string>('admin.password')!;
  }

  async login(password: string) {
    console.log(password);
    console.log(this.passwordAdmin);
    if (password !== this.passwordAdmin) {
      throw new UnauthorizedException('Invalid password');
    }

    const payload = { sub: 'admin', role: 'admin' };
    const accessToken = this.jwtService.sign(payload);

    return {
      accessToken,
    };
  }
}
