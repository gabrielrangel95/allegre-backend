import { UserEntity } from 'src/user/user.entity';
import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsString, MinLength, Length } from 'class-validator';

export class ResetPasswordDto extends PickType(UserEntity, [
  'email',
  'organizationId',
]) {
  @ApiProperty()
  @IsString()
  @Length(8)
  token: string;

  @ApiProperty()
  @IsString()
  @MinLength(8)
  newPassword: string;
}
