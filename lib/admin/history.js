// Real historical numbers for The J Effect (Jan–Sep 2026), copied from the Artemis
// "Private Office → Financials" screen. These pre-date the new Stripe checkout, so
// they are shown as imported history and are never mixed into Orders or Customers.
// Update this file (or replace it with a table) when the private office changes.
export const HISTORY_SOURCE = 'Artemis Private Office · Financials';
export const HISTORY_UPDATED = '2026-10-01';

export const HISTORY = [
  { period: 'January 2026', short: 'Jan', revenue: 4000, profit: 733, expenses: 3267 },
  { period: 'February 2026', short: 'Feb', revenue: 7936, profit: 1331, expenses: 6605 },
  { period: 'March 2026', short: 'Mar', revenue: 12487, profit: 1809, expenses: 10678 },
  { period: 'April 2026', short: 'Apr', revenue: 18216, profit: 2317, expenses: 15899 },
  { period: 'May 2026', short: 'May', revenue: 22846, profit: 2637, expenses: 20208 },
  { period: 'June 2026', short: 'Jun', revenue: 29274, profit: 2434, expenses: 26840 },
  { period: 'July 2026', short: 'Jul', revenue: 36596, profit: 2544, expenses: 34052 },
  { period: 'August 2026', short: 'Aug', revenue: 44426, profit: 1519, expenses: 42907 },
  { period: 'September 2026 (partial, through Sep 22)', short: 'Sep', revenue: 38176, profit: 2247, expenses: 35929 },
];

export const CASH = {
  available: 1524,
  reinvested: 37695,
  reserve: 1524,
  ownerDraw: 0,
  taxesOwed: 0,
  cumulativeProfit: 17572,
  totalRevenue: 213957,
  totalExpenses: 196384,
};
