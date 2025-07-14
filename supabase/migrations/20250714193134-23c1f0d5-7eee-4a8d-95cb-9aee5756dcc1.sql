-- Fix search_path security issues for existing functions

-- Update handle_new_user function with proper search_path
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (user_id, display_name)
  VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email));
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = '';

-- Update generate_learning_path function with proper search_path
CREATE OR REPLACE FUNCTION public.generate_learning_path(user_assessment_id uuid)
RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
DECLARE
  path_id UUID;
  user_id UUID;
  assessment_data RECORD;
  topic RECORD;
  module_order INT := 1;
  path_name TEXT;
  path_description TEXT;
BEGIN
  -- Get assessment data
  SELECT ua.user_id, ua.learning_style, ua.primary_goal, ua.available_hours_per_week, 
         ua.prior_programming_experience, ua.target_timeline_months
  INTO assessment_data
  FROM public.user_assessments ua
  WHERE ua.id = user_assessment_id;
  
  user_id := assessment_data.user_id;
  
  -- Generate path name based on goal
  CASE assessment_data.primary_goal
    WHEN 'interview_prep' THEN 
      path_name := 'Interview Mastery Path';
      path_description := 'Focused preparation for technical interviews with emphasis on problem-solving patterns';
    WHEN 'competitive_programming' THEN 
      path_name := 'Competitive Programming Path';
      path_description := 'Advanced algorithms and data structures for competitive programming';
    WHEN 'career_change' THEN 
      path_name := 'Career Transition Path';
      path_description := 'Comprehensive foundation building for software engineering career';
    ELSE 
      path_name := 'Comprehensive DSA Path';
      path_description := 'Complete data structures and algorithms learning journey';
  END CASE;
  
  -- Create learning path
  INSERT INTO public.learning_paths (user_id, name, description, estimated_weeks)
  VALUES (user_id, path_name, path_description, assessment_data.target_timeline_months * 4)
  RETURNING id INTO path_id;
  
  -- Add modules based on user's confidence levels and goals
  FOR topic IN 
    SELECT dt.id, dt.name, dt.difficulty_level,
           COALESCE(uta.confidence_level::text, 'beginner') as confidence,
           COALESCE(uta.interest_level, 3) as interest
    FROM public.dsa_topics dt
    LEFT JOIN public.user_topic_assessments uta ON dt.id = uta.topic_id 
      AND uta.assessment_id = user_assessment_id
    ORDER BY 
      dt.difficulty_level,
      CASE WHEN uta.confidence_level = 'beginner' THEN 1
           WHEN uta.confidence_level = 'novice' THEN 2
           WHEN uta.confidence_level = 'intermediate' THEN 3
           WHEN uta.confidence_level = 'advanced' THEN 4
           ELSE 5 END,
      uta.interest_level DESC NULLS LAST
  LOOP
    INSERT INTO public.learning_path_modules (
      path_id, topic_id, module_order, estimated_hours, 
      is_unlocked, unlock_conditions
    ) VALUES (
      path_id, topic.id, module_order, 
      CASE WHEN topic.difficulty_level <= 2 THEN 3
           WHEN topic.difficulty_level = 3 THEN 5
           WHEN topic.difficulty_level = 4 THEN 7
           ELSE 10 END,
      CASE WHEN module_order = 1 THEN true ELSE false END,
      CASE WHEN module_order = 1 THEN NULL 
           ELSE jsonb_build_object('requires_previous_completion', true) END
    );
    
    module_order := module_order + 1;
  END LOOP;
  
  RETURN path_id;
END;
$$;