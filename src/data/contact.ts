/** Orders and support run over WhatsApp — no payment is taken in the app. */
const WHATSAPP_NUMBER = '447832486269';

export const whatsappLink = (message: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
