-- This file is for reference only and should be run in the Supabase SQL editor

-- Create guestbook entries table
CREATE TABLE public.guestbook_entries (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  user_id UUID NOT NULL,
  message TEXT NOT NULL,
  user_name TEXT NOT NULL,
  user_avatar_url TEXT,
  likes INTEGER DEFAULT 0 NOT NULL
);

-- Create likes table to track which users liked which entries
CREATE TABLE public.guestbook_likes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  user_id UUID NOT NULL,
  entry_id UUID NOT NULL,
  UNIQUE(user_id, entry_id),
  FOREIGN KEY (entry_id) REFERENCES public.guestbook_entries(id) ON DELETE CASCADE
);

-- Set up Row Level Security
ALTER TABLE public.guestbook_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.guestbook_likes ENABLE ROW LEVEL SECURITY;

-- Create policies for guestbook_entries
CREATE POLICY "Anyone can read entries" ON public.guestbook_entries
  FOR SELECT USING (true);

CREATE POLICY "Authenticated users can insert entries" ON public.guestbook_entries
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Users can update their own entries" ON public.guestbook_entries
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "System can update like counts" ON public.guestbook_entries
  FOR UPDATE USING (true)
  WITH CHECK (auth.role() = 'authenticated');

-- Create policies for guestbook_likes
CREATE POLICY "Anyone can read likes" ON public.guestbook_likes
  FOR SELECT USING (true);

CREATE POLICY "Authenticated users can insert likes" ON public.guestbook_likes
  FOR INSERT WITH CHECK (auth.role() = 'authenticated' AND auth.uid() = user_id);

CREATE POLICY "Users can delete their own likes" ON public.guestbook_likes
  FOR DELETE USING (auth.uid() = user_id);
