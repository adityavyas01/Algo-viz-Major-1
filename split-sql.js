/**
 * Split Large SQL File into Batches
 * Splits the 2.15MB leetcode_data.sql into smaller files
 * that can be run in Supabase SQL Editor
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const INPUT_FILE = path.join(__dirname, 'supabase', 'migrations', '20260219000001_leetcode_data.sql');
const OUTPUT_DIR = path.join(__dirname, 'supabase', 'migrations', 'batches');
const MAX_SIZE = 500 * 1024; // 500 KB per file (safe for SQL Editor)

async function splitSqlFile() {
  console.log('Reading SQL file...');
  const content = fs.readFileSync(INPUT_FILE, 'utf-8');
  
  // Extract header and footer
  const beginMatch = content.match(/BEGIN;/);
  const commitMatch = content.match(/COMMIT;[\s\S]*$/);
  
  const header = content.substring(0, beginMatch.index + 6);
  const footer = commitMatch ? commitMatch[0] : '\nCOMMIT;\n';
  
  // Extract all INSERT statements
  const insertPattern = /INSERT INTO public\.problems[\s\S]*?ON CONFLICT \(id\) DO NOTHING;/g;
  const inserts = content.match(insertPattern) || [];
  
  console.log(`Found ${inserts.length} INSERT batches`);
  
  // Create output directory
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  let currentFile = 1;
  let currentContent = header + '\n';
  let currentSize = Buffer.byteLength(currentContent, 'utf-8');
  let insertsInFile = 0;

  for (let i = 0; i < inserts.length; i++) {
    const insert = inserts[i];
    const insertSize = Buffer.byteLength(insert, 'utf-8');
    
    // Check if adding this insert would exceed max size
    if (currentSize + insertSize + Buffer.byteLength(footer, 'utf-8') > MAX_SIZE && insertsInFile > 0) {
      // Save current file
      currentContent += footer;
      const filename = path.join(OUTPUT_DIR, `leetcode_batch_${currentFile.toString().padStart(2, '0')}.sql`);
      fs.writeFileSync(filename, currentContent, 'utf-8');
      console.log(`Created ${filename} (${(currentSize / 1024).toFixed(2)} KB, ${insertsInFile} batches)`);
      
      // Start new file
      currentFile++;
      currentContent = header + '\n';
      currentSize = Buffer.byteLength(currentContent, 'utf-8');
      insertsInFile = 0;
    }
    
    currentContent += insert + '\n\n';
    currentSize += insertSize + 2;
    insertsInFile++;
  }
  
  // Save last file
  if (insertsInFile > 0) {
    currentContent += footer;
    const filename = path.join(OUTPUT_DIR, `leetcode_batch_${currentFile.toString().padStart(2, '0')}.sql`);
    fs.writeFileSync(filename, currentContent, 'utf-8');
    console.log(`Created ${filename} (${(currentSize / 1024).toFixed(2)} KB, ${insertsInFile} batches)`);
  }
  
  console.log(`\n✅ Split complete! Created ${currentFile} files in supabase/migrations/batches/`);
  console.log(`\nRun them in order in Supabase SQL Editor:`);
  for (let i = 1; i <= currentFile; i++) {
    console.log(`   ${i}. leetcode_batch_${i.toString().padStart(2, '0')}.sql`);
  }
}

splitSqlFile().catch(error => {
  console.error('Split failed:', error);
  process.exit(1);
});
