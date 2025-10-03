-- Create projects table
CREATE TABLE IF NOT EXISTS projects (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  image VARCHAR(500),
  tech TEXT[] NOT NULL DEFAULT '{}',
  github VARCHAR(500),
  demo VARCHAR(500),
  featured BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_projects_updated_at
  BEFORE UPDATE ON projects
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Create storage bucket for project images
INSERT INTO storage.buckets (id, name, public)
VALUES ('project-images', 'project-images', true)
ON CONFLICT (id) DO NOTHING;

-- Allow public access to project images
CREATE POLICY "Public Access for project images"
ON storage.objects FOR SELECT
USING (bucket_id = 'project-images');

-- Allow authenticated users to upload images
CREATE POLICY "Authenticated users can upload project images"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'project-images' AND auth.role() = 'authenticated');

-- Allow authenticated users to delete images
CREATE POLICY "Authenticated users can delete project images"
ON storage.objects FOR DELETE
USING (bucket_id = 'project-images' AND auth.role() = 'authenticated');

-- Enable RLS on projects table
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- Allow public read access to projects
CREATE POLICY "Public can read projects"
ON projects FOR SELECT
TO public
USING (true);

-- Allow authenticated users to manage projects (for admin)
CREATE POLICY "Authenticated users can manage projects"
ON projects FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

-- Insert sample data
INSERT INTO projects (title, description, image, tech, github, demo, featured) VALUES
('Joben', 'A job board dedicated to white-collar roles, offering sourcing and online job promotion.', '', ARRAY['WordPress', 'PHP', 'MySQL', 'Custom APIs'], '', 'https://joben.eu', true),
('DiveIn', 'A project focused on professional development of a local community.', '', ARRAY['React', 'Node.js', 'Python', 'OpenAI API'], '', 'https://divein.ro', true),
('EDA Dent', 'Integrating AI into SEO strategies for dental clinics.', '', ARRAY['Python', 'NLP', 'SEO Automation Tools'], '', 'https://edadent.ro', true)
ON CONFLICT DO NOTHING;