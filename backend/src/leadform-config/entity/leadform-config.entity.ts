import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('leadform_config')
export class LeadformConfig {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'jsonb', nullable: true })
  settings: {
    osnovanie?: boolean;
    step1?: boolean;
    step2?: boolean;
    notifications?: boolean;
    whatsapp?: boolean;
    api?: boolean;
  } | null;

  @Column({ type: 'jsonb', nullable: true })
  osnovanie: {
    forwardButtonText?: string;
    backButtonText?: string;
    previewBackText?: string;
    thankYouText?: string;
    useCaptcha?: boolean;
    usePhoneVerification?: boolean;
  } | null;

  @Column({ type: 'jsonb', nullable: true })
  step1: {
    fieldsCount?: number; // 1, 2, or 3
    field1Placeholder?: string;
    field2Placeholder?: string;
    field3Placeholder?: string;
  } | null;

  @Column({ type: 'jsonb', nullable: true })
  step2: {
    nameSurnamePlaceholder?: string;
    phonePlaceholder?: string;
    emailPlaceholder?: string;
  } | null;

  @Column({ type: 'jsonb', nullable: true })
  whatsapp: {
    activateButton?: boolean;
    messageTemplate?: string;
    linkTemplate?: string;
    contactNumbers?: string; // comma-separated
  } | null;

  @Column({ type: 'jsonb', nullable: true })
  api: {
    url?: string;
  } | null;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

