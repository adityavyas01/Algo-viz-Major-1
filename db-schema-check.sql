-- ============================================
-- Complete Database Schema Overview Query
-- Run this in Supabase SQL Editor
-- ============================================

-- 1. List all tables with row counts
SELECT 
    schemaname,
    tablename,
    pg_size_pretty(pg_total_relation_size(schemaname||'.'||tablename)) AS table_size,
    (SELECT COUNT(*) FROM information_schema.columns WHERE table_schema = schemaname AND table_name = tablename) AS column_count
FROM pg_tables
WHERE schemaname = 'public'
ORDER BY tablename;

-- 2. Get detailed column information for all tables
SELECT 
    table_name,
    column_name,
    data_type,
    character_maximum_length,
    is_nullable,
    column_default
FROM information_schema.columns
WHERE table_schema = 'public'
ORDER BY table_name, ordinal_position;

-- 3. List all foreign key relationships
SELECT
    tc.table_name AS from_table,
    kcu.column_name AS from_column,
    ccu.table_name AS to_table,
    ccu.column_name AS to_column,
    tc.constraint_name
FROM information_schema.table_constraints AS tc
JOIN information_schema.key_column_usage AS kcu
    ON tc.constraint_name = kcu.constraint_name
    AND tc.table_schema = kcu.table_schema
JOIN information_schema.constraint_column_usage AS ccu
    ON ccu.constraint_name = tc.constraint_name
    AND ccu.table_schema = tc.table_schema
WHERE tc.constraint_type = 'FOREIGN KEY'
    AND tc.table_schema = 'public'
ORDER BY from_table, from_column;

-- 4. List all indexes
SELECT
    schemaname,
    tablename,
    indexname,
    indexdef
FROM pg_indexes
WHERE schemaname = 'public'
ORDER BY tablename, indexname;

-- 5. List all triggers
SELECT
    event_object_table AS table_name,
    trigger_name,
    event_manipulation AS trigger_event,
    action_timing AS trigger_timing
FROM information_schema.triggers
WHERE trigger_schema = 'public'
ORDER BY table_name, trigger_name;

-- 6. Check RLS (Row Level Security) policies
SELECT
    schemaname,
    tablename,
    policyname,
    permissive,
    roles,
    cmd,
    qual
FROM pg_policies
WHERE schemaname = 'public'
ORDER BY tablename, policyname;

-- 7. List all functions/stored procedures
SELECT
    routine_name,
    routine_type,
    data_type AS return_type
FROM information_schema.routines
WHERE routine_schema = 'public'
ORDER BY routine_name;

-- 8. Quick table existence check for key features
SELECT 
    CASE WHEN EXISTS (SELECT 1 FROM pg_tables WHERE schemaname = 'public' AND tablename = 'problems') THEN '✅' ELSE '❌' END AS problems,
    CASE WHEN EXISTS (SELECT 1 FROM pg_tables WHERE schemaname = 'public' AND tablename = 'testcases') THEN '✅' ELSE '❌' END AS testcases,
    CASE WHEN EXISTS (SELECT 1 FROM pg_tables WHERE schemaname = 'public' AND tablename = 'code_templates') THEN '✅' ELSE '❌' END AS code_templates,
    CASE WHEN EXISTS (SELECT 1 FROM pg_tables WHERE schemaname = 'public' AND tablename = 'submissions') THEN '✅' ELSE '❌' END AS submissions,
    CASE WHEN EXISTS (SELECT 1 FROM pg_tables WHERE schemaname = 'public' AND tablename = 'user_stats') THEN '✅' ELSE '❌' END AS user_stats,
    CASE WHEN EXISTS (SELECT 1 FROM pg_tables WHERE schemaname = 'public' AND tablename = 'contests') THEN '✅' ELSE '❌' END AS contests,
    CASE WHEN EXISTS (SELECT 1 FROM pg_tables WHERE schemaname = 'public' AND tablename = 'study_rooms') THEN '✅' ELSE '❌' END AS study_rooms,
    CASE WHEN EXISTS (SELECT 1 FROM pg_tables WHERE schemaname = 'public' AND tablename = 'algorithms') THEN '✅' ELSE '❌' END AS algorithms,
    CASE WHEN EXISTS (SELECT 1 FROM pg_tables WHERE schemaname = 'public' AND tablename = 'certificates') THEN '✅' ELSE '❌' END AS certificates,
    CASE WHEN EXISTS (SELECT 1 FROM pg_tables WHERE schemaname = 'public' AND tablename = 'achievements') THEN '✅' ELSE '❌' END AS achievements;

-- 9. Row counts for key tables (only if they exist)
DO $$
DECLARE
    table_record RECORD;
    row_count BIGINT;
BEGIN
    RAISE NOTICE 'Table Row Counts:';
    RAISE NOTICE '==================';
    
    FOR table_record IN 
        SELECT tablename 
        FROM pg_tables 
        WHERE schemaname = 'public' 
        AND tablename IN (
            'problems', 'testcases', 'code_templates', 'submissions', 
            'user_stats', 'contests', 'study_rooms', 'algorithms', 
            'certificates', 'achievements', 'profiles', 'admin_roles'
        )
        ORDER BY tablename
    LOOP
        EXECUTE format('SELECT COUNT(*) FROM %I', table_record.tablename) INTO row_count;
        RAISE NOTICE '%: % rows', table_record.tablename, row_count;
    END LOOP;
END $$;

-- 10. Check Supabase Realtime publication
SELECT 
    schemaname,
    tablename
FROM pg_publication_tables
WHERE pubname = 'supabase_realtime'
ORDER BY tablename;
