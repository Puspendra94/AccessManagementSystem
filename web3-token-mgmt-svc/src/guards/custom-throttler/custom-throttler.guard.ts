// import { Injectable, CanActivate, ExecutionContext, Inject } from '@nestjs/common';
// import { ThrottlerStorage } from '@nestjs/throttler';
// import { ThrottlerException } from '@nestjs/throttler';
// import { Request } from 'express';
// import { TokenService } from '../../modules/token/token.service';

// @Injectable()
// export class CustomThrottlerGuard implements CanActivate {
//   private storage: Map<string, { attempts: number; lastAttemptAt: number }> = new Map();
//   constructor(
//     @Inject(ThrottlerStorage) private readonly tokenService: TokenService,
//   ) {}

//   async canActivate(context: ExecutionContext): Promise<boolean> {
//     const request: Request = context.switchToHttp().getRequest();
//     const key = request.headers['x-api-key'] as string;

//     if (!key) {
//       throw new ThrottlerException('API key is missing');
//     }

//     const config = await this.tokenService.findOne(key);
//     if (!config) {
//       throw new ThrottlerException('Invalid API key');
//     }

//     const { ttl, limit } = config;
//     const trackBy = key;
//     const now = Date.now();
//     const keyRecord = `throttler:${trackBy}`;
    
//     const record = this.getRecord(keyRecord);

//     if (record && record.attempts >= limit && now - record.lastAttemptAt < ttl * 1000) {
//       throw new ThrottlerException('Throttler limit exceeded');
//     }

//     this.addRecord(keyRecord, { attempts: (record?.attempts || 0) + 1, lastAttemptAt: now }, ttl);
//     return true;
//   }

//   private getRecord(key: string): { attempts: number; lastAttemptAt: number } | undefined {
//     return this.storage.get(key);
//   }

//   private addRecord(key: string, record: { attempts: number; lastAttemptAt: number }, ttl: number): void {
//     this.storage.set(key, record);
//     setTimeout(() => this.storage.delete(key), ttl * 1000); // Delete the record after TTL expires
//   }
// }


import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { ThrottlerException } from '@nestjs/throttler';
import { Request } from 'express';
import { TokenService } from '../../modules/token/token.service';
import { TokenEntity } from '../../modules/token/entities/token.entity';
import logger from 'src/config/logger';

@Injectable()
export class CustomThrottlerGuard implements CanActivate {
  constructor(private readonly tokenService: TokenService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const apiKey = request.headers['x-api-key'] as string;

    if (!apiKey) {
      throw new ThrottlerException('API key is missing');
    }

    const config = await this.tokenService.findOne(apiKey);
    logger.info(`CustomThrottlerGuard config ${JSON.stringify(config)}`);
    if (!config) {
      throw new ThrottlerException('Invalid API key');
    }

    const { ttl, limit } = config;
    const now = Date.now();

    if (config && config.attempts >= limit && now - config.lastAttemptAt.getTime() < ttl * 1000) {
      throw new ThrottlerException('Throttler limit exceeded');
    }

    // Update or insert config in the database
    await this.tokenService.upsert(apiKey, { attempts: (config?.attempts || 0) + 1, lastAttemptAt: new Date(now) });
    return true;
  }
}

