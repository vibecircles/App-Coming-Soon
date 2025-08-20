import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL);

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    // Get all subscribers
    const subscribers = await sql`
      SELECT id, email, subscribed_at, ip_address, status 
      FROM subscribers 
      ORDER BY subscribed_at DESC
    `;

    // Get total count
    const countResult = await sql`
      SELECT COUNT(*) as total FROM subscribers WHERE status = 'active'
    `;

    return res.status(200).json({ 
      totalSubscribers: parseInt(countResult[0].total),
      subscribers: subscribers
    });

  } catch (error) {
    console.error('Error fetching subscribers:', error);
    return res.status(500).json({ message: 'Failed to fetch subscribers' });
  }
}
