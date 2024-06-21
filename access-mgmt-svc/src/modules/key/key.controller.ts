import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { KeyService } from './key.service';
import { CreateKeyDto } from './dto/create-key.dto';
import { UpdateKeyDto } from './dto/update-key.dto';

@Controller('key')
export class KeyController {
  constructor(private readonly keyService: KeyService) {}

  @Post()
  create(@Body() createKeyDto: CreateKeyDto) {
    return this.keyService.create(createKeyDto);
  }

  @Get()
  findAll() {
    return this.keyService.findAll();
  }

  @Get(':key')
  findOne(@Param('key') key: string) {
    return this.keyService.findOne(key);
  }

  @Patch(':key')
  update(@Param('key') key: string, @Body() updateKeyDto: UpdateKeyDto) {
    return this.keyService.update(key, updateKeyDto);
  }

  @Delete(':key')
  softDelete(@Param('key') key: string) {
    return this.keyService.softDelete(key);
  } 
}
