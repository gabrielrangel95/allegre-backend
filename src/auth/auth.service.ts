import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserService } from 'src/user/user.service';
import { MailService } from 'src/mail/mail.service';
import {
  SignInDto,
  SignInResponseDto,
  JwtPayloadDto,
  ForgotPasswordDto,
} from './dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
    private mailService: MailService,
  ) {}

  async forgotPassword(data: ForgotPasswordDto) {
    const user = await this.userService.findByEmail(
      data.email,
      data.organizationId,
    );

    if (!user) {
      return { success: true };
    }
    const token = Math.random().toString().slice(2, 10);
    const currentDate = new Date();
    const tokenEncrypted = await bcrypt.hash(token, 10);

    await this.userService.update(user.id, {
      ...user,
      forgotPasswordSentAt: currentDate,
      forgotPasswordToken: tokenEncrypted,
    });

    await this.mailService.sendForgotEmailPassword({
      forgotPasswordToken: token,
      email: user.email,
    });

    return { success: true };
  }

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
