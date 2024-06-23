import { Injectable } from '@nestjs/common';
import { TOKEN_INFO_MOCK_URL } from '../../common/constants/api.constant';
import { RequestService } from '../../shared/services/RequestService';
import { IRequestData } from '../../common/interfaces/IRequestData.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { TokenEntity } from './entities/token.entity';
import { Repository } from 'typeorm';
import { TokenDto } from './dto/token.dto';

@Injectable()
export class TokenService {
  constructor(
    private readonly requestService: RequestService,
    @InjectRepository(TokenEntity) private readonly tokenRepository: Repository<TokenEntity>,
  ) {}
  getTokenInfo() {
    const payload: IRequestData = {
      params: {
        id: 1
      }
    }
    return this.requestService.call(TOKEN_INFO_MOCK_URL, 'GET', payload);
  }

  findOne(key: string) {
    return this.tokenRepository.findOne({where: {key}});
  }

  async upsert(key: string, token: Partial<TokenDto>) {
    let config: TokenEntity = await this.tokenRepository.findOne({where: {key}});
    if (!config) {
      const data: Partial<TokenDto> = {
        key,
        ...token
      }
      config = await this.tokenRepository.create(data);
    } else {
      config.attempts = token.attempts;
      config.lastAttemptAt = token.lastAttemptAt;
    }
    return await this.tokenRepository.save(config);
  }

  
}
