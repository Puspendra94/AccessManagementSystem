import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { KeyService } from '../key/key.service';
import { UpdateKeyDto } from '../key/dto/update-key.dto';

@Controller({
  path: 'user',
  version: '1',
})
export class UserController {
  constructor(private readonly keyService: KeyService) {}

  @Get('key/:key')
  findOne(@Param('key') key: string) {
    return this.keyService.findOne(key)
  }

  @Patch('key/:key')
  update(@Param('key') key: string, @Body() updateKeyDto: UpdateKeyDto) {
    return this.keyService.update(key, updateKeyDto);
  }

  @Delete('key/:key')
  remove(@Param('key') key: string) {
    return this.keyService.softDelete(key);
  }
}
