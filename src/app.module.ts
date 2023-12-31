import { Module } from '@nestjs/common';
import { OrganizationModule } from './organization';
import { UserModule } from './user';
import { AuthModule } from './auth/auth.module';
import { StudentModule } from './student';
import { ClassModule } from './class';
import { StudentClassesModule } from './student-classes';
import { UserClassesModule } from './user-classes';
import { MailModule } from './mail';

@Module({
  imports: [
    OrganizationModule,
    UserModule,
    AuthModule,
    StudentModule,
    ClassModule,
    StudentClassesModule,
    UserClassesModule,
    MailModule,
  ],
})
export class AppModule {}
