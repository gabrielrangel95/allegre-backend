import { UserRole } from '@prisma/client';

export class JwtPayloadDto {
  id: string;
  organizationId?: string;
  role: UserRole;
}
