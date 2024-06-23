import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AdminService } from './admin.service';
import { KeyService } from '../key/key.service';
import { CreateKeyDto } from '../key/dto/create-key.dto';
import { UpdateKeyDto } from '../key/dto/update-key.dto';


@Controller({
  path: 'admin',
  version: '1',
})
export class AdminController {
  constructor(
    private readonly adminService: AdminService,
    private readonly keyService: KeyService
  ) {}

  @Get('/access-token')
  async getAdminToken() {
    return await this.adminService.getAdminToken();
  }

  @Post('/key')
  createKey(@Body() createKeyDto: CreateKeyDto) {
    return this.keyService.create(createKeyDto);
  }

  @Get('/key/:key')
  findOne(@Param('key') key: string) {
    return this.keyService.findOne(key);
  }

  @Patch('/key/:key')
  updateKey(@Param('key') key: string, @Body() updateKeyDto: UpdateKeyDto) {
    return this.keyService.update(key, updateKeyDto);
  }

  @Delete('/key/:key')
  removeKey(@Param('key') key: string) {
    return this.keyService.softDelete(key);
  }

  @Get('/key')
  findAllKeys() {
    return this.keyService.findAll();
  }
  
}
