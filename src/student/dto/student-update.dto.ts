import { StudentEntity } from '../student.entity';
import { PickType, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, IsEnum, IsDate } from 'class-validator';
import { Gender, Ethnicity } from '@prisma/client';

export class StudentUpdateDto extends PickType(StudentEntity, [
  'rg',
  'cpf',
  'nis',
  'gender',
  'ethnicity',
  'dateOfBirth',
  'primary_phone',
  'secondary_phone',
]) {
  @ApiPropertyOptional({
    description: 'Student full Name',
  })
  @IsOptional()
  @IsString()
  name: string;

  @ApiPropertyOptional({
    description: 'Student Gender',
    enum: Gender,
  })
  @IsEnum(Gender, {})
  @IsOptional()
  gender: Gender;

  @ApiPropertyOptional({
    description: 'Student Ethnicity',
    enum: Ethnicity,
  })
  @IsOptional()
  @IsEnum(Ethnicity, {})
  ethnicity: Ethnicity;

  @ApiPropertyOptional({
    description: 'Student Date of Birth',
  })
  @IsOptional()
  @IsDate()
  dateOfBirth: Date;
}
