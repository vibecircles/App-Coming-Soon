import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { subject, message, fromEmail = 'noreply@yourdomain.com' } = req.body;

    // Validate required fields
    if (!subject || !message) {
      return res.status(400).json({ message: 'Subject and message are required' });
    }

    // Get all active subscribers
    const subscribers = await sql`
      SELECT email FROM subscribers WHERE status = 'active'
    `;

    if (subscribers.length === 0) {
      return res.status(404).json({ message: 'No active subscribers found' });
    }

    // Here you would integrate with an email service like Resend
    // For now, we'll just return the subscriber count
    const emailAddresses = subscribers.map(sub => sub.email);

    // Example with Resend (you'll need to install @resend/node)
    // const { Resend } = require('@resend/node');
    // const resend = new Resend(process.env.RESEND_API_KEY);
    
    // for (const email of emailAddresses) {
    //   await resend.emails.send({
    //     from: fromEmail,
    //     to: email,
    //     subject: subject,
    //     html: message
    //   });
    // }

    return res.status(200).json({ 
      message: 'Email campaign prepared',
      totalRecipients: emailAddresses.length,
      recipients: emailAddresses
    });

  } catch (error) {
    console.error('Email sending error:', error);
    return res.status(500).json({ message: 'Failed to send emails' });
  }
}
