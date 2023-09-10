import { Module } from '@nestjs/common';
import { OrganizationModule } from './organization';
import { UserModule } from './user';

@Module({
  imports: [OrganizationModule, UserModule],
})
export class AppModule {}
