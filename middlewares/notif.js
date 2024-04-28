const nodemailer = require('nodemailer');

// Function to send email notification to HR
const sendNotificationEmail = async (requestData) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: 'mansouriamira516@gmail.com', // Replace with HR email
    subject: 'New Leave Request Added',
    html: `
      <p>Hello HR,</p>
      <p>An employee has submitted a new leave request. Please review the details:</p>
      <p><strong>Start Date:</strong> ${requestData.startDate}</p>
      <p><strong>End Date:</strong> ${requestData.endDate}</p>
      <p><strong>Cause:</strong> ${requestData.cause}</p>
      <p><strong>Status:</strong> ${requestData.status}</p>
      <p>Regards,</p>
      <p>Your Company</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Email notification sent successfully.');
  } catch (error) {
    console.error('Email notification error:', error);
  }
};

module.exports = sendNotificationEmail;

