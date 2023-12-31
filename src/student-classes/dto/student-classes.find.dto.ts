import { StudentClassesEntity } from '../student-classes.entity';
import { IntersectionType, PartialType, PickType } from '@nestjs/swagger';
import { PaginationDto } from 'src/shared/dto/pagination.dto';

export class StudentClassesFindDto extends IntersectionType(
  PaginationDto,
  PartialType(PickType(StudentClassesEntity, ['id', 'studentId', 'classId'])),
) {}
