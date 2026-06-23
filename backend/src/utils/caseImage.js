/**
 * Auto-assigns a relevant atmospheric image to every case.
 *
 * Uses picsum.photos with category-specific seed numbers.
 * picsum.photos/seed/{seed}/800/500 — always loads, no API key needed,
 * each unique seed gives a unique photo.
 *
 * Category seed ranges (100 IDs each, zero overlap between categories):
 *   murder   → seeds 1000–1099
 *   missing  → seeds 1100–1199
 *   genocide → seeds 1200–1299
 *   police   → seeds 1300–1399
 *   suicide  → seeds 1400–1499
 *   other    → seeds 1500–1599
 */

const CATEGORY_RANGES = {
  murder:   { start: 1000, count: 100 },
  missing:  { start: 1100, count: 100 },
  genocide: { start: 1200, count: 100 },
  police:   { start: 1300, count: 100 },
  suicide:  { start: 1400, count: 100 },
  other:    { start: 1500, count: 100 },
};

const KEYWORD_OVERRIDES = [
  { keywords: ['holocaust', 'nazi', 'auschwitz', 'jewish', 'concentration'], category: 'genocide' },
  { keywords: ['serial killer', 'ripper', 'strangler', 'dahmer', 'bundy', 'gacy', 'btk'], category: 'murder' },
  { keywords: ['trial', 'court', 'verdict', 'acquit', 'convict', 'simpson', 'anthony'], category: 'police' },
  { keywords: ['massacre', 'ethnic cleansing', 'extermination', 'rwanda', 'srebrenica', 'darfur'], category: 'genocide' },
  { keywords: ['missing', 'disappeared', 'vanish', 'mccann', 'hoffa'], category: 'missing' },
  { keywords: ['zodiac', 'btk', 'night stalker', 'son of sam'], category: 'murder' },
];

function resolveCategory(category, title) {
  const titleLower = (title || '').toLowerCase();
  for (const ov of KEYWORD_OVERRIDES) {
    if (ov.keywords.some(k => titleLower.includes(k))) return ov.category;
  }
  return CATEGORY_RANGES[category] ? category : 'other';
}

function toUrl(seed) {
  // picsum seed-based URL — deterministic, always loads
  return `https://picsum.photos/seed/${seed}/800/500`;
}

function hashString(str) {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619) >>> 0;
  }
  return h;
}

/**
 * Single-case assignment — deterministic by caseId.
 * Stable: same case always gets the same image.
 */
function getCaseImageUrl(caseId, category, title = '') {
  const cat = resolveCategory(category, title);
  const range = CATEGORY_RANGES[cat];
  const offset = hashString(caseId) % range.count;
  return toUrl(range.start + offset);
}

/**
 * Bulk sequential assignment — zero duplicates within first 100 cases per category.
 * Takes array of { id, category, title }, returns array of { id, url }.
 */
function assignImagesSequentially(cases) {
  const counters = {};
  return cases.map(c => {
    const cat = resolveCategory(c.category, c.title);
    const range = CATEGORY_RANGES[cat];
    if (!(cat in counters)) counters[cat] = 0;
    const seed = range.start + (counters[cat] % range.count);
    counters[cat]++;
    return { id: c.id, url: toUrl(seed) };
  });
}

module.exports = { getCaseImageUrl, assignImagesSequentially };
