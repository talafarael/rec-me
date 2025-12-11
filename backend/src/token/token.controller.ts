import { Controller, Get, Patch, Body } from '@nestjs/common';
import { TokenService } from './token.service';
import { UpdateTokenDto } from './dto/update-token.dto';

@Controller('token')
export class TokenController {
  constructor(private readonly tokenService: TokenService) {}

  @Get()
  async getNotifications() {
    return await this.tokenService.getNotifications();
  }

  @Patch()
  async update(@Body() dto: UpdateTokenDto) {
    return await this.tokenService.update(dto);
  }
}
