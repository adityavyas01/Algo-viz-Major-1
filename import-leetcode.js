/**
 * LeetCode CSV Import Script
 * Parses leetcode_dataset - lc.csv and generates SQL insert statements
 * Handles 34,819 problems with proper escaping and JSON formatting
 */

import fs from 'fs';
import path from 'path';
import { parse } from 'csv-parse/sync';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const CSV_FILE = path.join(__dirname, 'leetcode_dataset - lc.csv');
const OUTPUT_SQL = path.join(__dirname, 'supabase', 'migrations', '20260219000001_leetcode_data.sql');
const BATCH_SIZE = 500; // Insert 500 problems per batch

function escapeSqlString(str) {
  if (!str) return 'NULL';
  return `'${str.replace(/'/g, "''").replace(/\\/g, '\\\\')}'`;
}

function parseJsonField(field) {
  if (!field || field.trim() === '') return '\'[]\'::jsonb';
  
  try {
    // Handle arrays like ["Array", "Hash Table"]
    if (field.startsWith('[') && field.endsWith(']')) {
      const parsed = JSON.parse(field);
      return `'${JSON.stringify(parsed)}'::jsonb`;
    }
    // Handle single values
    return `'["${field}"]'::jsonb`;
  } catch (e) {
    console.warn(`Failed to parse JSON field: ${field.substring(0, 50)}...`);
    return '\'[]\'::jsonb';
  }
}

function parseBoolean(value) {
  if (typeof value === 'boolean') return value;
  if (value === 'True' || value === 'true' || value === '1') return true;
  if (value === 'False' || value === 'false' || value === '0') return false;
  return false;
}

function parseNumber(value, defaultValue = 0) {
  const num = parseFloat(value);
  return isNaN(num) ? defaultValue : num;
}

async function importLeetCodeData() {
  console.log('Reading CSV file...');
  const csvContent = fs.readFileSync(CSV_FILE, 'utf-8');
  
  console.log('Parsing CSV...');
  const records = parse(csvContent, {
    columns: true,
    skip_empty_lines: true,
    relax_quotes: true,
    relax_column_count: true
  });

  console.log(`Found ${records.length} problems`);

  let sqlContent = `-- ============================================
-- LeetCode Dataset Import
-- Generated on: ${new Date().toISOString()}
-- Total Problems: ${records.length}
-- ============================================

BEGIN;

`;

  let validProblems = 0;
  let skippedProblems = 0;

  for (let i = 0; i < records.length; i += BATCH_SIZE) {
    const batch = records.slice(i, Math.min(i + BATCH_SIZE, records.length));
    
    sqlContent += `-- Batch ${Math.floor(i / BATCH_SIZE) + 1} (Problems ${i + 1} - ${Math.min(i + BATCH_SIZE, records.length)})\n`;
    sqlContent += `INSERT INTO public.problems 
  (id, title, description, is_premium, difficulty, solution_link, acceptance_rate, 
   frequency, url, discuss_count, accepted, submissions, companies, related_topics, 
   likes, dislikes, rating, asked_by_faang, similar_questions, is_active)
VALUES\n`;

    const values = [];
    
    for (const record of batch) {
      try {
        const id = parseInt(record.id);
        if (isNaN(id)) {
          skippedProblems++;
          continue;
        }

        const title = escapeSqlString(record.title);
        const description = escapeSqlString(record.description);
        const isPremium = parseBoolean(record.is_premium);
        const difficulty = escapeSqlString(record.difficulty || 'Medium');
        const solutionLink = record.solution_link ? escapeSqlString(record.solution_link) : 'NULL';
        const acceptanceRate = parseNumber(record.acceptance_rate, 0);
        const frequency = parseNumber(record.frequency, 0);
        const url = record.url ? escapeSqlString(record.url) : 'NULL';
        const discussCount = parseNumber(record.discuss_count, 0);
        const accepted = parseNumber(record.accepted, 0);
        const submissions = parseNumber(record.submissions, 0);
        const companies = parseJsonField(record.companies);
        const relatedTopics = parseJsonField(record.related_topics);
        const likes = parseNumber(record.likes, 0);
        const dislikes = parseNumber(record.dislikes, 0);
        const rating = parseNumber(record.rating, 0);
        const askedByFaang = parseBoolean(record.asked_by_faang);
        const similarQuestions = parseJsonField(record.similar_questions);

        values.push(`  (${id}, ${title}, ${description}, ${isPremium}, ${difficulty}, ${solutionLink}, ${acceptanceRate}, 
   ${frequency}, ${url}, ${discussCount}, ${accepted}, ${submissions}, ${companies}, ${relatedTopics}, 
   ${likes}, ${dislikes}, ${rating}, ${askedByFaang}, ${similarQuestions}, true)`);

        validProblems++;
      } catch (error) {
        console.error(`Error processing record ${record.id}: ${error.message}`);
        skippedProblems++;
      }
    }

    if (values.length > 0) {
      sqlContent += values.join(',\n');
      sqlContent += '\nON CONFLICT (id) DO NOTHING;\n\n';
    }
  }

  sqlContent += `COMMIT;

-- ============================================
-- Import Summary
-- ============================================
-- Total Problems Imported: ${validProblems}
-- Skipped: ${skippedProblems}
-- ============================================
`;

  console.log('Writing SQL file...');
  fs.writeFileSync(OUTPUT_SQL, sqlContent, 'utf-8');

  console.log(`\n✅ Import complete!`);
  console.log(`   Valid problems: ${validProblems}`);
  console.log(`   Skipped: ${skippedProblems}`);
  console.log(`   Output: ${OUTPUT_SQL}`);
}

// Run the import
importLeetCodeData().catch(error => {
  console.error('Import failed:', error);
  process.exit(1);
});
