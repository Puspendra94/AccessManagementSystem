import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TokenService } from './token.service';

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
