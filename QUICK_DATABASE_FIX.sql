/**
 * Database Schema Update - Quick Fix
 * 
 * INSTRUCTIONS:
 * 1. Go to your Supabase dashboard
 * 2. Navigate to SQL Editor
 * 3. Copy and paste the SQL below
 * 4. Run the query
 * 
 * This will add all missing columns to your achievements table.
 */

-- Add missing columns for hackathon data
ALTER TABLE achievements 
ADD COLUMN IF NOT EXISTS position VARCHAR(100),
ADD COLUMN IF NOT EXISTS year VARCHAR(10),
ADD COLUMN IF NOT EXISTS location VARCHAR(255),
ADD COLUMN IF NOT EXISTS project_name VARCHAR(255),
ADD COLUMN IF NOT EXISTS prize VARCHAR(100),
ADD COLUMN IF NOT EXISTS participants VARCHAR(50),
ADD COLUMN IF NOT EXISTS github_url TEXT,
ADD COLUMN IF NOT EXISTS color_gradient VARCHAR(100);

-- Update existing records to have a year if they don't have one
UPDATE achievements 
SET year = EXTRACT(YEAR FROM date)::VARCHAR 
WHERE year IS NULL AND date IS NOT NULL;

-- Set default color gradient for existing records  
UPDATE achievements 
SET color_gradient = 'from-blue-400 to-purple-500' 
WHERE color_gradient IS NULL;

-- Make year NOT NULL after updating existing records (if you want this constraint)
-- ALTER TABLE achievements ALTER COLUMN year SET NOT NULL;
