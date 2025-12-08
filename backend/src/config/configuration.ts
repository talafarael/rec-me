export default () => ({
  sendpulse: {
    secret: process.env.SENDPULSE_SECRET,
    clientId: process.env.SENDPULSE_ID,
    addressBookId: process.env.SENDPULSE_ADDRESS_BOOK_ID,
  },
  twilio: {
    accountsid: process.env.TWILIO_ACCOUNTSID,
    authtoken: process.env.TWILIO_AUTHTOKEN,
    phone: process.env.TWILIO_PHONE,
  },
  telegram: {
    token: process.env.TELEGRAM_TOKEN,
    chatId: process.env.TELEGRAM_CHAT_ID,
  },
  admin: {
    password: process.env.ADMIN_PASSWORD,
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'your-secret-key',
    expiresIn: process.env.JWT_EXPIRES_IN || '24h',
  },
});
