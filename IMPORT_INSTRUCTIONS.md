# LeetCode Data Import - Batch Instructions

## The Problem
The full SQL file (2.15 MB) is too large for Supabase SQL Editor's query size limit.

## Solution: Import in 4 Batches

I've split the data into 4 smaller files (each ~500KB):

### Step-by-Step Instructions

1. **First, run the schema migration**:
   - Open: https://supabase.com/dashboard/project/lctytebgxakcztdijbxu/sql/new
   - Copy & paste content from: `supabase/migrations/20260219000000_leetcode_migration.sql`
   - Click **RUN**
   - Wait for success ✅

2. **Then, import data in 4 batches**:

   **Batch 1** (500 problems):
   - New Query
   - Copy & paste: `supabase/migrations/batches/leetcode_batch_01.sql`
   - RUN → Wait for success ✅
   
   **Batch 2** (500 problems):
   - New Query
   - Copy & paste: `supabase/migrations/batches/leetcode_batch_02.sql`
   - RUN → Wait for success ✅
   
   **Batch 3** (500 problems):
   - New Query
   - Copy & paste: `supabase/migrations/batches/leetcode_batch_03.sql`
   - RUN → Wait for success ✅
   
   **Batch 4** (325 problems):
   - New Query
   - Copy & paste: `supabase/migrations/batches/leetcode_batch_04.sql`
   - RUN → Wait for success ✅

3. **Verify import**:
   ```sql
   SELECT COUNT(*) FROM problems;
   -- Should return: 1825
   ```

## Alternative: Use Supabase CLI (Faster)

If you have Supabase CLI installed:

```powershell
# Link project
supabase link --project-ref lctytebgxakcztdijbxu

# Apply schema migration
supabase db push

# Import data via psql (no size limit)
$env:PGPASSWORD="your-database-password"
psql "postgresql://postgres:$env:PGPASSWORD@db.lctytebgxakcztdijbxu.supabase.co:5432/postgres" -f supabase/migrations/20260219000001_leetcode_data.sql
```

Get your database password from:
https://supabase.com/dashboard/project/lctytebgxakcztdijbxu/settings/database

## Files Location

All batch files are in: `supabase/migrations/batches/`

- `leetcode_batch_01.sql` - 549 KB
- `leetcode_batch_02.sql` - 612 KB
- `leetcode_batch_03.sql` - 585 KB
- `leetcode_batch_04.sql` - 453 KB

## Expected Result

After all 4 batches:
- ✅ 1,825 LeetCode problems imported
- ✅ Premium badges working
- ✅ FAANG badges working
- ✅ Companies and topics data populated
- ✅ Likes, acceptance rates, and frequency data available

## Troubleshooting

**If you get "column does not exist" error**:
→ Run the schema migration first (`20260219000000_leetcode_migration.sql`)

**If you get "duplicate key" error**:
→ Normal! The `ON CONFLICT DO NOTHING` prevents duplicates. Some problems may already exist.

**If batch takes too long**:
→ Each batch should complete in 10-30 seconds. Refresh page if stuck.
