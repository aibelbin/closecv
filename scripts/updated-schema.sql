-- Drop existing tables if you want to recreate them
-- DROP TABLE IF EXISTS achievements CASCADE;
-- DROP TABLE IF EXISTS projects CASCADE;
-- DROP TABLE IF EXISTS skills CASCADE;
-- DROP TABLE IF EXISTS talks CASCADE;

-- Create achievements table (updated for hackathons)
CREATE TABLE IF NOT EXISTS achievements (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  category VARCHAR(100) NOT NULL, -- 'hackathon', 'award', 'certification', etc.
  position VARCHAR(100), -- '1st Place', '2nd Place', etc.
  year VARCHAR(10) NOT NULL,
  location VARCHAR(255),
  project_name VARCHAR(255),
  prize VARCHAR(100),
  participants VARCHAR(50),
  date DATE,
  image_url TEXT,
  link_url TEXT,
  github_url TEXT,
  technologies TEXT[], -- Array of technologies used
  color_gradient VARCHAR(100), -- Tailwind gradient classes
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create talks table
CREATE TABLE IF NOT EXISTS talks (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  type VARCHAR(100) NOT NULL, -- 'Technical Talk', 'Workshop', etc.
  topic VARCHAR(255),
  period VARCHAR(50),
  location VARCHAR(255),
  audience VARCHAR(255),
  achievements TEXT[], -- Array of achievements
  color_gradient VARCHAR(100), -- Tailwind gradient classes
  description TEXT,
  image_url TEXT,
  link_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create stats table for dynamic stats
CREATE TABLE IF NOT EXISTS stats (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  key VARCHAR(100) UNIQUE NOT NULL, -- 'hackathons_won', 'current_streak', etc.
  value VARCHAR(50) NOT NULL,
  label VARCHAR(100) NOT NULL,
  icon_name VARCHAR(50), -- Lucide icon name
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Enable Row Level Security
ALTER TABLE achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE talks ENABLE ROW LEVEL SECURITY;
ALTER TABLE stats ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Public can view achievements" ON achievements FOR SELECT USING (true);
CREATE POLICY "Public can view talks" ON talks FOR SELECT USING (true);
CREATE POLICY "Public can view stats" ON stats FOR SELECT USING (true);

-- Create policies for authenticated admin access
CREATE POLICY "Admin can manage achievements" ON achievements FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin can manage talks" ON talks FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin can manage stats" ON stats FOR ALL USING (auth.role() = 'authenticated');

-- Create updated_at triggers
CREATE TRIGGER update_achievements_updated_at BEFORE UPDATE ON achievements FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_talks_updated_at BEFORE UPDATE ON talks FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_stats_updated_at BEFORE UPDATE ON stats FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
