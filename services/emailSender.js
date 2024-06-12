const nodemailer = require("nodemailer");

const senderEmail = "onescafe6688@gmail.com";
const senderPassword = "hkzbavswluwwugds";

let transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: senderEmail,
    pass: senderPassword,
  },
});

async function sendEmail(toEmail, subject, text) {
  let mailOptions = {
    from: senderEmail,
    to: toEmail,
    subject: subject,
    text: text,
  };

  try {
    let info = await transporter.sendMail(mailOptions);
    console.log("Email sent successfully:", info.response);
  } catch (error) {
    console.log("Failed to send email:", error);
  }
}

function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

async function sendVerificationEmail(toEmail, otp) {
  const subject = "Email Verification OTP";
  const text = `Your OTP for email verification is: ${otp}\nThis OTP will expire in 10 minutes`;

  await sendEmail(toEmail, subject, text);
}

async function sendIssueUpdateEmail(toEmail, progress, reply) {
  const subject = `Issue Update: ${progress}`;
  const text = `Hello,\n\nYour issue has been updated to the following progress: ${progress}.\n\nMessage from admin: ${reply}\n\nThank you.`;

  await sendEmail(toEmail, subject, text);
}

async function sendNotificationEmail(subject, text, recipients) {
  const mailOptions = {
    from: senderEmail,
    to: recipients.join(','), // Join multiple emails with commas
    subject: subject,
    text: text,
  };

  try {
    let info = await transporter.sendMail(mailOptions);
    console.log("Notification email sent successfully:", info.response);
  } catch (error) {
    console.error("Failed to send notification email:", error);
    throw error;
  }
}

module.exports = {
  sendEmail,
  sendVerificationEmail,
  sendIssueUpdateEmail,
  sendNotificationEmail,
  generateOTP,
};
