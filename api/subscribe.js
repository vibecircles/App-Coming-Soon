import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL);

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { email } = req.body;

    // Validate email
    if (!email || !email.includes('@')) {
      return res.status(400).json({ message: 'Invalid email address' });
    }

    const ipAddress = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

    // Check if email already exists
    const existingSubscriber = await sql`
      SELECT id FROM subscribers WHERE email = ${email}
    `;

    if (existingSubscriber.length > 0) {
      return res.status(200).json({ message: 'Email already subscribed' });
    }

    // Insert new subscriber
    await sql`
      INSERT INTO subscribers (email, ip_address) 
      VALUES (${email}, ${ipAddress})
    `;

    // Get total subscriber count
    const countResult = await sql`
      SELECT COUNT(*) as total FROM subscribers WHERE status = 'active'
    `;

    // Log subscription (optional)
    console.log(`New subscription: ${email}`);

    return res.status(200).json({ 
      message: 'Successfully subscribed!',
      totalSubscribers: parseInt(countResult[0].total)
    });

  } catch (error) {
    console.error('Subscription error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}
