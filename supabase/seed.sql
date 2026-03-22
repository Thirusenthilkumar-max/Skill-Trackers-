-- Setup Core Tables for Skill Trackers

CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE NOT NULL PRIMARY KEY,
  name text,
  role text,
  avatar_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

CREATE TABLE IF NOT EXISTS public.user_skills (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  skill_name text not null,
  proficiency_level integer default 0, -- 0 to 100
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

CREATE TABLE IF NOT EXISTS public.user_progress (
  user_id uuid references public.profiles(id) on delete cascade not null primary key,
  xp_points integer default 0,
  level integer default 1,
  badges text[] default '{}'
);

-- Mock Data (Assumes you have created an auth.user with id '00000000-0000-0000-0000-000000000000' for demo)
-- INSERT INTO public.profiles (id, name, role) VALUES ('00000000-0000-0000-0000-000000000000', 'Alex Chen', 'Frontend Developer');
-- INSERT INTO public.user_progress (user_id, xp_points, level, badges) VALUES ('00000000-0000-0000-0000-000000000000', 12450, 24, ARRAY['React Pro', '10 Day Streak', 'Top 5%']);
-- INSERT INTO public.user_skills (user_id, skill_name, proficiency_level) VALUES 
--  ('00000000-0000-0000-0000-000000000000', 'React', 95),
--  ('00000000-0000-0000-0000-000000000000', 'Node.js', 70),
--  ('00000000-0000-0000-0000-000000000000', 'Python', 45);
