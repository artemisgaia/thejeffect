// Branded HTML email (inline styles only; email clients ignore stylesheets).
import { SITE_CONFIG } from './site-config';

const FOREST = '#243B27';
const GOLD = '#C4954A';
const CREAM = '#F7F3EC';
const INK = '#3D3A35';
const MUTED = '#6B6559';

export function escapeHtml(s = '') {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// Plain text → paragraphs. Blank line = new paragraph, **bold** supported.
export function textToHtml(text = '') {
  return String(text)
    .split(/\n{2,}/)
    .map((p) => p.trim())
    .filter(Boolean)
    .map((p) => {
      const html = escapeHtml(p).replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>').replace(/\n/g, '<br />');
      return `<p style="margin:0 0 18px;font-size:16px;line-height:1.7;color:${INK};">${html}</p>`;
    })
    .join('');
}

export function renderEmail({ preview = '', heading = '', body = '', cta = null, unsubscribe = true }) {
  const button = cta?.url
    ? `<p style="margin:28px 0 8px;"><a href="${escapeHtml(cta.url)}" style="display:inline-block;background:${FOREST};color:${CREAM};text-decoration:none;font-size:13px;letter-spacing:.14em;text-transform:uppercase;padding:15px 30px;">${escapeHtml(cta.label || 'Shop now')}</a></p>`
    : '';

  return `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${escapeHtml(heading)}</title></head>
<body style="margin:0;padding:0;background:${CREAM};">
<span style="display:none;max-height:0;overflow:hidden;opacity:0;">${escapeHtml(preview)}</span>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${CREAM};padding:32px 12px;">
<tr><td align="center">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;background:#FDFCFA;">
<tr><td style="background:${FOREST};padding:30px 24px;text-align:center;">
<span style="font-family:Georgia,'Times New Roman',serif;font-size:22px;letter-spacing:.18em;text-transform:uppercase;color:${CREAM};">${escapeHtml(SITE_CONFIG.name)}</span>
</td></tr>
<tr><td style="padding:44px 40px 36px;font-family:-apple-system,'Helvetica Neue',Arial,sans-serif;">
${heading ? `<h1 style="margin:0 0 22px;font-family:Georgia,'Times New Roman',serif;font-weight:400;font-size:30px;line-height:1.2;color:${FOREST};">${escapeHtml(heading)}</h1>` : ''}
${body}
${button}
</td></tr>
<tr><td style="border-top:1px solid #E5DDD0;padding:24px 40px 34px;font-family:-apple-system,'Helvetica Neue',Arial,sans-serif;font-size:12px;line-height:1.7;color:${MUTED};text-align:center;">
<span style="color:${GOLD};letter-spacing:.2em;text-transform:uppercase;">Mindful skincare rituals</span><br>
${escapeHtml(SITE_CONFIG.address)}<br>
${unsubscribe ? '<a href="{{{RESEND_UNSUBSCRIBE_URL}}}" style="color:' + MUTED + ';">Unsubscribe</a>' : ''}
</td></tr>
</table>
</td></tr></table>
</body></html>`;
}
