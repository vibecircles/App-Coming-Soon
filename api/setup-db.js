import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    // Create subscribers table if it doesn't exist
    await sql`
      CREATE TABLE IF NOT EXISTS subscribers (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        subscribed_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        ip_address VARCHAR(45),
        status VARCHAR(20) DEFAULT 'active'
      )
    `;

    return res.status(200).json({ 
      message: 'Database setup completed successfully',
      table: 'subscribers'
    });

  } catch (error) {
    console.error('Database setup error:', error);
    return res.status(500).json({ message: 'Database setup failed', error: error.message });
  }
}
