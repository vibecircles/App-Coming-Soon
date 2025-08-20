import fs from 'fs';
import path from 'path';

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

    // Path to the emails JSON file
    const emailsPath = path.join(process.cwd(), 'data', 'subscribers.json');
    
    // Ensure data directory exists
    const dataDir = path.dirname(emailsPath);
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }

    // Read existing emails or create empty array
    let emails = [];
    if (fs.existsSync(emailsPath)) {
      const fileContent = fs.readFileSync(emailsPath, 'utf8');
      emails = JSON.parse(fileContent);
    }

    // Check if email already exists
    if (emails.includes(email)) {
      return res.status(200).json({ message: 'Email already subscribed' });
    }

    // Add new email with timestamp
    const subscriber = {
      email: email,
      subscribedAt: new Date().toISOString(),
      ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
    };

    emails.push(subscriber);

    // Write back to file
    fs.writeFileSync(emailsPath, JSON.stringify(emails, null, 2));

    // Log subscription (optional)
    console.log(`New subscription: ${email}`);

    return res.status(200).json({ 
      message: 'Successfully subscribed!',
      totalSubscribers: emails.length
    });

  } catch (error) {
    console.error('Subscription error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}
