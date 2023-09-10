import { Organization as OrganizationModel } from '@prisma/client';

export class OrganizationEntity implements OrganizationModel {
  id: string;
  name: string;
  logoUrl: string;
  cnpj: string;
  phone: string;
}
