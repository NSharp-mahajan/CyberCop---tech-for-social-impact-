import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === 'POST') {
      const { message, chat_id } = req.body;

      // Validate the message field
      if (!message || typeof message !== 'string' || message.trim() === '') {
        return res.status(400).json({ error: 'Invalid or missing message in the request body.' });
      }

      // Logic to handle CyberCop-related queries
      let reply = '';

      if (message.toLowerCase().includes('fir')) {
        reply = "To file an FIR, visit the FIR Generator section on our website or contact your local authorities.";
      } else if (message.toLowerCase().includes('scam')) {
        reply = "You can report scams using the Scam Reporting feature on our platform.";
      } else if (message.toLowerCase().includes('url safety')) {
        reply = "To check if a URL is safe, you can use online tools like VirusTotal or our URL Checker feature. Always ensure the URL starts with HTTPS and avoid clicking on suspicious links.";
      } else if (message.toLowerCase().includes('cyber safety tips')) {
        reply = "Here are some cyber safety tips: 1. Use strong and unique passwords. 2. Enable two-factor authentication. 3. Avoid clicking on unknown links. 4. Keep your software updated. 5. Be cautious of phishing emails.";
      } else if (message.toLowerCase().includes('password security')) {
        reply = "For password security, use a combination of uppercase, lowercase, numbers, and special characters. Avoid using personal information and consider using a password manager for better security.";
      } else {
        reply = "I'm sorry, I can only assist with questions related to the CyberCop platform. Please ask about cybersecurity, filing FIRs, reporting scams, or general cyber safety.";
      }

      res.status(200).json({ chat_id: chat_id || 'new-chat', reply });
    } else {
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    console.error('Unexpected error in /api/chat:', error);
    res.status(500).json({ error: 'An unexpected error occurred. Please try again later.' });
  }
}