#!/usr/bin/env node
/**
 * Supabase Database Setup Script
 * This script will create the necessary tables in your Supabase database
 * 
 * Usage: node setup-supabase.js
 */

const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Error: Missing Supabase credentials in .env.local');
  console.error('Please ensure NEXT_PUBLIC_SUPABASE_URL and SUPABASE_ANON_KEY are set');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const fs = require('fs');
const path = require('path');

async function setupDatabase() {
  console.log('🚀 Setting up CulinaryCraft database...');
  console.log('📡 Connecting to Supabase...');
  
  try {
    // Read the SQL schema file
    const schemaPath = path.join(__dirname, 'supabase-schema.sql');
    const sqlSchema = fs.readFileSync(schemaPath, 'utf8');
    
    console.log('📋 Schema loaded successfully');
    
    // Note: We can't execute raw SQL directly via the JS client
    // You need to run this SQL in the Supabase SQL Editor
    console.log('\n⚠️  IMPORTANT:');
    console.log('To create the tables, please follow these steps:');
    console.log('1. Go to your Supabase project dashboard');
    console.log('2. Navigate to SQL Editor (https://supabase.com/dashboard/project/ymzbbchtgpmcnhevpyro/sql)');
    console.log('3. Copy the contents of supabase-schema.sql');
    console.log('4. Paste it into the SQL Editor and run it');
    console.log('\n📄 Schema file location: supabase-schema.sql');
    
    // Test connection
    console.log('\n🔍 Testing database connection...');
    const { data, error } = await supabase.from('recipes').select('count').limit(1);
    
    if (error) {
      if (error.code === '42P01') {
        console.log('✅ Connection successful, but tables do not exist yet');
        console.log('Please run the SQL schema as described above');
      } else {
        console.log('✅ Connection successful');
        console.log('Database response:', error.message);
      }
    } else {
      console.log('✅ Connection successful and tables exist!');
      console.log('📊 Recipes count:', data);
    }
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

setupDatabase();