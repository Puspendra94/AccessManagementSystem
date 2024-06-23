import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { ADMIN_PERMISSION } from '../../../src/common/permission/admin.permission';
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class AdminService {

  constructor(
    private readonly jwtService: JwtService
  ) {}

  async getAdminToken() {
    const payload = { 
      username: 'admin', 
      userId: uuidv4(),
      permissions: ADMIN_PERMISSION
    };
    return {
      access_token: await this.jwtService.signAsync(payload, { expiresIn: '60s' },),
    };
  }

}
