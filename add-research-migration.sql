-- Migration script to add research areas table and populate with initial data
-- This adds the research areas to the database to make the entire portfolio dynamic

-- Create research table
CREATE TABLE IF NOT EXISTS research (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  icon_name VARCHAR(50),
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Enable Row Level Security
ALTER TABLE research ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access
CREATE POLICY "Public can view research" ON research FOR SELECT USING (true);

-- Insert initial research areas
INSERT INTO research (title, description, icon_name, featured) VALUES
('Non-Invasive Brain Computer Interfacing', 'Developing advanced non-invasive techniques for brain-computer interaction using EEG and other external sensors', 'Brain', true),
('Cybersecurity for Elderly', 'Protecting elderly populations from social engineering attacks through awareness and technological solutions', 'Users', true);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = TIMEZONE('utc'::text, NOW());
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_research_updated_at BEFORE UPDATE ON research
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
