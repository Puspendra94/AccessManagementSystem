import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TokenModule } from './modules/token/token.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import rdbmsConfig from './config/db.config';
import { ConfigModule } from '@nestjs/config';
import { SharedModule } from './shared/shared.module';
import { CustomThrottlerGuard } from './guards/custom-throttler/custom-throttler.guard';
import { ThrottlerModule, ThrottlerModuleOptions, ThrottlerStorageService } from '@nestjs/throttler';
import { TokenService } from './modules/token/token.service';
import { TokenEntity } from './modules/token/entities/token.entity';
import { RequestService } from './shared/services/RequestService';

@Module({
  imports: [
    TypeOrmModule.forFeature([TokenEntity]),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot(rdbmsConfig),
    TokenModule,
    SharedModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    TokenService,
    RequestService,
    {
      provide: 'APP_GUARD',
      useClass: CustomThrottlerGuard,
    },
  ],
})
export class AppModule {}
