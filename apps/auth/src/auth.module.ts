import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import {} from '@app/common';
import { ConfigService } from '@nestjs/config';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: new ConfigService().get('JWT_SECRET'),
    }),
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AuthModule {}
