import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { KeyEntity } from '../key/entities/key.entity';
import { KeyService } from '../key/key.service';

@Module({
  imports: [TypeOrmModule.forFeature([KeyEntity])],
  controllers: [AdminController],
  providers: [AdminService, KeyService],
})
export class AdminModule {}
