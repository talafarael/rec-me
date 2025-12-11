import { Injectable, Inject, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DataSource, Repository } from 'typeorm';
import { createCipheriv, createDecipheriv, randomBytes } from 'crypto';
import { Token } from './entity/token.entity';
import { UpdateTokenDto } from './dto/update-token.dto';
import { ILeadformNotifications } from './entity/token.entity';

@Injectable()
export class TokenService implements OnModuleInit {
  private repository: Repository<Token>;
  private encryptionKey: string;
  private readonly algorithm = 'aes-256-gcm';
  private readonly keyLength = 32;

  constructor(
    @Inject('DATA_SOURCE') private dataSource: DataSource,
    private readonly configService: ConfigService,
  ) {
    this.repository = this.dataSource.getRepository(Token);
    this.encryptionKey = this.configService.get<string>(
      'encryption.key',
    ) as string;
  }

  async onModuleInit() {
    const count = await this.repository.count();
    if (count === 0) {
      const token = this.repository.create({});
      await this.repository.save(token);
    }
  }

  private async getKey(): Promise<Buffer> {
    const key = Buffer.from(
      this.encryptionKey.padEnd(this.keyLength, '0').slice(0, this.keyLength),
      'utf-8',
    );
    return key;
  }

  private async encrypt(text: string): Promise<string> {
    if (!text) return '';
    const key = await this.getKey();
    const iv = randomBytes(16);
    const cipher = createCipheriv(this.algorithm, key, iv);

    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');

    const authTag = cipher.getAuthTag();


    return `${iv.toString('hex')}:${authTag.toString('hex')}:${encrypted}`;
  }

  private async decrypt(encryptedText: string): Promise<string> {
    if (!encryptedText) return '';
    const key = await this.getKey();
    const parts = encryptedText.split(':');
    if (parts.length !== 3) {
      throw new Error('Invalid encrypted text format');
    }

    const iv = Buffer.from(parts[0], 'hex');
    const authTag = Buffer.from(parts[1], 'hex');
    const encrypted = parts[2];

    const decipher = createDecipheriv(this.algorithm, key, iv);
    decipher.setAuthTag(authTag);

    let decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');

    return decrypted;
  }

  private async getOrCreateToken(): Promise<Token> {
    let token = await this.repository.findOne({
      where: {},
      order: { created_at: 'DESC' },
    });

    if (!token) {
      token = this.repository.create({});
      token = await this.repository.save(token);
    }

    return token;
  }

  async getNotifications(): Promise<ILeadformNotifications> {
    const token = await this.getOrCreateToken();

    const notifications: ILeadformNotifications = {};

    if (token.encryptedTelegramBotToken) {
      try {
        notifications.telegramBotToken = await this.decrypt(
          token.encryptedTelegramBotToken,
        );
      } catch (error) {
        console.error('Failed to decrypt telegram bot token:', error);
      }
    }

    if (token.encryptedTelegramChatId) {
      try {
        notifications.telegramChatId = await this.decrypt(
          token.encryptedTelegramChatId,
        );
      } catch (error) {
        console.error('Failed to decrypt telegram chat id:', error);
      }
    }

    if (token.encryptedGoogleToken) {
      try {
        notifications.googleToken = await this.decrypt(
          token.encryptedGoogleToken,
        );
      } catch (error) {
        console.error('Failed to decrypt google token:', error);
      }
    }

    notifications.googleSheetUrl = token.googleSheetUrl || undefined;

    return notifications;
  }

  async update(dto: UpdateTokenDto): Promise<Token> {
    const token = await this.getOrCreateToken();

    if (dto.telegramBotToken !== undefined) {
      token.encryptedTelegramBotToken = dto.telegramBotToken
        ? await this.encrypt(dto.telegramBotToken)
        : null;
    }

    if (dto.telegramChatId !== undefined) {
      token.encryptedTelegramChatId = dto.telegramChatId
        ? await this.encrypt(dto.telegramChatId)
        : null;
    }

    if (dto.googleToken !== undefined) {
      token.encryptedGoogleToken = dto.googleToken
        ? await this.encrypt(dto.googleToken)
        : null;
    }

    if (dto.googleSheetUrl !== undefined) {
      token.googleSheetUrl = dto.googleSheetUrl || null;
    }

    return await this.repository.save(token);
  }
}
