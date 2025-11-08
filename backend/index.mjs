import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';
import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import serverless from 'serverless-http';

const sesClient = new SESClient({ region: process.env.AWS_REGION });

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.get('/api/contact', (req, res) => {
  res.json({ message: 'GET working! Use POST to send emails.' });
});

app.post('/api/contact', async (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Missing fields' });
  }

  const emailParams = {
    Destination: { ToAddresses: [process.env.SES_RECIPIENT] },
    Message: {
      Body: { Text: { Data: `From: ${name} <${email}>\n\n${message}` } },
      Subject: { Data: `New contact form message from ${name}` },
    },
    Source: process.env.SES_SENDER,
  };

  try {
    const data = await sesClient.send(new SendEmailCommand(emailParams));
    console.log('✅ Email sent:', data.MessageId);
    res.status(200).json({ success: true, message: 'Email sent successfully!' });
  } catch (err) {
    console.error('❌ SES send error:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

export const handler = serverless(app);
