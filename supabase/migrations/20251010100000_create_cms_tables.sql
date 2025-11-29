CREATE TABLE "algorithm_categories" (
    "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    "name" text NOT NULL UNIQUE,
    "description" text,
    "created_at" timestamptz DEFAULT now()
);

CREATE TABLE "algorithms" (
    "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    "name" text NOT NULL,
    "category_id" uuid REFERENCES "algorithm_categories"("id") ON DELETE CASCADE,
    "description" text,
    "complexity_time" text,
    "complexity_space" text,
    "created_at" timestamptz DEFAULT now()
);

CREATE TABLE "articles" (
    "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    "algorithm_id" uuid NOT NULL UNIQUE REFERENCES "algorithms"("id") ON DELETE CASCADE,
    "content" text, -- Storing content as Markdown
    "created_at" timestamptz DEFAULT now(),
    "updated_at" timestamptz DEFAULT now()
);

-- Enable RLS for the new tables
ALTER TABLE "algorithm_categories" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "algorithms" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "articles" ENABLE ROW LEVEL SECURITY;

-- Policies for public read access
CREATE POLICY "Public read access for categories" ON "algorithm_categories" FOR SELECT USING (true);
CREATE POLICY "Public read access for algorithms" ON "algorithms" FOR SELECT USING (true);
CREATE POLICY "Public read access for articles" ON "articles" FOR SELECT USING (true);

-- Policies for admin full access
-- Assumes a function `is_admin()` or similar role check.
-- For this example, we'll check against a specific role 'service_role' or a custom admin role.
-- You would replace `auth.uid() = <admin_user_id>` with your actual admin check.
CREATE POLICY "Admin full access for categories" ON "algorithm_categories" FOR ALL
USING (true) -- or a specific check like `is_admin(auth.uid())`
WITH CHECK (true);

CREATE POLICY "Admin full access for algorithms" ON "algorithms" FOR ALL
USING (true)
WITH CHECK (true);

CREATE POLICY "Admin full access for articles" ON "articles" FOR ALL
USING (true)
WITH CHECK (true);

-- Function to update the `updated_at` timestamp
CREATE OR REPLACE FUNCTION handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to automatically update `updated_at` on articles change
CREATE TRIGGER on_articles_update
BEFORE UPDATE ON "articles"
FOR EACH ROW
EXECUTE PROCEDURE handle_updated_at();
