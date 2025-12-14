import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

export interface ILeadformNotifications {
  telegramBotToken?: string;
  telegramChatId?: string;
  googleToken?: string;
  googleSheetUrl?: string;
  sendpulseSecret?: string;
  sendpulseClientId?: string;
  sendpulseAddressBookId?: string;
}

@Entity('tokens')
export class Token {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text', nullable: true })
  encryptedTelegramBotToken: string | null;

  @Column({ type: 'text', nullable: true })
  encryptedTelegramChatId: string | null;

  @Column({ type: 'text', nullable: true })
  encryptedGoogleToken: string | null;

  @Column({ type: 'text', nullable: true })
  googleSheetUrl: string | null;

  @Column({ type: 'text', nullable: true })
  encryptedSendpulseSecret: string | null;

  @Column({ type: 'text', nullable: true })
  encryptedSendpulseClientId: string | null;

  @Column({ type: 'text', nullable: true })
  sendpulseAddressBookId: string | null;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
