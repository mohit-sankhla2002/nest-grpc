import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import {  } from '@app/common';

@Module({
  imports: [JwtModule.register({
    global: true, 
    secret: 
  })],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
