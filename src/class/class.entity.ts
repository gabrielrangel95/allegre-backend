import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Class as ClassModel } from '@prisma/client';
import { Type } from 'class-transformer';
import { IsString, IsOptional, IsUUID, IsUrl } from 'class-validator';
import { OrganizationEntity } from 'src/organization/organization.entity';
import { StudentClassesEntity } from 'src/student-classes/student-classes.entity';
import { UserClassesEntity } from 'src/user-classes/user-classes.entity';

export class ClassEntity implements ClassModel {
  @ApiPropertyOptional({
    description: 'UUID generated',
    example: 'abb5a63d-0319-4b11-8380-4c82beecacc4',
  })
  @IsUUID()
  id: string;

  @ApiProperty({
    description: 'Class Name',
  })
  @IsString()
  name: string;

  @ApiPropertyOptional({
    description: 'Class Logo URL',
  })
  @IsOptional()
  @IsUrl()
  logoUrl: string;

  @ApiProperty({
    description: 'Class Organization UUID',
  })
  @IsUUID()
  organizationId: string;

  @ApiPropertyOptional({
    description: 'Class Organization Object',
    type: () => OrganizationEntity,
  })
  @IsOptional()
  @Type(() => OrganizationEntity)
  organization?: OrganizationEntity;

  @ApiPropertyOptional({
    description: 'Student Classes Object',
    type: () => [StudentClassesEntity],
  })
  @IsOptional()
  @Type(() => StudentClassesEntity)
  studentClasses?: StudentClassesEntity[];

  @ApiPropertyOptional({
    description: 'User Classes Object',
    type: () => [UserClassesEntity],
  })
  @IsOptional()
  @Type(() => UserClassesEntity)
  userClasses?: UserClassesEntity[];
}
