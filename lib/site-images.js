import 'server-only';
import fs from 'node:fs';
import path from 'node:path';

// True once a finished photo exists for the slot (public/site/<slot>.webp).
export function siteImageExists(slot) {
  try {
    return fs.existsSync(path.join(process.cwd(), 'public', 'site', `${slot}.webp`));
  } catch {
    return false;
  }
}
