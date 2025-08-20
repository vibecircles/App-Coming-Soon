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

    // For now, just return success without database
    console.log(`New subscription: ${email}`);

    return res.status(200).json({ 
      message: 'Successfully subscribed!',
      totalSubscribers: 1
    });

  } catch (error) {
    console.error('Subscription error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}
