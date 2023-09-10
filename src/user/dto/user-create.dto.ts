import { UserEntity } from '../user.entity';
import { PickType } from '@nestjs/swagger';

export class UserCreateDto extends PickType(UserEntity, [
  'name',
  'email',
  'password',
  'organizationId',
  'role',
  'avatarUrl',
]) {}
