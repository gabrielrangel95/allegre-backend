import { Module } from '@nestjs/common';
import { OrganizationModule } from './organization';
import { UserModule } from './user';
import { AuthModule } from './auth/auth.module';
import { StudentModule } from './student';

@Module({
  imports: [OrganizationModule, UserModule, AuthModule, StudentModule],
})
export class AppModule {}
