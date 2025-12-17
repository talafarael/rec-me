import { Injectable, Inject, OnModuleInit } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { LeadformConfig } from './entity/leadform-config.entity';
import { UpdateSettingsDto } from './dto/update-settings.dto';
import { UpdateOsnovanieDto } from './dto/update-osnovanie.dto';
import { UpdateStep1Dto } from './dto/update-step1.dto';
import { UpdateStep2Dto } from './dto/update-step2.dto';
import { UpdateWhatsappDto } from './dto/update-whatsapp.dto';
import { mockLeadformConfig } from './mock/leadform-config.mock';

@Injectable()
export class LeadformConfigService implements OnModuleInit {
  private repository: Repository<LeadformConfig>;

  constructor(@Inject('DATA_SOURCE') private dataSource: DataSource) {
    this.repository = this.dataSource.getRepository(LeadformConfig);
  }

  async onModuleInit() {
    try {
      await this.initializeMockData();
    } catch (error) {
      // Handle case where table doesn't exist yet (migrations not run)
      console.warn('Leadform config table not found. Please run database migrations:', error.message);
    }
  }

  private async initializeMockData(): Promise<void> {
    const count = await this.repository.count();
    if (count === 0) {
      const { id, created_at, updated_at, ...mockDataWithoutId } =
        mockLeadformConfig;
      const mockData = this.repository.create(mockDataWithoutId);
      await this.repository.save(mockData);
      console.log('Mock leadform config data initialized');
    }
  }

  async getConfig(): Promise<LeadformConfig | null> {
    let config = await this.repository.findOne({
      where: {},
      order: { created_at: 'DESC' },
    });

    if (!config) {
      await this.initializeMockData();
      config = await this.repository.findOne({
        where: {},
        order: { created_at: 'DESC' },
      });
    }

    return config;
  }

  async updateSettings(dto: UpdateSettingsDto): Promise<LeadformConfig> {
    let config = await this.repository.findOne({
      where: {},
      order: { created_at: 'DESC' },
    });

    if (!config) {
      await this.initializeMockData();
      config = await this.repository.findOne({
        where: {},
        order: { created_at: 'DESC' },
      });
    }

    if (!config) {
      throw new Error('Failed to initialize or find config');
    }

    config.settings = {
      ...(config.settings || {}),
      ...dto,
    };

    return await this.repository.save(config);
  }

  async updateOsnovanie(dto: UpdateOsnovanieDto): Promise<LeadformConfig> {
    let config = await this.repository.findOne({
      where: {},
      order: { created_at: 'DESC' },
    });

    if (!config) {
      await this.initializeMockData();
      config = await this.repository.findOne({
        where: {},
        order: { created_at: 'DESC' },
      });
    }

    if (!config) {
      throw new Error('Failed to initialize or find config');
    }

    config.osnovanie = {
      ...(config.osnovanie || {}),
      ...dto,
    };

    return await this.repository.save(config);
  }

  async updateStep1(dto: UpdateStep1Dto): Promise<LeadformConfig> {
    let config = await this.repository.findOne({
      where: {},
      order: { created_at: 'DESC' },
    });

    if (!config) {
      await this.initializeMockData();
      config = await this.repository.findOne({
        where: {},
        order: { created_at: 'DESC' },
      });
    }

    if (!config) {
      throw new Error('Failed to initialize or find config');
    }

    config.step1 = {
      ...(config.step1 || {}),
      ...dto,
    };

    return await this.repository.save(config);
  }

  async updateStep2(dto: UpdateStep2Dto): Promise<LeadformConfig> {
    let config = await this.repository.findOne({
      where: {},
      order: { created_at: 'DESC' },
    });

    if (!config) {
      await this.initializeMockData();
      config = await this.repository.findOne({
        where: {},
        order: { created_at: 'DESC' },
      });
    }

    if (!config) {
      throw new Error('Failed to initialize or find config');
    }

    config.step2 = {
      ...(config.step2 || {}),
      ...dto,
    };

    return await this.repository.save(config);
  }

  async updateWhatsapp(dto: UpdateWhatsappDto): Promise<LeadformConfig> {
    let config = await this.repository.findOne({
      where: {},
      order: { created_at: 'DESC' },
    });

    if (!config) {
      await this.initializeMockData();
      config = await this.repository.findOne({
        where: {},
        order: { created_at: 'DESC' },
      });
    }

    if (!config) {
      throw new Error('Failed to initialize or find config');
    }

    config.whatsapp = {
      ...(config.whatsapp || {}),
      ...dto,
    };

    return await this.repository.save(config);
  }
}
