import { Module } from '@nestjs/common';
import { CommonService } from './common.service';
import { JWTConstants } from './JWTConstants.service';

@Module({
  providers: [CommonService],
  exports: [CommonService, JWTConstants],
})
export class CommonModule {}
