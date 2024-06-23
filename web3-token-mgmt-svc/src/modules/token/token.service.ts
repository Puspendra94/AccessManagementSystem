import { Injectable } from '@nestjs/common';
import { TOKEN_INFO_MOCK_URL } from '../../common/constants/api.constant';
import { RequestService } from '../../shared/services/RequestService';
import { IRequestData } from '../../common/interfaces/IRequestData.interface';

@Injectable()
export class TokenService {
  constructor(private readonly requestService: RequestService) {}
  getTokenInfo() {
    const payload: IRequestData = {
      params: {
        id: 1
      }
    }
    return this.requestService.call(TOKEN_INFO_MOCK_URL, 'GET', payload);
  }
}
