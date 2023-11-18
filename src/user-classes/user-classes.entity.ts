import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { UserClasses as UserClassesModel } from '@prisma/client';
import { Type } from 'class-transformer';
import { IsOptional, IsUUID } from 'class-validator';
import { UserEntity } from 'src/user/user.entity';
import { ClassEntity } from 'src/class/class.entity';

export class UserClassesEntity implements UserClassesModel {
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
  userId: string;

  @ApiProperty({
    description: 'Class UUID',
  })
  @IsUUID()
  classId: string;

  @ApiPropertyOptional({
    description: 'UserEntity Object',
    type: () => UserEntity,
  })
  @IsOptional()
  @Type(() => UserEntity)
  user?: UserEntity;

  @ApiPropertyOptional({
    description: 'ClassEntity Object',
    type: () => ClassEntity,
  })
  @IsOptional()
  @Type(() => ClassEntity)
  class?: ClassEntity;
}
