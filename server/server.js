const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const nodemailer = require('nodemailer');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(
  cors({
    origin: process.env.CORS_ORIGIN, // Example: http://localhost:3000
    credentials: true,
  })
);
app.use(express.json());

// Create transporter using Gmail
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER, // Your Gmail address
    pass: process.env.EMAIL_PASS, // Your Gmail App Password
  },
});

// Verify connection
transporter.verify((error, success) => {
  if (error) {
    console.error('❌ Email server connection failed:', error);
  } else {
    console.log('✅ Email service ready to send messages');
  }
});

// POST endpoint to receive and email quotation form data
app.post('/send-quotations', async (req, res) => {
  try {
    const requestData = req.body;
    console.log('Received data:', requestData);

    // Build email content
    const fieldsHTML = requestData.formFields
      .map(
        (field) => `
        <tr>
          <td style="padding: 6px 12px; border: 1px solid #ddd;"><b>${field.key}</b></td>
          <td style="padding: 6px 12px; border: 1px solid #ddd;">${field.value}</td>
        </tr>`
      )
      .join('');

    const htmlContent = `
      <h2>📦 New Supplier Quotation Received</h2>
      <p><b>Language:</b> ${requestData.lang}</p>
      <table style="border-collapse: collapse; width: 100%; font-family: Arial, sans-serif;">
        <thead>
          <tr style="background-color: #f5f5f5;">
            <th style="padding: 6px 12px; border: 1px solid #ddd;">Field</th>
            <th style="padding: 6px 12px; border: 1px solid #ddd;">Value</th>
          </tr>
        </thead>
        <tbody>
          ${fieldsHTML}
        </tbody>
      </table>
    `;

    const mailOptions = {
      from: `"FS Traders" <${process.env.EMAIL_USER}>`,
      to: process.env.RECEIVER_EMAIL,
      subject: '📝 New Supplier Form Submission',
      html: htmlContent,
    };

    await transporter.sendMail(mailOptions);
    console.log('✅ Email sent successfully to:', process.env.RECEIVER_EMAIL);

    res.status(200).json({
      message: 'Quotation received and emailed successfully!',
      data: requestData,
    });
  } catch (error) {
    console.error('❌ Error sending email:', error);
    res.status(500).json({ message: 'Failed to send email', error: error.message });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
  console.log(`✅ Backend Connected Successfully`);
});
