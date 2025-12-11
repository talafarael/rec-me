import { LeadformConfig } from '../entity/leadform-config.entity';

export const mockLeadformConfig: LeadformConfig = {
  id: '123e4567-e89b-12d3-a456-426614174000',
  settings: {
    osnovanie: true,
    step1: true,
    step2: true,
    notifications: true,
    whatsapp: true,
    api: true,
  },
  osnovanie: {
    forwardButtonText: 'Next',
    backButtonText: 'Back',
    previewBackText: 'You can go back and change the data',
    thankYouText: 'Thank you for your application! We will contact you soon.',
    useCaptcha: true,
    usePhoneVerification: true,
  },
  step1: {
    fieldsCount: 3,
    field1Placeholder: 'Enter your name',
    field2Placeholder: 'Enter your phone number',
    field3Placeholder: 'Enter your email',
  },
  step2: {
    nameSurnamePlaceholder: 'Name & Surname',
    phonePlaceholder: 'Phone number',
    emailPlaceholder: 'Email',
  },
  // notifications: {
  //   telegramBotToken: '1234567890:ABCdefGHIjklMNOpqrsTUVwxyz',
  //   telegramChatId: '-1001234567890',
  //   googleToken: JSON.stringify({
  //     type: 'service_account',
  //     project_id: 'test-project',
  //     private_key_id: 'test-key-id',
  //     private_key: '-----BEGIN PRIVATE KEY-----\nTEST_KEY\n-----END PRIVATE KEY-----\n',
  //     client_email: 'test@test-project.iam.gserviceaccount.com',
  //     client_id: '123456789',
  //     auth_uri: 'https://accounts.google.com/o/oauth2/auth',
  //     token_uri: 'https://oauth2.googleapis.com/token',
  //   }),
  //   googleSheetUrl: 'https://docs.google.com/spreadsheets/d/1EOdZCdBeC0pMTKNEaXK5aGfo827y-lrIm7UrJYI-uNQ',
  // },
  whatsapp: {
    activateButton: true,
    messageTemplate: `Hello, my name is [name] [surname]
I would like to contact you to discuss an important topic for me
My email: [email]
My additional phone number: [phone]
Additional information: [1_field_]`,
    linkTemplate: 'https://wa.me/%phone%?text=%message%',
    contactNumbers: '+380501234567, +380671234567',
  },
  api: {
    url: 'https://dca.ua/%botname%?stat=type[1]=CRM&type[2]=user&utm_bot=%botname%&name[1]=%5Bname%5D&name[2]=%5Bsurname%5D&name[3]=%5B1_field_%5D&name[4]=%5B2_field_%5D&name[5]=%5B3_field_%5D&name[6]=%5B4_field_%5D&name[7]=%5Bphone%5D&name[8]=%5Bemail%5D',
  },
  created_at: new Date('2024-01-01T00:00:00.000Z'),
  updated_at: new Date('2024-01-01T00:00:00.000Z'),
};
