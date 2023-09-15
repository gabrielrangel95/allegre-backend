import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { StudentClasses as StudentClassesModel } from '@prisma/client';
import { Type } from 'class-transformer';
import { IsOptional, IsUUID } from 'class-validator';
import { StudentEntity } from 'src/student/student.entity';
import { ClassEntity } from 'src/class/class.entity';

export class StudentClassesEntity implements StudentClassesModel {
  @ApiPropertyOptional({
    description: 'UUID generated',
    example: 'abb5a63d-0319-4b11-8380-4c82beecacc4',
  })
  @IsUUID()
  id: string;

  @ApiProperty({
    description: 'Student UUID',
  })
  @IsUUID()
  studentId: string;

  @ApiProperty({
    description: 'Student UUID',
  })
  @IsUUID()
  classId: string;

  @ApiPropertyOptional({
    description: 'StudentEntity Object',
    type: () => StudentEntity,
  })
  @IsOptional()
  @Type(() => StudentEntity)
  student?: StudentEntity;

  @ApiPropertyOptional({
    description: 'ClassEntity Object',
    type: () => ClassEntity,
  })
  @IsOptional()
  @Type(() => ClassEntity)
  class?: ClassEntity;
}
