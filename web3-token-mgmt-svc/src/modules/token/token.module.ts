import { Module } from '@nestjs/common';
import { TokenService } from './token.service';
import { TokenController } from './token.controller';
import { RequestService } from 'src/shared/services/RequestService';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TokenEntity } from './entities/token.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TokenEntity])],
  controllers: [TokenController],
  providers: [TokenService, RequestService],
})
export class TokenModule {}
