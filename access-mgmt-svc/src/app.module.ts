import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdminModule } from './modules/admin/admin.module';
import { UserModule } from './modules/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import rdbmsConfig from './config/db.config';
import { KeyModule } from './modules/key/key.module';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot(rdbmsConfig),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
    }),
    AdminModule, 
    UserModule, 
    KeyModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
