/**
 * Case cover images — curated, permanent Unsplash direct CDN URLs.
 * These are direct photo URLs (no redirects, no API key needed).
 * Each category has 20 hand-picked atmospheric images that fit the mood.
 */

const CATEGORY_POOLS = {
  murder: [
    'https://images.unsplash.com/photo-1509909756405-be0199881695?w=800&h=500&fit=crop&auto=format&q=80',
    'https://images.unsplash.com/photo-1519692933481-e162a574559d?w=800&h=500&fit=crop&auto=format&q=80',
    'https://images.unsplash.com/photo-1453728013993-6d66e9c9123a?w=800&h=500&fit=crop&auto=format&q=80',
    'https://images.unsplash.com/photo-1547153760-18fc86324498?w=800&h=500&fit=crop&auto=format&q=80',
    'https://images.unsplash.com/photo-1531058020387-3be344556be6?w=800&h=500&fit=crop&auto=format&q=80',
    'https://images.unsplash.com/photo-1541354329998-f4d9a9f9297f?w=800&h=500&fit=crop&auto=format&q=80',
    'https://images.unsplash.com/photo-1504804392590-76e34f02c58d?w=800&h=500&fit=crop&auto=format&q=80',
    'https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?w=800&h=500&fit=crop&auto=format&q=80',
    'https://images.unsplash.com/photo-1470240731741-9eb7a3e9e5fc?w=800&h=500&fit=crop&auto=format&q=80',
    'https://images.unsplash.com/photo-1516585427167-9f4af9627e6c?w=800&h=500&fit=crop&auto=format&q=80',
    'https://images.unsplash.com/photo-1524234107056-1c1f48f64ab8?w=800&h=500&fit=crop&auto=format&q=80',
    'https://images.unsplash.com/photo-1605806616949-1e0a6728ab22?w=800&h=500&fit=crop&auto=format&q=80',
    'https://images.unsplash.com/photo-1522083165195-3424ed129620?w=800&h=500&fit=crop&auto=format&q=80',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=500&fit=crop&auto=format&q=80',
    'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=500&fit=crop&auto=format&q=80',
    'https://images.unsplash.com/photo-1551818255-e6e10975bc17?w=800&h=500&fit=crop&auto=format&q=80',
    'https://images.unsplash.com/photo-1509470475192-4516873f1f37?w=800&h=500&fit=crop&auto=format&q=80',
    'https://images.unsplash.com/photo-1517022812141-23620dba5c23?w=800&h=500&fit=crop&auto=format&q=80',
    'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=800&h=500&fit=crop&auto=format&q=80',
    'https://images.unsplash.com/photo-1504898770640-f03a8db43eed?w=800&h=500&fit=crop&auto=format&q=80',
  ],
  missing: [
    'https://images.unsplash.com/photo-1477346611705-65d1883cee1e?w=800&h=500&fit=crop&auto=format&q=80',
    'https://images.unsplash.com/photo-1494515843206-f3117d3f51b7?w=800&h=500&fit=crop&auto=format&q=80',
    'https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&h=500&fit=crop&auto=format&q=80',
    'https://images.unsplash.com/photo-1493836512294-502baa1986e2?w=800&h=500&fit=crop&auto=format&q=80',
    'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=800&h=500&fit=crop&auto=format&q=80',
    'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=800&h=500&fit=crop&auto=format&q=80',
    'https://images.unsplash.com/photo-1445991842686-7b19ffe2e7b5?w=800&h=500&fit=crop&auto=format&q=80',
    'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&h=500&fit=crop&auto=format&q=80',
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=500&fit=crop&auto=format&q=80',
    'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=800&h=500&fit=crop&auto=format&q=80',
    'https://images.unsplash.com/photo-1522163182402-834f871fd851?w=800&h=500&fit=crop&auto=format&q=80',
    'https://images.unsplash.com/photo-1473116763249-2faaef81ccda?w=800&h=500&fit=crop&auto=format&q=80',
    'https://images.unsplash.com/photo-1512273222628-4daea6e55abb?w=800&h=500&fit=crop&auto=format&q=80',
    'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&h=500&fit=crop&auto=format&q=80',
    'https://images.unsplash.com/photo-1519090688720-1668e2c72a16?w=800&h=500&fit=crop&auto=format&q=80',
    'https://images.unsplash.com/photo-1516912481808-3406841bd33c?w=800&h=500&fit=crop&auto=format&q=80',
    'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=800&h=500&fit=crop&auto=format&q=80',
    'https://images.unsplash.com/photo-1561046430-a39c09c4ac77?w=800&h=500&fit=crop&auto=format&q=80',
    'https://images.unsplash.com/photo-1574266773674-66028bc1c9b0?w=800&h=500&fit=crop&auto=format&q=80',
    'https://images.unsplash.com/photo-1567958451986-2de427a4a0be?w=800&h=500&fit=crop&auto=format&q=80',
  ],
  genocide: [
    'https://images.unsplash.com/photo-1547751673-4e67b3e6de73?w=800&h=500&fit=crop&auto=format&q=80',
    'https://images.unsplash.com/photo-1489696722750-1f0e5c4f85fd?w=800&h=500&fit=crop&auto=format&q=80',
    'https://images.unsplash.com/photo-1482235225082-9e0c51b47571?w=800&h=500&fit=crop&auto=format&q=80',
    'https://images.unsplash.com/photo-1498931299472-f7a63a5a1cfa?w=800&h=500&fit=crop&auto=format&q=80',
    'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&h=500&fit=crop&auto=format&q=80',
    'https://images.unsplash.com/photo-1467803738586-46b7eb7b16a1?w=800&h=500&fit=crop&auto=format&q=80',
    'https://images.unsplash.com/photo-1560787049-a2a7e7fda1c2?w=800&h=500&fit=crop&auto=format&q=80',
    'https://images.unsplash.com/photo-1562408590-e32931084e23?w=800&h=500&fit=crop&auto=format&q=80',
    'https://images.unsplash.com/photo-1573497161161-c3e73707e25c?w=800&h=500&fit=crop&auto=format&q=80',
    'https://images.unsplash.com/photo-1519090688720-1668e2c72a16?w=800&h=500&fit=crop&auto=format&q=80',
    'https://images.unsplash.com/photo-1590076082859-4b8b8b55e893?w=800&h=500&fit=crop&auto=format&q=80',
    'https://images.unsplash.com/photo-1541199249251-f713e6145474?w=800&h=500&fit=crop&auto=format&q=80',
    'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=800&h=500&fit=crop&auto=format&q=80',
    'https://images.unsplash.com/photo-1520209268518-aec60b8bb5ca?w=800&h=500&fit=crop&auto=format&q=80',
    'https://images.unsplash.com/photo-1540206395-68808572332f?w=800&h=500&fit=crop&auto=format&q=80',
    'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=800&h=500&fit=crop&auto=format&q=80',
    'https://images.unsplash.com/photo-1504898770640-f03a8db43eed?w=800&h=500&fit=crop&auto=format&q=80',
    'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=800&h=500&fit=crop&auto=format&q=80',
    'https://images.unsplash.com/photo-1516912481808-3406841bd33c?w=800&h=500&fit=crop&auto=format&q=80',
    'https://images.unsplash.com/photo-1509470475192-4516873f1f37?w=800&h=500&fit=crop&auto=format&q=80',
  ],
  police: [
    'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&h=500&fit=crop&auto=format&q=80',
    'https://images.unsplash.com/photo-1575505586569-646b2ca898fc?w=800&h=500&fit=crop&auto=format&q=80',
    'https://images.unsplash.com/photo-1562408590-e32931084e23?w=800&h=500&fit=crop&auto=format&q=80',
    'https://images.unsplash.com/photo-1464983953574-0892a716854b?w=800&h=500&fit=crop&auto=format&q=80',
    'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&h=500&fit=crop&auto=format&q=80',
    'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800&h=500&fit=crop&auto=format&q=80',
    'https://images.unsplash.com/photo-1573497161161-c3e73707e25c?w=800&h=500&fit=crop&auto=format&q=80',
    'https://images.unsplash.com/photo-1531058020387-3be344556be6?w=800&h=500&fit=crop&auto=format&q=80',
    'https://images.unsplash.com/photo-1605806616949-1e0a6728ab22?w=800&h=500&fit=crop&auto=format&q=80',
    'https://images.unsplash.com/photo-1524234107056-1c1f48f64ab8?w=800&h=500&fit=crop&auto=format&q=80',
    'https://images.unsplash.com/photo-1516585427167-9f4af9627e6c?w=800&h=500&fit=crop&auto=format&q=80',
    'https://images.unsplash.com/photo-1541354329998-f4d9a9f9297f?w=800&h=500&fit=crop&auto=format&q=80',
    'https://images.unsplash.com/photo-1504804392590-76e34f02c58d?w=800&h=500&fit=crop&auto=format&q=80',
    'https://images.unsplash.com/photo-1522083165195-3424ed129620?w=800&h=500&fit=crop&auto=format&q=80',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=500&fit=crop&auto=format&q=80',
    'https://images.unsplash.com/photo-1547153760-18fc86324498?w=800&h=500&fit=crop&auto=format&q=80',
    'https://images.unsplash.com/photo-1519692933481-e162a574559d?w=800&h=500&fit=crop&auto=format&q=80',
    'https://images.unsplash.com/photo-1453728013993-6d66e9c9123a?w=800&h=500&fit=crop&auto=format&q=80',
    'https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?w=800&h=500&fit=crop&auto=format&q=80',
    'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=500&fit=crop&auto=format&q=80',
  ],
  suicide: [
    'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&h=500&fit=crop&auto=format&q=80',
    'https://images.unsplash.com/photo-1473116763249-2faaef81ccda?w=800&h=500&fit=crop&auto=format&q=80',
    'https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&h=500&fit=crop&auto=format&q=80',
    'https://images.unsplash.com/photo-1477346611705-65d1883cee1e?w=800&h=500&fit=crop&auto=format&q=80',
    'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=800&h=500&fit=crop&auto=format&q=80',
    'https://images.unsplash.com/photo-1493836512294-502baa1986e2?w=800&h=500&fit=crop&auto=format&q=80',
    'https://images.unsplash.com/photo-1512273222628-4daea6e55abb?w=800&h=500&fit=crop&auto=format&q=80',
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=500&fit=crop&auto=format&q=80',
    'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=800&h=500&fit=crop&auto=format&q=80',
    'https://images.unsplash.com/photo-1522163182402-834f871fd851?w=800&h=500&fit=crop&auto=format&q=80',
    'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&h=500&fit=crop&auto=format&q=80',
    'https://images.unsplash.com/photo-1519090688720-1668e2c72a16?w=800&h=500&fit=crop&auto=format&q=80',
    'https://images.unsplash.com/photo-1574266773674-66028bc1c9b0?w=800&h=500&fit=crop&auto=format&q=80',
    'https://images.unsplash.com/photo-1561046430-a39c09c4ac77?w=800&h=500&fit=crop&auto=format&q=80',
    'https://images.unsplash.com/photo-1567958451986-2de427a4a0be?w=800&h=500&fit=crop&auto=format&q=80',
    'https://images.unsplash.com/photo-1516912481808-3406841bd33c?w=800&h=500&fit=crop&auto=format&q=80',
    'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=800&h=500&fit=crop&auto=format&q=80',
    'https://images.unsplash.com/photo-1494515843206-f3117d3f51b7?w=800&h=500&fit=crop&auto=format&q=80',
    'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=800&h=500&fit=crop&auto=format&q=80',
    'https://images.unsplash.com/photo-1445991842686-7b19ffe2e7b5?w=800&h=500&fit=crop&auto=format&q=80',
  ],
  other: [
    'https://images.unsplash.com/photo-1519692933481-e162a574559d?w=800&h=500&fit=crop&auto=format&q=80',
    'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=800&h=500&fit=crop&auto=format&q=80',
    'https://images.unsplash.com/photo-1453728013993-6d66e9c9123a?w=800&h=500&fit=crop&auto=format&q=80',
    'https://images.unsplash.com/photo-1470240731741-9eb7a3e9e5fc?w=800&h=500&fit=crop&auto=format&q=80',
    'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&h=500&fit=crop&auto=format&q=80',
    'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=800&h=500&fit=crop&auto=format&q=80',
    'https://images.unsplash.com/photo-1531058020387-3be344556be6?w=800&h=500&fit=crop&auto=format&q=80',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=500&fit=crop&auto=format&q=80',
    'https://images.unsplash.com/photo-1522083165195-3424ed129620?w=800&h=500&fit=crop&auto=format&q=80',
    'https://images.unsplash.com/photo-1541354329998-f4d9a9f9297f?w=800&h=500&fit=crop&auto=format&q=80',
    'https://images.unsplash.com/photo-1504898770640-f03a8db43eed?w=800&h=500&fit=crop&auto=format&q=80',
    'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=800&h=500&fit=crop&auto=format&q=80',
    'https://images.unsplash.com/photo-1516912481808-3406841bd33c?w=800&h=500&fit=crop&auto=format&q=80',
    'https://images.unsplash.com/photo-1509470475192-4516873f1f37?w=800&h=500&fit=crop&auto=format&q=80',
    'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=800&h=500&fit=crop&auto=format&q=80',
    'https://images.unsplash.com/photo-1567958451986-2de427a4a0be?w=800&h=500&fit=crop&auto=format&q=80',
    'https://images.unsplash.com/photo-1540206395-68808572332f?w=800&h=500&fit=crop&auto=format&q=80',
    'https://images.unsplash.com/photo-1520209268518-aec60b8bb5ca?w=800&h=500&fit=crop&auto=format&q=80',
    'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=800&h=500&fit=crop&auto=format&q=80',
    'https://images.unsplash.com/photo-1541199249251-f713e6145474?w=800&h=500&fit=crop&auto=format&q=80',
  ],
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
  return CATEGORY_POOLS[category] ? category : 'other';
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
 * Deterministic by caseId — same case always gets the same image, forever.
 */
function getCaseImageUrl(caseId, category, title = '') {
  const cat = resolveCategory(category, title);
  const pool = CATEGORY_POOLS[cat];
  const idx = hashString(caseId) % pool.length;
  return pool[idx];
}

/**
 * Sequential bulk assignment — zero duplicates within first 20 per category.
 */
function assignImagesSequentially(cases) {
  const counters = {};
  return cases.map(c => {
    const cat = resolveCategory(c.category, c.title);
    const pool = CATEGORY_POOLS[cat];
    if (!(cat in counters)) counters[cat] = 0;
    const idx = counters[cat] % pool.length;
    counters[cat]++;
    return { id: c.id, url: pool[idx] };
  });
}

module.exports = { getCaseImageUrl, assignImagesSequentially };
