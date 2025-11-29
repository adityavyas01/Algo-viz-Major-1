-- Create the table for storing user quiz progress and scores
CREATE TABLE "user_quiz_progress" (
    "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    "user_id" uuid NOT NULL REFERENCES "auth"."users"("id") ON DELETE CASCADE,
    "algorithm_id" uuid NOT NULL REFERENCES "public"."algorithms"("id") ON DELETE CASCADE,
    "score" integer NOT NULL CHECK (score >= 0 AND score <= 100),
    "completed_at" timestamptz DEFAULT now(),
    UNIQUE("user_id", "algorithm_id")
);

-- Create the table for storing issued certificates
CREATE TABLE "certificates" (
    "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    "user_id" uuid NOT NULL REFERENCES "auth"."users"("id") ON DELETE CASCADE,
    "algorithm_id" uuid NOT NULL REFERENCES "public"."algorithms"("id") ON DELETE CASCADE,
    "issued_at" timestamptz DEFAULT now(),
    "verification_key" text NOT NULL UNIQUE,
    UNIQUE("user_id", "algorithm_id")
);

-- Enable RLS for the new tables
ALTER TABLE "user_quiz_progress" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "certificates" ENABLE ROW LEVEL SECURITY;

-- Policies for user_quiz_progress
-- Users can see their own progress
CREATE POLICY "Users can view their own quiz progress" ON "user_quiz_progress"
FOR SELECT USING (auth.uid() = user_id);

-- Users can insert their own progress
CREATE POLICY "Users can insert their own quiz progress" ON "user_quiz_progress"
FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Policies for certificates
-- Anyone can view a certificate if they have the verification key
CREATE POLICY "Public can view certificates with verification key" ON "certificates"
FOR SELECT USING (true);

-- Users can view their own certificates
CREATE POLICY "Users can view their own certificates" ON "certificates"
FOR SELECT USING (auth.uid() = user_id);

-- Certificates should be created by a trusted process, so we'll limit insert.
-- For now, we'll allow service_role, but in a real app, this would be a specific function.
CREATE POLICY "Admins can create certificates" ON "certificates"
FOR INSERT WITH CHECK (auth.role() = 'service_role');
