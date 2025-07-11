-- Insert your hackathon wins
INSERT INTO achievements (title, position, year, location, project_name, description, prize, participants, technologies, color_gradient, github_url, category) VALUES
('Nasa Space Apps Hackathon', '1st Place', '2024', 'Amal Jyothi College of engineering', 'Waste reduction and poverty management software', 'Built a website which lets restaurants donate unsold food at the end of the day to the poor', '₹35,000', '1200+', ARRAY['React', 'Python', 'supabase'], 'from-yellow-400 to-orange-500', 'https://github.com/aibelbin/nasa-space-apps-project', 'hackathon'),

('Gen AI International Hackathon', '5th Place', '2024', 'Online', 'NewsRag', 'AI-powered news generation software', '₹65,000', '300+', ARRAY['Next.js', 'Hugging Faces', 'AWS', 'SupaBase'], 'from-blue-400 to-purple-500', 'https://github.com/aibelbin/newsrag', 'hackathon'),

('TinkHack', '2nd Place', '2025', 'Model Engineering College', 'LogiScale', 'Created a map system from scratch with better location provider and heatmaps based on cctv footages', '₹25,000', '800+', ARRAY['TypeScript', 'Python', 'Yolo V8', 'SupaBase'], 'from-green-400 to-blue-500', 'https://github.com/aibelbin/logiscale', 'hackathon'),

('Useless Projects', 'Winner', '2025', 'Online', 'Appam Thinnam Kuzhi Ennam', 'Created a funny program to read the number of holes in an appam', '₹32,000', '1500+', ARRAY['React Native', 'Python', 'Streamlit', 'SupaBase'], 'from-pink-400 to-red-500', 'https://github.com/aibelbin/appam-hole-counter', 'hackathon');

-- Insert your talks
INSERT INTO talks (title, type, topic, period, location, audience, achievements, color_gradient) VALUES
('Brain Computer Interfacing: The Future of Human-Machine Interaction', 'Technical Talk', 'Brain Computer Interfacing', '2024', 'Online', 'Tech Enthusiasts & Researchers', ARRAY['200+ Attendees', 'Interactive Q&A', 'Technical Deep-dive'], 'from-red-500 to-orange-500'),

('Internet of Things: Connecting the Digital World', 'Workshop', 'IoT & Hardware', '2024', 'Online', 'Developers & Engineers', ARRAY['150+ Participants', 'Live Coding Session', 'Hardware Demo'], 'from-blue-500 to-purple-500'),

('Building Startups: From Idea to Execution', 'Entrepreneurship Class', 'Startups & Business', '2024', 'Online', 'Entrepreneurs & Students', ARRAY['100+ Participants', 'Case Studies', 'Networking Session'], 'from-green-500 to-teal-500');

-- Insert your stats
INSERT INTO stats (key, value, label, icon_name) VALUES
('hackathons_won', '6', 'Hackathons Won', 'Trophy'),
('current_streak', '6', 'Current Streak', 'Award'),
('cities_visited', '5', 'Cities Visited', 'Users'),
('latest_win', '2025', 'Latest Win', 'Target');
