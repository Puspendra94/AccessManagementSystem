import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TokenService } from './token.service';
import { CreateTokenDto } from './dto/create-token.dto';
import { UpdateTokenDto } from './dto/update-token.dto';

@Controller({
  path: 'token',
  version: '1',
})
export class TokenController {
  constructor(private readonly tokenService: TokenService) {}

 @Get('info')
  findAll() {
    return this.tokenService.getTokenInfo();
  }
}
