import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Supabase credentials not found in environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function setupDatabase() {
  console.log('🚀 Setting up CulinaryCraft database...');
  console.log(`📡 Connecting to Supabase: ${supabaseUrl}`);

  try {
    // Read the SQL schema file
    const schemaPath = path.join(__dirname, 'supabase-schema.sql');
    const schemaSQL = fs.readFileSync(schemaPath, 'utf-8');

    console.log('📜 Executing database schema...');

    // Split the SQL into individual statements
    const statements = schemaSQL
      .split(';')
      .map(stmt => stmt.trim())
      .filter(stmt => stmt.length > 0 && !stmt.startsWith('--'));

    // Execute each statement
    for (const statement of statements) {
      try {
        const { error } = await supabase.rpc('exec_sql', { sql: statement });
        if (error) {
          console.warn(`⚠️  Warning executing statement: ${error.message}`);
        }
      } catch (err) {
        console.warn(`⚠️  Warning: ${err.message}`);
      }
    }

    console.log('✅ Database schema setup completed!');
    console.log('📋 Next steps:');
    console.log('1. Enable Row Level Security (RLS) in Supabase dashboard');
    console.log('2. Set up authentication in Supabase dashboard');
    console.log('3. Create your first user account');
    console.log('4. Promote your user to admin using: SELECT promote_user_to_admin(\'your-email@example.com\');');

  } catch (error) {
    console.error('❌ Error setting up database:', error);
    process.exit(1);
  }
}

setupDatabase();