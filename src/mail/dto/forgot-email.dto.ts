import { UserEntity } from '../../user/user.entity';
import { PickType } from '@nestjs/swagger';

export class ForgotPasswordEmailDto extends PickType(UserEntity, [
  'email',
  'forgotPasswordToken',
]) {}
