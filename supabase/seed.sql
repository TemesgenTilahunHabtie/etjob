-- ETJob Supabase Local Development Seed Data
-- File: supabase/seed.sql

-- 1. Seed Categories
INSERT INTO public.job_categories (id, name, slug, icon) VALUES
    ('11111111-1111-1111-1111-111111111111', 'Software Engineering', 'software-engineering', '💻'),
    ('22222222-2222-2222-2222-222222222222', 'Design & Creative', 'design-creative', '🎨'),
    ('33333333-3333-3333-3333-333333333333', 'Marketing', 'marketing', '🚀'),
    ('44444444-4444-4444-4444-444444444444', 'Finance', 'finance', '📈'),
    ('55555555-5555-5555-5555-555555555555', 'Sales', 'sales', '💼'),
    ('66666666-6666-6666-6666-666666666666', 'Customer Support', 'customer-support', '🎧'),
    ('77777777-7777-7777-7777-777777777777', 'Healthcare', 'healthcare', '🏥'),
    ('88888888-8888-8888-8888-888888888888', 'Education', 'education', '🎓'),
    ('99999999-9999-9999-9999-999999999999', 'Engineering', 'engineering', '⚙️'),
    ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'Remote Jobs', 'remote-jobs', '🌐')
ON CONFLICT (slug) DO NOTHING;

-- 2. Seed Master Skills
INSERT INTO public.skills (name, category) VALUES
    ('React', 'Frontend'),
    ('TypeScript', 'Frontend'),
    ('Next.js', 'Frontend'),
    ('Node.js', 'Backend'),
    ('Python', 'Backend'),
    ('PostgreSQL', 'Database'),
    ('Supabase', 'Backend'),
    ('UI/UX Design', 'Design'),
    ('Figma', 'Design'),
    ('Digital Marketing', 'Marketing')
ON CONFLICT (name) DO NOTHING;
