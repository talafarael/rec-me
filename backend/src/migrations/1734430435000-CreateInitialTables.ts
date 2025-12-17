import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateInitialTables1734430435000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Create tokens table
    await queryRunner.createTable(
      new Table({
        name: 'tokens',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            default: 'gen_random_uuid()',
          },
          {
            name: 'encryptedTelegramBotToken',
            type: 'text',
            isNullable: true,
          },
          {
            name: 'encryptedTelegramChatId',
            type: 'text',
            isNullable: true,
          },
          {
            name: 'encryptedGoogleToken',
            type: 'text',
            isNullable: true,
          },
          {
            name: 'googleSheetUrl',
            type: 'text',
            isNullable: true,
          },
          {
            name: 'encryptedSendpulseSecret',
            type: 'text',
            isNullable: true,
          },
          {
            name: 'encryptedSendpulseClientId',
            type: 'text',
            isNullable: true,
          },
          {
            name: 'sendpulseAddressBookId',
            type: 'text',
            isNullable: true,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
        ],
      }),
      true,
    );

    // Create leadform_config table
    await queryRunner.createTable(
      new Table({
        name: 'leadform_config',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            default: 'gen_random_uuid()',
          },
          {
            name: 'settings',
            type: 'jsonb',
            isNullable: true,
          },
          {
            name: 'osnovanie',
            type: 'jsonb',
            isNullable: true,
          },
          {
            name: 'step1',
            type: 'jsonb',
            isNullable: true,
          },
          {
            name: 'step2',
            type: 'jsonb',
            isNullable: true,
          },
          {
            name: 'whatsapp',
            type: 'jsonb',
            isNullable: true,
          },
          {
            name: 'api',
            type: 'jsonb',
            isNullable: true,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('leadform_config');
    await queryRunner.dropTable('tokens');
  }
}

