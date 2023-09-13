import { StudentEntity } from '../student.entity';
import { PickType } from '@nestjs/swagger';

export class StudentCreateDto extends PickType(StudentEntity, [
  'name',
  'rg',
  'cpf',
  'nis',
  'gender',
  'ethnicity',
  'dateOfBirth',
  'primary_phone',
  'secondary_phone',
]) {}
