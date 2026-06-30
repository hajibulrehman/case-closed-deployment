/**
 * Case cover images — verified working Unsplash direct CDN URLs.
 * Every URL here has been confirmed to load without auth or referrer headers.
 */

// These specific photo IDs are confirmed to work as direct hotlinks
const VERIFIED_POOL = [
  'https://images.unsplash.com/photo-1453728013993-6d66e9c9123a?w=800&h=500&fit=crop&auto=format&q=80',
  'https://images.unsplash.com/photo-1519692933481-e162a574559d?w=800&h=500&fit=crop&auto=format&q=80',
  'https://images.unsplash.com/photo-1477346611705-65d1883cee1e?w=800&h=500&fit=crop&auto=format&q=80',
  'https://images.unsplash.com/photo-1489696722750-1f0e5c4f85fd?w=800&h=500&fit=crop&auto=format&q=80',
  'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800&h=500&fit=crop&auto=format&q=80',
  'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&h=500&fit=crop&auto=format&q=80',
  'https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&h=500&fit=crop&auto=format&q=80',
  'https://images.unsplash.com/photo-1494515843206-f3117d3f51b7?w=800&h=500&fit=crop&auto=format&q=80',
  'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=800&h=500&fit=crop&auto=format&q=80',
  'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=500&fit=crop&auto=format&q=80',
  'https://images.unsplash.com/photo-1473116763249-2faaef81ccda?w=800&h=500&fit=crop&auto=format&q=80',
  'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=800&h=500&fit=crop&auto=format&q=80',
  'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&h=500&fit=crop&auto=format&q=80',
  'https://images.unsplash.com/photo-1493836512294-502baa1986e2?w=800&h=500&fit=crop&auto=format&q=80',
  'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=800&h=500&fit=crop&auto=format&q=80',
  'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&h=500&fit=crop&auto=format&q=80',
  'https://images.unsplash.com/photo-1467803738586-46b7eb7b16a1?w=800&h=500&fit=crop&auto=format&q=80',
  'https://images.unsplash.com/photo-1482235225082-9e0c51b47571?w=800&h=500&fit=crop&auto=format&q=80',
  'https://images.unsplash.com/photo-1531058020387-3be344556be6?w=800&h=500&fit=crop&auto=format&q=80',
  'https://images.unsplash.com/photo-1547153760-18fc86324498?w=800&h=500&fit=crop&auto=format&q=80',
  'https://images.unsplash.com/photo-1516912481808-3406841bd33c?w=800&h=500&fit=crop&auto=format&q=80',
  'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=800&h=500&fit=crop&auto=format&q=80',
  'https://images.unsplash.com/photo-1522163182402-834f871fd851?w=800&h=500&fit=crop&auto=format&q=80',
  'https://images.unsplash.com/photo-1512273222628-4daea6e55abb?w=800&h=500&fit=crop&auto=format&q=80',
  'https://images.unsplash.com/photo-1561046430-a39c09c4ac77?w=800&h=500&fit=crop&auto=format&q=80',
  'https://images.unsplash.com/photo-1574266773674-66028bc1c9b0?w=800&h=500&fit=crop&auto=format&q=80',
  'https://images.unsplash.com/photo-1519090688720-1668e2c72a16?w=800&h=500&fit=crop&auto=format&q=80',
  'https://images.unsplash.com/photo-1445991842686-7b19ffe2e7b5?w=800&h=500&fit=crop&auto=format&q=80',
  'https://images.unsplash.com/photo-1570224522620-7ab0cc6e5fe6?w=800&h=500&fit=crop&auto=format&q=80',
  'https://images.unsplash.com/photo-1504898770640-f03a8db43eed?w=800&h=500&fit=crop&auto=format&q=80',
];

function hashString(str) {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619) >>> 0;
  }
  return h;
}

/**
 * Deterministic by caseId — same case always gets the same image.
 */
function getCaseImageUrl(caseId, category, title = '') {
  const idx = hashString(String(caseId) + String(category)) % VERIFIED_POOL.length;
  return VERIFIED_POOL[idx];
}

/**
 * Sequential bulk assignment with no repeats until pool is exhausted.
 */
function assignImagesSequentially(cases) {
  return cases.map((c, i) => ({
    id: c.id,
    url: VERIFIED_POOL[i % VERIFIED_POOL.length],
  }));
}

module.exports = { getCaseImageUrl, assignImagesSequentially };
