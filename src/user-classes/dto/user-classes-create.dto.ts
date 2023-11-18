import { IsUUID } from 'class-validator';
import { UserClassesEntity } from '../user-classes.entity';
import { ApiProperty, PickType } from '@nestjs/swagger';

export class UserClassesCreateDto extends PickType(UserClassesEntity, [
  'classId',
]) {
  @ApiProperty({
    description: 'User IDs Array',
  })
  @IsUUID(undefined, { each: true })
  usersIds: string[];
}
