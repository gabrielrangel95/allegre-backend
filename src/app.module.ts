import { Module } from '@nestjs/common';
import { OrganizationModule } from './organization';
import { UserModule } from './user';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [OrganizationModule, UserModule, AuthModule],
})
export class AppModule {}
