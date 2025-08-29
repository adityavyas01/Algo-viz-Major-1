-- Create admin roles table
CREATE TABLE IF NOT EXISTS public.admin_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('super_admin', 'tournament_admin', 'content_admin', 'moderator')),
  created_by UUID NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(user_id, role)
);

ALTER TABLE public.admin_roles ENABLE ROW LEVEL SECURITY;

-- Add admin users (you'll need to create these users manually first)
INSERT INTO public.admin_roles (user_id, role, created_by)
SELECT 
  p.user_id,
  'super_admin',
  p.user_id
FROM public.profiles p
LIMIT 1
ON CONFLICT (user_id, role) DO NOTHING;

-- Add tournaments table for proctored tests
CREATE TABLE IF NOT EXISTS public.tournaments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  start_time TIMESTAMP WITH TIME ZONE NOT NULL,
  end_time TIMESTAMP WITH TIME ZONE NOT NULL,
  max_participants INTEGER DEFAULT 100,
  entry_fee INTEGER DEFAULT 0,
  prize_pool INTEGER DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'upcoming' CHECK (status IN ('upcoming', 'active', 'completed', 'cancelled')),
  requires_camera BOOLEAN DEFAULT false,
  requires_screen_recording BOOLEAN DEFAULT false,
  created_by UUID NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

ALTER TABLE public.tournaments ENABLE ROW LEVEL SECURITY;

-- Tournament participation tracking
CREATE TABLE IF NOT EXISTS public.tournament_participants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tournament_id UUID NOT NULL REFERENCES public.tournaments(id) ON DELETE CASCADE,
  user_id UUID NOT NULL,
  registered_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  final_score INTEGER DEFAULT 0,
  final_rank INTEGER,
  submission_time TIMESTAMP WITH TIME ZONE,
  proctoring_violations JSONB DEFAULT '[]'::jsonb,
  UNIQUE(tournament_id, user_id)
);

ALTER TABLE public.tournament_participants ENABLE ROW LEVEL SECURITY;

-- Tournament challenges linking
CREATE TABLE IF NOT EXISTS public.tournament_challenges (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tournament_id UUID NOT NULL REFERENCES public.tournaments(id) ON DELETE CASCADE,
  challenge_id UUID NOT NULL REFERENCES public.challenges(id) ON DELETE CASCADE,
  challenge_order INTEGER NOT NULL,
  points_multiplier DECIMAL DEFAULT 1.0,
  UNIQUE(tournament_id, challenge_id)
);

ALTER TABLE public.tournament_challenges ENABLE ROW LEVEL SECURITY;

-- RLS policies for admin roles
CREATE POLICY "Super admins can view all admin roles" ON public.admin_roles
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.admin_roles 
      WHERE user_id = auth.uid() 
      AND role = 'super_admin'
    )
  );

CREATE POLICY "Super admins can manage admin roles" ON public.admin_roles
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.admin_roles 
      WHERE user_id = auth.uid() 
      AND role = 'super_admin'
    )
  );

-- RLS policies for tournaments
CREATE POLICY "Anyone can view active tournaments" ON public.tournaments
  FOR SELECT USING (status = 'active' OR status = 'upcoming');

CREATE POLICY "Admins can manage tournaments" ON public.tournaments
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.admin_roles 
      WHERE user_id = auth.uid() 
      AND role IN ('super_admin', 'tournament_admin')
    )
  );

-- Tournament participants policies
CREATE POLICY "Users can view tournament participants" ON public.tournament_participants
  FOR SELECT USING (true);

CREATE POLICY "Users can register for tournaments" ON public.tournament_participants
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can manage tournament participants" ON public.tournament_participants
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.admin_roles 
      WHERE user_id = auth.uid() 
      AND role IN ('super_admin', 'tournament_admin')
    )
  );

-- Tournament challenges policies
CREATE POLICY "Anyone can view tournament challenges" ON public.tournament_challenges
  FOR SELECT USING (true);

CREATE POLICY "Admins can manage tournament challenges" ON public.tournament_challenges
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.admin_roles 
      WHERE user_id = auth.uid() 
      AND role IN ('super_admin', 'tournament_admin')
    )
  );

-- Add notification system
CREATE TABLE IF NOT EXISTS public.notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  type TEXT NOT NULL DEFAULT 'info' CHECK (type IN ('info', 'success', 'warning', 'error')),
  is_read BOOLEAN DEFAULT false,
  action_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own notifications" ON public.notifications
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own notifications" ON public.notifications
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Admins can create notifications" ON public.notifications
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.admin_roles 
      WHERE user_id = auth.uid() 
      AND role IN ('super_admin', 'tournament_admin', 'content_admin', 'moderator')
    )
  );

-- Add triggers for updated_at
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_tournaments_updated_at
  BEFORE UPDATE ON public.tournaments
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_admin_roles_updated_at
  BEFORE UPDATE ON public.admin_roles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Add proctoring session table
CREATE TABLE IF NOT EXISTS public.proctoring_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tournament_id UUID NOT NULL REFERENCES public.tournaments(id) ON DELETE CASCADE,
  user_id UUID NOT NULL,
  session_start TIMESTAMP WITH TIME ZONE DEFAULT now(),
  session_end TIMESTAMP WITH TIME ZONE,
  camera_enabled BOOLEAN DEFAULT false,
  screen_recording_enabled BOOLEAN DEFAULT false,
  tab_switches INTEGER DEFAULT 0,
  copy_paste_attempts INTEGER DEFAULT 0,
  suspicious_activities JSONB DEFAULT '[]'::jsonb,
  warnings_issued INTEGER DEFAULT 0,
  session_terminated BOOLEAN DEFAULT false
);

ALTER TABLE public.proctoring_sessions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own proctoring sessions" ON public.proctoring_sessions
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own proctoring sessions" ON public.proctoring_sessions
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all proctoring sessions" ON public.proctoring_sessions
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.admin_roles 
      WHERE user_id = auth.uid() 
      AND role IN ('super_admin', 'tournament_admin')
    )
  );

-- Create sample tournament
INSERT INTO public.tournaments (title, description, start_time, end_time, created_by, requires_camera, requires_screen_recording, max_participants, prize_pool)
SELECT 
  'Weekly Algorithm Challenge',
  'Test your algorithmic thinking with challenging problems. Camera and screen recording required for fair play.',
  NOW() + INTERVAL '1 day',
  NOW() + INTERVAL '1 day 2 hours',
  p.user_id,
  true,
  true,
  50,
  1000
FROM public.profiles p
LIMIT 1
ON CONFLICT DO NOTHING;
