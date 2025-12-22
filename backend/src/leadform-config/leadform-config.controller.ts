import {
  Controller,
  Get,
  Patch,
  Body,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import { LeadformConfigService } from './leadform-config.service';
import { UpdateSettingsDto } from './dto/update-settings.dto';
import { UpdateOsnovanieDto } from './dto/update-osnovanie.dto';
import { UpdateStep1Dto } from './dto/update-step1.dto';
import { UpdateStep2Dto } from './dto/update-step2.dto';
import { UpdateWhatsappDto } from './dto/update-whatsapp.dto';
import type { MulterFile } from './types/multer-file.interface';
import { ParseFormDataInterceptor } from './interceptors/parse-form-data.interceptor';

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
  @UseInterceptors(
    FileInterceptor('backgroundImage', {
      storage: memoryStorage(),
      limits: {
        fileSize: 50 * 1024 * 1024, // 50MB
      },
    }),
    ParseFormDataInterceptor,
  )
  async updateOsnovanie(
    @Body() dto: UpdateOsnovanieDto,
    @UploadedFile() file?: MulterFile,
  ) {
    return await this.leadformConfigService.updateOsnovanie(dto, file);
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
