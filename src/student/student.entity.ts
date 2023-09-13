import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Student as StudentModel, Gender, Ethnicity } from '@prisma/client';
import { Type } from 'class-transformer';
import {
  IsString,
  IsOptional,
  IsUUID,
  IsEnum,
  IsDateString,
} from 'class-validator';
import { OrganizationEntity } from 'src/organization/organization.entity';

export class StudentEntity implements StudentModel {
  @ApiPropertyOptional({
    description: 'UUID generated',
    example: 'abb5a63d-0319-4b11-8380-4c82beecacc4',
  })
  @IsUUID()
  id: string;

  @ApiProperty({
    description: 'Student full Name',
  })
  @IsString()
  name: string;

  @ApiPropertyOptional({
    description: 'Student brazilian RG',
  })
  @IsOptional()
  @IsString()
  rg: string;

  @ApiPropertyOptional({
    description: 'Student brazilian CPF',
  })
  @IsOptional()
  @IsString()
  cpf: string;

  @ApiPropertyOptional({
    description: 'Student brazilian NIS',
  })
  @IsOptional()
  @IsString()
  nis: string;

  @ApiProperty({
    description: 'Student Gender',
    enum: Gender,
  })
  @IsEnum(Gender, {})
  gender: Gender;

  @ApiProperty({
    description: 'Student Ethnicity',
    enum: Ethnicity,
  })
  @IsEnum(Ethnicity, {})
  ethnicity: Ethnicity;

  @ApiProperty({
    description: 'Student Date of Birth',
  })
  @IsDateString()
  dateOfBirth: Date;

  @ApiPropertyOptional({
    description: 'Student primary contact phone ',
  })
  @IsString()
  @IsOptional()
  primary_phone: string;

  @ApiPropertyOptional({
    description: 'Student secondary contact phone ',
  })
  @IsString()
  @IsOptional()
  secondary_phone: string;

  @ApiProperty({
    description: 'Student Organization UUID',
  })
  @IsUUID()
  organizationId: string;

  @ApiPropertyOptional({
    description: 'Student Organization Object',
    type: () => OrganizationEntity,
  })
  @IsOptional()
  @Type(() => OrganizationEntity)
  organization?: OrganizationEntity;
}
