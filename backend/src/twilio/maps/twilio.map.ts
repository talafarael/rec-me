export const messageCodeMap: Map<string, string> = new Map();

export const setMessageCode = (
  phone: string,
  code: number,
  ttl = 5 * 60 * 1000,
) => {
  messageCodeMap.set(phone, code.toString());

  setTimeout(() => {
    messageCodeMap.delete(phone);
  }, ttl);
};

export const getMessageCode = (phone: string): string | undefined => {
  console.log(messageCodeMap);
  return messageCodeMap.get(phone);
};

export const deleteMessageCode = (phone: string): boolean => {
  return messageCodeMap.delete(phone);
};
