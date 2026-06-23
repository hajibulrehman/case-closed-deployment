/**
 * CaseClosed CSV Importer
 * 
 * Usage:
 *   node src/import-csv.js <path-to-csv> [category]
 * 
 * Examples:
 *   node src/import-csv.js data/serial_killers.csv murder
 *   node src/import-csv.js data/missing_persons.csv missing
 *   node src/import-csv.js data/homicide_reports.csv murder
 * 
 * Supports these Kaggle datasets out of the box:
 *   - Serial Killers dataset (name, proven_victims, country, years_active, etc.)
 *   - Homicide Reports (CDC/FBI) (title, victim_race, city, state, year, etc.)
 *   - Missing Persons (first_name, last_name, date_missing, state, etc.)
 *   - Murder Accountability Project (Agency, Incident, VicAge, etc.)
 *   - Generic (title/name + description/summary + any extra fields)
 */

require('dotenv').config();
const fs = require('fs');
const path = require('path');
const { parse } = require('csv-parse/sync');
const prisma = require('./utils/prisma');
const { getCaseImageUrl, assignImagesSequentially } = require('./utils/caseImage');

// ─── Column name aliases ──────────────────────────────────────────────────────
// Maps various CSV column names → our internal field names
const ALIASES = {
  title: ['title', 'name', 'case_name', 'case_title', 'subject', 'full_name',
          'perpetrator', 'killer_name', 'first_name'],
  summary: ['summary', 'description', 'overview', 'details', 'bio',
            'modus_operandi', 'notes', 'circumstances'],
  fullContent: ['full_content', 'full_description', 'content', 'narrative',
                'case_details', 'case_summary', 'background'],
  location: ['location', 'country', 'state', 'city', 'place', 'jurisdiction',
             'agency_jurisdiction', 'incident_location', 'last_known_location'],
  date: ['date', 'year', 'date_of_crime', 'date_missing', 'incident_date',
         'years_active', 'active_from', 'first_offense', 'incident_year'],
  category: ['category', 'type', 'crime_type', 'case_type'],
};

// ─── Category detection keywords ─────────────────────────────────────────────
const CATEGORY_KEYWORDS = {
  murder:   ['murder', 'kill', 'homicide', 'serial', 'victim', 'slain', 'assassin'],
  suicide:  ['suicide', 'self', 'overdose', 'hanging'],
  missing:  ['missing', 'disappeared', 'unidentified', 'doe', 'abduct'],
  genocide: ['genocide', 'massacre', 'ethnic', 'war crime', 'holocaust', 'extermination'],
  police:   ['police', 'fbi', 'detective', 'investigation', 'arrest', 'trial', 'court'],
};

// ─── Helpers ──────────────────────────────────────────────────────────────────
function findColumn(headers, aliases) {
  const lower = headers.map(h => h.toLowerCase().trim());
  for (const alias of aliases) {
    const idx = lower.findIndex(h => h === alias || h.includes(alias));
    if (idx !== -1) return headers[idx];
  }
  return null;
}

function getVal(row, colName) {
  if (!colName) return null;
  const val = row[colName];
  return val && String(val).trim() !== '' ? String(val).trim() : null;
}

function detectCategory(text, fallback = 'other') {
  if (!text) return fallback;
  const lower = text.toLowerCase();
  for (const [cat, keywords] of Object.entries(CATEGORY_KEYWORDS)) {
    if (keywords.some(k => lower.includes(k))) return cat;
  }
  return fallback;
}

function buildTitle(row, headers, titleCol, firstNameCol) {
  // Try direct title column
  if (titleCol && getVal(row, titleCol)) return getVal(row, titleCol);

  // Try combining first_name + last_name
  const lastCol = headers.find(h => h.toLowerCase().includes('last_name') || h.toLowerCase() === 'surname');
  if (firstNameCol && lastCol) {
    const first = getVal(row, firstNameCol);
    const last = getVal(row, lastCol);
    if (first && last) return `${first} ${last}`;
    if (first) return first;
  }

  // Try perpetrator columns
  const perpCol = headers.find(h =>
    ['perpetrator_name', 'offender', 'suspect', 'killer'].some(k => h.toLowerCase().includes(k))
  );
  if (perpCol && getVal(row, perpCol)) return getVal(row, perpCol);

  return null;
}

function buildSummary(row, headers, summaryCol, category) {
  if (summaryCol && getVal(row, summaryCol)) return getVal(row, summaryCol);

  // Auto-build a summary from key fields
  const parts = [];

  const victimsCol = headers.find(h => ['victims', 'proven_victims', 'num_victims', 'victim_count', 'total_victims'].some(k => h.toLowerCase().includes(k)));
  const countryCol = headers.find(h => ['country', 'nationality', 'nation'].some(k => h.toLowerCase() === k));
  const yearCol = headers.find(h => ['year', 'years_active', 'date', 'active_from'].some(k => h.toLowerCase().includes(k)));
  const methodCol = headers.find(h => ['method', 'weapon', 'modus', 'cause_of_death', 'manner'].some(k => h.toLowerCase().includes(k)));
  const statusCol = headers.find(h => ['status', 'convicted', 'outcome', 'resolution'].some(k => h.toLowerCase().includes(k)));
  const raceCol = headers.find(h => h.toLowerCase().includes('race') || h.toLowerCase().includes('ethnicity'));
  const ageCol = headers.find(h => h.toLowerCase().includes('age'));
  const sexCol = headers.find(h => ['sex', 'gender'].some(k => h.toLowerCase() === k || h.toLowerCase().includes(k)));

  if (victimsCol && getVal(row, victimsCol)) parts.push(`Victims: ${getVal(row, victimsCol)}`);
  if (methodCol && getVal(row, methodCol)) parts.push(`Method: ${getVal(row, methodCol)}`);
  if (ageCol && getVal(row, ageCol)) parts.push(`Age: ${getVal(row, ageCol)}`);
  if (sexCol && getVal(row, sexCol)) parts.push(`Sex: ${getVal(row, sexCol)}`);
  if (raceCol && getVal(row, raceCol)) parts.push(`Ethnicity: ${getVal(row, raceCol)}`);
  if (statusCol && getVal(row, statusCol)) parts.push(`Status: ${getVal(row, statusCol)}`);
  if (countryCol && getVal(row, countryCol)) parts.push(`Country: ${getVal(row, countryCol)}`);

  return parts.length > 0
    ? parts.join(' · ')
    : `A documented ${category} case.`;
}

function buildFullContent(row, headers, usedCols) {
  const skipCols = new Set([...usedCols, 'id', 'index', 'unnamed: 0', '']);
  const lines = [];

  for (const header of headers) {
    if (skipCols.has(header)) continue;
    const val = getVal(row, header);
    if (!val || val === 'Unknown' || val === 'N/A' || val === '0') continue;
    const label = header
      .replace(/_/g, ' ')
      .replace(/\b\w/g, c => c.toUpperCase());
    lines.push(`${label}: ${val}`);
  }

  return lines.length > 0 ? lines.join('\n') : 'No additional details available.';
}

function buildLocation(row, headers, locationCol) {
  if (locationCol && getVal(row, locationCol)) return getVal(row, locationCol);

  const cityCol = headers.find(h => ['city', 'town', 'municipality'].some(k => h.toLowerCase() === k));
  const stateCol = headers.find(h => ['state', 'province', 'region'].some(k => h.toLowerCase() === k));
  const countryCol = headers.find(h => ['country', 'nation'].some(k => h.toLowerCase() === k));

  const parts = [
    cityCol ? getVal(row, cityCol) : null,
    stateCol ? getVal(row, stateCol) : null,
    countryCol ? getVal(row, countryCol) : null,
  ].filter(Boolean);

  return parts.length > 0 ? parts.join(', ') : null;
}

// ─── Main ─────────────────────────────────────────────────────────────────────
async function main() {
  const args = process.argv.slice(2);
  if (args.length === 0) {
    console.log(`
Usage: node src/import-csv.js <path-to-csv> [category] [options]

Arguments:
  path-to-csv   Path to the CSV file to import
  category      Optional: murder | suicide | missing | genocide | police | other
                (auto-detected from content if omitted)

Options:
  --limit=N     Only import first N rows (default: all)
  --skip=N      Skip first N data rows (default: 0)
  --featured    Mark all imported cases as featured
  --dry-run     Preview without saving to database

Examples:
  node src/import-csv.js data/serial_killers.csv murder
  node src/import-csv.js data/homicide_reports.csv --limit=200
  node src/import-csv.js data/missing.csv missing --featured
    `);
    process.exit(0);
  }

  const csvPath = path.resolve(process.cwd(), args[0]);
  if (!fs.existsSync(csvPath)) {
    console.error(`❌ File not found: ${csvPath}`);
    process.exit(1);
  }

  const forcedCategory = args[1] && !args[1].startsWith('--') ? args[1] : null;
  const limitArg = args.find(a => a.startsWith('--limit='));
  const skipArg = args.find(a => a.startsWith('--skip='));
  const featured = args.includes('--featured');
  const dryRun = args.includes('--dry-run');
  const limit = limitArg ? parseInt(limitArg.split('=')[1]) : Infinity;
  const skipRows = skipArg ? parseInt(skipArg.split('=')[1]) : 0;

  console.log(`\n📂 Reading: ${csvPath}`);
  if (dryRun) console.log('🔍 DRY RUN — nothing will be saved\n');

  const raw = fs.readFileSync(csvPath, 'utf8');

  // Parse CSV
  let records;
  try {
    records = parse(raw, {
      columns: true,
      skip_empty_lines: true,
      trim: true,
      relax_column_count: true,
      bom: true,
    });
  } catch (err) {
    console.error('❌ Failed to parse CSV:', err.message);
    process.exit(1);
  }

  if (records.length === 0) {
    console.error('❌ CSV is empty or has no data rows');
    process.exit(1);
  }

  const headers = Object.keys(records[0]);
  console.log(`📊 Columns detected (${headers.length}): ${headers.slice(0, 8).join(', ')}${headers.length > 8 ? '...' : ''}`);
  console.log(`📝 Total rows: ${records.length}`);

  // Map columns
  const titleCol = findColumn(headers, ALIASES.title);
  const summaryCol = findColumn(headers, ALIASES.summary);
  const fullContentCol = findColumn(headers, ALIASES.fullContent);
  const locationCol = findColumn(headers, ALIASES.location);
  const dateCol = findColumn(headers, ALIASES.date);
  const categoryCol = findColumn(headers, ALIASES.category);
  const firstNameCol = headers.find(h => h.toLowerCase() === 'first_name' || h.toLowerCase() === 'firstname');

  console.log('\n🗺  Column mapping:');
  console.log(`   title       → ${titleCol || '(auto-built)'}`);
  console.log(`   summary     → ${summaryCol || '(auto-built)'}`);
  console.log(`   fullContent → ${fullContentCol || '(auto-built from all fields)'}`);
  console.log(`   location    → ${locationCol || '(auto-built)'}`);
  console.log(`   date        → ${dateCol || '(none)'}`);
  console.log(`   category    → ${forcedCategory ? `forced: ${forcedCategory}` : categoryCol || '(auto-detected)'}`);

  // Process rows
  const toProcess = records.slice(skipRows, skipRows + limit);
  console.log(`\n⏳ Importing ${toProcess.length} rows...\n`);

  let imported = 0;
  let skipped = 0;
  let errors = 0;

  for (let i = 0; i < toProcess.length; i++) {
    const row = toProcess[i];

    try {
      // Build title
      const title = buildTitle(row, headers, titleCol, firstNameCol);
      if (!title || title.length < 2) {
        skipped++;
        continue;
      }

      // Build category
      const rawCategory = forcedCategory
        || (categoryCol ? getVal(row, categoryCol) : null);
      const category = rawCategory
        ? detectCategory(rawCategory, rawCategory.toLowerCase())
        : detectCategory(title + ' ' + (getVal(row, summaryCol) || ''));

      // Build other fields
      const usedCols = [titleCol, summaryCol, fullContentCol, locationCol, dateCol, categoryCol, firstNameCol].filter(Boolean);
      const summary = buildSummary(row, headers, summaryCol, category);
      const fullContent = fullContentCol
        ? (getVal(row, fullContentCol) || buildFullContent(row, headers, usedCols))
        : buildFullContent(row, headers, usedCols);
      const location = buildLocation(row, headers, locationCol);
      const date = dateCol ? getVal(row, dateCol) : null;

      if (dryRun) {
        if (i < 5) {
          console.log(`[${i + 1}] ${title}`);
          console.log(`     Category: ${category} | Location: ${location || 'N/A'} | Date: ${date || 'N/A'}`);
          console.log(`     Summary: ${summary?.substring(0, 100)}...`);
          console.log('');
        } else if (i === 5) {
          console.log(`... (showing first 5 only in dry-run)`);
        }
        imported++;
        continue;
      }

      // Check for duplicate
      const existing = await prisma.case.findFirst({ where: { title } });
      if (existing) {
        skipped++;
        continue;
      }

      await prisma.case.create({
        data: {
          title,
          category,
          summary: summary || `A documented ${category} case.`,
          fullContent: fullContent || summary || 'No details available.',
          location,
          date,
          featured: featured && i < 10,
          status: 'published',
        }
      });

      // Auto-assign image — use imported count + id for better variety
      const created = await prisma.case.findFirst({ where: { title }, orderBy: { createdAt: 'desc' } });
      if (created) {
        await prisma.caseMedia.create({
          data: {
            caseId: created.id,
            type: 'image',
            url: getCaseImageUrl(created.id + String(imported), category, title),
            caption: `Cover image for ${category} case`
          }
        });
      }

      imported++;

      // Progress
      if (imported % 50 === 0) {
        process.stdout.write(`   ✓ ${imported} imported...\r`);
      }
    } catch (err) {
      errors++;
      if (errors <= 3) console.error(`   ⚠ Row ${i + 1} error: ${err.message}`);
    }
  }

  console.log(`\n✅ Done!`);
  console.log(`   Imported : ${imported}`);
  console.log(`   Skipped  : ${skipped} (duplicates or missing title)`);
  console.log(`   Errors   : ${errors}`);
  if (!dryRun) console.log(`\n   Open http://localhost:5173/cases to view them.`);
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
}).finally(() => prisma.$disconnect());
