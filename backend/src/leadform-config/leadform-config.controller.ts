import { Controller, Get, Patch, Body } from '@nestjs/common';
import { LeadformConfigService } from './leadform-config.service';
import { UpdateSettingsDto } from './dto/update-settings.dto';
import { UpdateOsnovanieDto } from './dto/update-osnovanie.dto';
import { UpdateStep1Dto } from './dto/update-step1.dto';
import { UpdateStep2Dto } from './dto/update-step2.dto';
import { UpdateWhatsappDto } from './dto/update-whatsapp.dto';

@Controller('leadform-config')
export class LeadformConfigController {
  constructor(private readonly leadformConfigService: LeadformConfigService) {}

  @Get()
  async getConfig() {
    return await this.leadformConfigService.getConfig();
  }

  @Patch('settings')
  async updateSettings(@Body() dto: UpdateSettingsDto) {
    return await this.leadformConfigService.updateSettings(dto);
  }

  @Patch('osnovanie')
  async updateOsnovanie(@Body() dto: UpdateOsnovanieDto) {
    return await this.leadformConfigService.updateOsnovanie(dto);
  }

  @Patch('step1')
  async updateStep1(@Body() dto: UpdateStep1Dto) {
    return await this.leadformConfigService.updateStep1(dto);
  }

  @Patch('step2')
  async updateStep2(@Body() dto: UpdateStep2Dto) {
    return await this.leadformConfigService.updateStep2(dto);
  }

  @Patch('whatsapp')
  async updateWhatsapp(@Body() dto: UpdateWhatsappDto) {
    return await this.leadformConfigService.updateWhatsapp(dto);
  }
}
