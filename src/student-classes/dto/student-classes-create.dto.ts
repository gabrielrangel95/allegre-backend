import { IsUUID } from 'class-validator';
import { StudentClassesEntity } from '../student-classes.entity';
import { ApiProperty, PickType } from '@nestjs/swagger';

export class StudentClassesCreateDto extends PickType(StudentClassesEntity, [
  'classId',
]) {
  @ApiProperty({
    description: 'Students IDs Array',
  })
  @IsUUID(undefined, { each: true })
  studentIds: string[];
}
