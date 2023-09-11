import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserService } from 'src/user/user.service';
import { SignInDto, SignInResponseDto, JwtPayloadDto } from './dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn(data: SignInDto): Promise<SignInResponseDto> {
    const user = await this.userService.findByEmail(
      data.email,
      data.organizationId,
    );

    if (!user) {
      throw new UnauthorizedException('User does not exist');
    }

    const isMatch = await bcrypt.compare(data.password, user.password);

    if (!isMatch) {
      throw new UnauthorizedException('Wrong credentials');
    }

    const payload: JwtPayloadDto = {
      id: user.id,
      organizationId: user.organizationId,
      role: user.role,
    };

    return {
      user,
      accessToken: await this.jwtService.signAsync(payload),
    };
  }
}
