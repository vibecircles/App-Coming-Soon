# VibeCircles Coming Soon Page

A modern coming soon page with email collection functionality using Vercel and Neon PostgreSQL.

## Features

- Modern, responsive design
- Email subscription collection
- Neon PostgreSQL database integration
- Vercel deployment ready

## Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Neon Database Setup

1. Create a Neon PostgreSQL database at [neon.tech](https://neon.tech)
2. Get your database connection string from the Neon dashboard
3. Add the following environment variables to your Vercel project:

```
DATABASE_URL=postgresql://username:password@hostname/database
```

### 3. Database Initialization

After setting up your environment variables, call the setup endpoint to create the database table:

```bash
curl -X POST https://your-domain.vercel.app/api/setup-db
```

### 4. Deploy to Vercel

```bash
npm run deploy
```

## API Endpoints

- `POST /api/subscribe` - Subscribe to email list
- `POST /api/setup-db` - Initialize database table
- `POST /api/send-email` - Send emails to subscribers (requires email service integration)

## Email Service Integration

To send emails to subscribers, you can integrate with services like:

- **Resend** (recommended for Vercel)
- **SendGrid**
- **Mailgun**
- **AWS SES**

Example with Resend:

1. Install Resend: `npm install @resend/node`
2. Add environment variable: `RESEND_API_KEY=your_api_key`
3. Uncomment the email sending code in `/api/send-email.js`

## Development

```bash
npm run dev
```

## License

MIT
