// Segment rules → predicate over a customer row. `abandonedEmails` is a Set of recent abandoned-checkout emails.
export const SEGMENT_RULES = {
  all: () => true,
  purchased: (c) => (c.orders_count || 0) > 0,
  repeat: (c) => (c.orders_count || 0) > 1,
  never: (c) => (c.orders_count || 0) === 0,
  subscribed: (c) => Boolean(c.marketing),
  abandoned_30: (c, ctx) => ctx.abandonedEmails?.has(String(c.email).toLowerCase()),
};
export const applySegment = (rows, rule, ctx = {}) => rows.filter((c) => (SEGMENT_RULES[rule] || SEGMENT_RULES.all)(c, ctx));
