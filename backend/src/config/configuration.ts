export default () => ({
  sendpulse: {
    secret: process.env.SENDPULSE_SECRET,
    clientId: process.env.SENDPULSE_ID,
    addressBookId: process.env.SENDPULSE_ADDRESS_BOOK_ID,
  },
});
