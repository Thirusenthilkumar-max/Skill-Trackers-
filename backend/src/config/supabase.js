import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config({ path: '../.env' }); // Ensure it reads from project root if needed, or just default.
dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseKey);
