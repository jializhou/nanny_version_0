/*
  # Initial Schema Setup

  1. New Tables
    - `users` - Core user data with auth integration
      - `id` (uuid, primary key) - Links to Supabase auth
      - `email` (text, unique)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `profiles` - Extended user profile information
      - `id` (uuid, primary key) - Links to users table
      - `name` (text)
      - `email` (text)
      - `profile_image` (text, nullable)
      - `user_type` (text) - Either 'employer' or 'caregiver'
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

    - `caregivers` - Detailed caregiver information
      - `id` (uuid, primary key)
      - `profile_id` (uuid) - References profiles
      - `city` (text)
      - `hometown` (text, nullable)
      - `age` (integer)
      - `specialty` (text, nullable)
      - `monthly_salary` (integer)
      - `experience_years` (integer)
      - `bio` (text, nullable)
      - `short_bio` (text, nullable)
      - `skills` (text array)
      - `certifications` (text array)
      - `start_time` (date, nullable)
      - `available` (boolean)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

    - `reviews` - Caregiver reviews
      - `id` (uuid, primary key)
      - `caregiver_id` (uuid) - References caregivers
      - `reviewer_id` (uuid) - References profiles
      - `rating` (integer)
      - `text` (text)
      - `helpful_count` (integer)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

    - `messages` - Communication between users
      - `id` (uuid, primary key)
      - `sender_id` (uuid) - References profiles
      - `recipient_id` (uuid) - References profiles
      - `content` (text)
      - `read` (boolean)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Set up appropriate policies for each table
    - Ensure data privacy and access control
*/

-- Create users table (extends Supabase auth)
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY REFERENCES auth.users ON DELETE CASCADE,
  email text UNIQUE NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES users ON DELETE CASCADE,
  name text NOT NULL,
  email text NOT NULL,
  profile_image text,
  user_type text NOT NULL CHECK (user_type IN ('employer', 'caregiver')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create caregivers table
CREATE TABLE IF NOT EXISTS caregivers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id uuid NOT NULL REFERENCES profiles ON DELETE CASCADE,
  city text NOT NULL,
  hometown text,
  age integer NOT NULL CHECK (age >= 18),
  specialty text,
  monthly_salary integer NOT NULL,
  experience_years integer DEFAULT 0,
  bio text,
  short_bio text,
  skills text[] DEFAULT '{}',
  certifications text[] DEFAULT '{}',
  start_time date,
  available boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create reviews table
CREATE TABLE IF NOT EXISTS reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  caregiver_id uuid NOT NULL REFERENCES caregivers ON DELETE CASCADE,
  reviewer_id uuid NOT NULL REFERENCES profiles ON DELETE CASCADE,
  rating integer NOT NULL CHECK (rating >= 1 AND rating <= 5),
  text text NOT NULL,
  helpful_count integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create messages table
CREATE TABLE IF NOT EXISTS messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  sender_id uuid NOT NULL REFERENCES profiles ON DELETE CASCADE,
  recipient_id uuid NOT NULL REFERENCES profiles ON DELETE CASCADE,
  content text NOT NULL,
  read boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE caregivers ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

-- Create policies

-- Users policies
CREATE POLICY "Users can view own data" ON users
  FOR SELECT USING (auth.uid() = id);

-- Profiles policies
CREATE POLICY "Public profiles are viewable by everyone" ON profiles
  FOR SELECT USING (true);

CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

-- Caregivers policies
CREATE POLICY "Caregivers are viewable by everyone" ON caregivers
  FOR SELECT USING (true);

CREATE POLICY "Caregivers can insert own profile" ON caregivers
  FOR INSERT WITH CHECK (auth.uid() = profile_id);

CREATE POLICY "Caregivers can update own profile" ON caregivers
  FOR UPDATE USING (auth.uid() = profile_id);

-- Reviews policies
CREATE POLICY "Reviews are viewable by everyone" ON reviews
  FOR SELECT USING (true);

CREATE POLICY "Authenticated users can create reviews" ON reviews
  FOR INSERT WITH CHECK (auth.uid() = reviewer_id);

CREATE POLICY "Users can update own reviews" ON reviews
  FOR UPDATE USING (auth.uid() = reviewer_id);

-- Messages policies
CREATE POLICY "Users can view their own messages" ON messages
  FOR SELECT USING (
    auth.uid() = sender_id OR 
    auth.uid() = recipient_id
  );

CREATE POLICY "Users can send messages" ON messages
  FOR INSERT WITH CHECK (auth.uid() = sender_id);

CREATE POLICY "Recipients can mark messages as read" ON messages
  FOR UPDATE USING (auth.uid() = recipient_id)
  WITH CHECK (read = true);

-- Create updated_at triggers
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_users_updated_at
    BEFORE UPDATE ON users
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_profiles_updated_at
    BEFORE UPDATE ON profiles
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_caregivers_updated_at
    BEFORE UPDATE ON caregivers
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_reviews_updated_at
    BEFORE UPDATE ON reviews
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_messages_updated_at
    BEFORE UPDATE ON messages
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();