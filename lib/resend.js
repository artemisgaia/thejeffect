import 'server-only';
import { Resend } from 'resend';

let client = null;

export function getResend() {
  if (!process.env.RESEND_API_KEY) return null;
  if (!client) client = new Resend(process.env.RESEND_API_KEY);
  return client;
}

export const resendConfig = {
  // Segment that holds newsletter subscribers (Resend → Audience → Segments).
  segmentId: () => process.env.RESEND_SEGMENT_ID || process.env.RESEND_AUDIENCE_ID || '',
  // Must use a domain verified in Resend.
  from: () => process.env.RESEND_FROM || 'The J Effect <hello@thejeffect.com>',
  replyTo: () => process.env.RESEND_REPLY_TO || 'hello@thejeffect.com',
};
