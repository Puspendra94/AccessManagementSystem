import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { KeyService } from '../key/key.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { KeyEntity } from '../key/entities/key.entity';

@Module({
  imports: [TypeOrmModule.forFeature([KeyEntity])],
  controllers: [UserController],
  providers: [KeyService],
})
export class UserModule {}
