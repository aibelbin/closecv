/**
 * Database Migration Guide
 * 
 * Copy and paste the data below into your Supabase SQL editor or admin dashboard
 * to populate your database with the existing hackathon data.
 */

-- Insert Achievements (Hackathon Wins)
INSERT INTO achievements (
  title, 
  description, 
  category, 
  position, 
  year, 
  location, 
  project_name, 
  prize, 
  participants, 
  date, 
  link_url, 
  technologies, 
  color_gradient
) VALUES 
(
  'Nasa Space Apps Hackathon',
  'Built a website which lets restaurants donate unsold food at the end of the day to the poor',
  'hackathon',
  '1st Place',
  '2024',
  'Amal Jyothi College of engineering',
  'Waste reduction and poverty management software',
  '₹35,000',
  '1200+',
  '2024-10-01',
  'https://github.com/aibelbin/nasa-space-apps-project',
  ARRAY['React', 'Python', 'supabase'],
  'from-yellow-400 to-orange-500'
),
(
  'Gen AI International Hackathon',
  'AI-powered news generation software',
  'hackathon',
  '5th Place',
  '2024',
  'Online',
  'NewsRag',
  '₹65,000',
  '300+',
  '2024-11-15',
  'https://github.com/aibelbin/newsrag',
  ARRAY['Next.js', 'Hugging Faces', 'AWS', 'SupaBase'],
  'from-blue-400 to-purple-500'
),
(
  'TinkHack',
  'Created a map system from scratch with better location provider and heatmaps based on cctv footages',
  'hackathon',
  '2nd Place',
  '2025',
  'Model Engineering College',
  'LogiScale',
  '₹25,000',
  '800+',
  '2025-01-20',
  'https://github.com/aibelbin/logiscale',
  ARRAY['TypeScript', 'Python', 'Yolo V8', 'SupaBase'],
  'from-green-400 to-blue-500'
),
(
  'Useless Projects',
  'Created a funny program to read the number of holes in an appam',
  'hackathon',
  'Winner',
  '2025',
  'Online',
  'Appam Thinnam Kuzhi Ennam',
  '₹32,000',
  '1500+',
  '2025-02-10',
  'https://github.com/aibelbin/appam-hole-counter',
  ARRAY['React Native', 'Python', 'Streamlit', 'SupaBase'],
  'from-pink-400 to-red-500'
);

-- Insert Stats
INSERT INTO stats (key, value, label, icon_name) VALUES 
('hackathons_won', '4', 'Hackathons Won', 'Trophy'),
('current_streak', '4', 'Current Streak', 'Award'),
('cities_visited', '3', 'Cities Visited', 'Users'),
('latest_win', '2025', 'Latest Win', 'Target');

-- Verify the data was inserted correctly
SELECT * FROM achievements WHERE category = 'hackathon' ORDER BY date DESC;
SELECT * FROM stats ORDER BY created_at;
