import { UserEntity } from '../user.entity';
import { IntersectionType, PartialType, PickType } from '@nestjs/swagger';
import { PaginationDto } from 'src/shared/dto/pagination.dto';

export class UserFindDto extends IntersectionType(
  PaginationDto,
  PartialType(
    PickType(UserEntity, ['id', 'name', 'email', 'organizationId', 'role']),
  ),
) {}
