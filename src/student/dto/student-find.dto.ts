import { StudentEntity } from '../student.entity';
import { IntersectionType, PartialType, PickType } from '@nestjs/swagger';
import { PaginationDto } from 'src/shared/dto/pagination.dto';

export class StudentFindDto extends IntersectionType(
  PaginationDto,
  PartialType(
    PickType(StudentEntity, [
      'id',
      'name',
      'organizationId',
      'rg',
      'cpf',
      'nis',
      'dateOfBirth',
    ]),
  ),
) {}
