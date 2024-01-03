import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ForgotPasswordDto, SignInDto, SignInResponseDto } from './dto';
import { AuthService } from './auth.service';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/')
  @ApiOperation({ summary: 'Authenticate User' })
  @ApiResponse({
    status: 200,
    description: 'Authenticated info',
    type: () => SignInResponseDto,
  })
  async singIn(
    @Body()
    data: SignInDto,
  ): Promise<SignInResponseDto> {
    return this.authService.signIn(data);
  }

  @Post('/forgot-password')
  @ApiOperation({ summary: 'Forgot Password' })
  @ApiResponse({
    status: 200,
    description: 'Forgot password worked',
  })
  async forgotPassword(
    @Body()
    data: ForgotPasswordDto,
  ) {
    return this.authService.forgotPassword(data);
  }
}
