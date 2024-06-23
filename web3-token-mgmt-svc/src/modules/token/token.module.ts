import { Module } from '@nestjs/common';
import { TokenService } from './token.service';
import { TokenController } from './token.controller';
import { RequestService } from 'src/shared/services/RequestService';

@Module({
  controllers: [TokenController],
  providers: [TokenService, RequestService],
})
export class TokenModule {}
