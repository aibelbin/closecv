import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY! // Note: Use service role key for admin operations

const supabase = createClient(supabaseUrl, supabaseServiceKey)

async function runSchema() {
  const schema = `
    -- Create achievements table
    CREATE TABLE IF NOT EXISTS achievements (
      id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      description TEXT,
      category VARCHAR(100) NOT NULL,
      date DATE NOT NULL,
      image_url TEXT,
      link_url TEXT,
      technologies TEXT[],
      created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
    );

    -- Create projects table
    CREATE TABLE IF NOT EXISTS projects (
      id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      description TEXT,
      long_description TEXT,
      image_url TEXT,
      demo_url TEXT,
      github_url TEXT,
      technologies TEXT[],
      featured BOOLEAN DEFAULT FALSE,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
    );

    -- Create skills table
    CREATE TABLE IF NOT EXISTS skills (
      id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      category VARCHAR(50) NOT NULL,
      proficiency INTEGER CHECK (proficiency >= 1 AND proficiency <= 5),
      icon_name VARCHAR(50),
      created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
    );

    -- Enable Row Level Security
    ALTER TABLE achievements ENABLE ROW LEVEL SECURITY;
    ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
    ALTER TABLE skills ENABLE ROW LEVEL SECURITY;

    -- Create policies for public read access
    CREATE POLICY "Public can view achievements" ON achievements FOR SELECT USING (true);
    CREATE POLICY "Public can view projects" ON projects FOR SELECT USING (true);
    CREATE POLICY "Public can view skills" ON skills FOR SELECT USING (true);

    -- Create policies for authenticated admin access
    CREATE POLICY "Admin can manage achievements" ON achievements FOR ALL USING (auth.role() = 'authenticated');
    CREATE POLICY "Admin can manage projects" ON projects FOR ALL USING (auth.role() = 'authenticated');
    CREATE POLICY "Admin can manage skills" ON skills FOR ALL USING (auth.role() = 'authenticated');
  `

  try {
    const { error } = await supabase.rpc("exec_sql", { sql: schema })
    if (error) {
      console.error("Error running schema:", error)
    } else {
      console.log("Schema executed successfully!")
    }
  } catch (error) {
    console.error("Error:", error)
  }
}

runSchema()
