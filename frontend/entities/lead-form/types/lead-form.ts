import { ILeadformOsnovanie } from "@/entities/osnovanie/types/osnovanie";
import { ILeadformStep1 } from "@/entities/step1/types/step1";
import { ILeadformStep2 } from "@/entities/step2/types/step2";
import { ILeadformWhatsapp } from "@/entities/whatsapp/types/whatsapp";
import { ILeadformNotifications } from "@/entities/token/types/token";

export interface ILeadformConfig {
  id: string;
  settings: ILeadformSettings | null;
  osnovanie?: ILeadformOsnovanie;
  step1: ILeadformStep1 | null;
  step2: ILeadformStep2 | null;
  notifications: ILeadformNotifications | null;
  whatsapp: ILeadformWhatsapp | null;
  api: ILeadformApi | null;
  created_at: Date;
  updated_at: Date;
}

export interface ILeadformSettings {
  osnovanie?: boolean;
  step1?: boolean;
  step2?: boolean;
  captcha?: boolean;
  notifications?: boolean;
  whatsapp?: boolean;
  api?: boolean;
}

export interface ILeadformApi {
  url?: string;
}
