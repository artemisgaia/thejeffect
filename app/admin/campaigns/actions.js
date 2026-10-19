'use server';
import { revalidatePath } from 'next/cache';
import { requireAdmin } from '@/lib/admin/auth';
import { getResend, resendConfig } from '@/lib/resend';
import { renderEmail, textToHtml } from '@/lib/email-template';

function readCampaign(formData) {
  const t = (k, max) => String(formData.get(k) ?? '').trim().slice(0, max);
  const url = t('cta_url', 500);
  return {
    subject: t('subject', 160),
    preview: t('preview', 200),
    heading: t('heading', 160),
    body: t('body', 8000),
    cta: url ? { label: t('cta_label', 40) || 'Shop now', url } : null,
  };
}

function validate(c) {
  if (!c.subject) return 'Add a subject line.';
  if (!c.body) return 'Write the email body.';
  if (c.cta && !/^https?:\/\//i.test(c.cta.url)) return 'The button link must start with https://';
  return null;
}

const html = (c, unsubscribe) =>
  renderEmail({ preview: c.preview, heading: c.heading, body: textToHtml(c.body), cta: c.cta, unsubscribe });

export async function sendTest(prevState, formData) {
  const { user } = await requireAdmin();
  const resend = getResend();
  if (!resend) return { error: 'Add RESEND_API_KEY to send emails.' };

  const c = readCampaign(formData);
  const problem = validate(c);
  if (problem) return { error: problem };

  const { error } = await resend.emails.send({
    from: resendConfig.from(),
    to: user.email,
    replyTo: resendConfig.replyTo(),
    subject: `[Test] ${c.subject}`,
    html: html(c, false),
  });
  if (error) return { error: error.message };
  return { ok: true, message: `Test sent to ${user.email}.` };
}

export async function sendCampaign(prevState, formData) {
  const { supabase, user } = await requireAdmin();
  const resend = getResend();
  if (!resend) return { error: 'Add RESEND_API_KEY to send emails.' };
  const segmentId = resendConfig.segmentId();
  if (!segmentId) return { error: 'Add RESEND_SEGMENT_ID (the Resend segment your subscribers are in).' };
  if (!formData.has('confirm')) return { error: 'Tick the confirmation box to send to your whole list.' };

  const c = readCampaign(formData);
  const problem = validate(c);
  if (problem) return { error: problem };

  const { count } = await supabase
    .from('subscribers').select('*', { count: 'exact', head: true }).eq('status', 'subscribed');

  const { data, error } = await resend.broadcasts.create({
    name: c.subject,
    segmentId,
    from: resendConfig.from(),
    replyTo: resendConfig.replyTo(),
    subject: c.subject,
    previewText: c.preview || undefined,
    html: html(c, true),
    send: true,
  });
  if (error) return { error: error.message };

  await supabase.from('campaigns').insert({
    subject: c.subject,
    preview_text: c.preview,
    body: c.body,
    resend_broadcast_id: data?.id ?? null,
    status: 'sent',
    recipients: count ?? null,
    created_by: user.email,
    sent_at: new Date().toISOString(),
  });

  revalidatePath('/admin/campaigns');
  revalidatePath('/admin');
  return { ok: true, message: 'Campaign sent through Resend.' };
}
