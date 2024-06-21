import { Injectable } from '@nestjs/common';

@Injectable()
export class AdminService {

  getAdminToken() {
    // generate admin token
    return 'This action adds a new admin';
  }

}
