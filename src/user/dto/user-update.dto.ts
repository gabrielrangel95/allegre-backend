import { UserEntity } from '../user.entity';
import { PickType } from '@nestjs/swagger';

export class UserUpdateDto extends PickType(UserEntity, [
  'name',
  'email',
  'avatarUrl',
  'forgotPasswordSentAt',
  'forgotPasswordToken',
]) {}
