-- Data migration to populate talks and projects tables
-- Run this AFTER running the table creation migration

-- Insert talks data
INSERT INTO talks (
  title, 
  type, 
  topic, 
  period, 
  location, 
  audience, 
  achievements, 
  color_gradient
) VALUES 
(
  'Brain Computer Interfacing: The Future of Human-Machine Interaction',
  'Technical Talk',
  'Brain Computer Interfacing',
  '2024',
  'Online',
  'Tech Enthusiasts & Researchers',
  ARRAY['200+ Attendees', 'Interactive Q&A', 'Technical Deep-dive'],
  'from-red-500 to-orange-500'
),
(
  'Internet of Things: Connecting the Digital World',
  'Workshop',
  'IoT & Hardware',
  '2024',
  'Online',
  'Developers & Engineers',
  ARRAY['150+ Participants', 'Live Coding Session', 'Hardware Demo'],
  'from-blue-500 to-purple-500'
),
(
  'Building Startups: From Idea to Execution',
  'Entrepreneurship Class',
  'Startups & Business',
  '2024',
  'Offline',
  'Aspiring Entrepreneurs',
  ARRAY['50+ Students', 'Case Studies', 'Pitch Sessions'],
  'from-yellow-500 to-blue-500'
);

-- Insert projects data
INSERT INTO projects (
  title,
  description,
  technologies,
  demo_url,
  featured
) VALUES 
(
  'WatchApp',
  'A watch app for me to budget',
  ARRAY['Kotlin', 'Jetpack Compose', 'ADB', 'WearOs'],
  '#',
  true
),
(
  'Hospital Management',
  'An Hospital Management tool along with a patient client side specifically tailored for elderly',
  ARRAY['React', 'Socket.io', 'OpenAI', 'Node.js'],
  '#',
  true
);

-- Insert skills data
INSERT INTO skills (name, category, proficiency) VALUES 
('React', 'frontend', 5),
('Next.js', 'frontend', 5),
('TypeScript', 'frontend', 4),
('Node.js', 'backend', 4),
('Python', 'backend', 5),
('SupaBase', 'backend', 4),
('Docker', 'tools', 3),
('Arduino', 'hardware', 4),
('IOT', 'hardware', 4),
('CyberSecurity', 'other', 4),
('Brain Computer Interfacing', 'other', 5),
('Leader', 'other', 4);
