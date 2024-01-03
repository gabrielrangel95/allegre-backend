import { UserEntity } from 'src/user/user.entity';
import { PickType } from '@nestjs/swagger';

export class ForgotPasswordDto extends PickType(UserEntity, [
  'email',
  'organizationId',
]) {}
