const nodemailer = require('nodemailer');
const crypto = require('crypto');
const { promisify } = require('util');

const randomBytesAsync = promisify(crypto.randomBytes);

async function sendVerificationEmail(toEmail, otp) {
    const senderEmail = 'onescafe6688@gmail.com';
    const senderPassword = 'hkzbavswluwwugds';

    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: senderEmail,
            pass: senderPassword,
        },
    });

    let mailOptions = {
        from: senderEmail,
        to: toEmail,
        subject: 'Email Verification OTP',
        text: `Your OTP for email verification is: ${otp}\nThis OTP will expire in 10 minutes`,
    };

    try {
        let info = await transporter.sendMail(mailOptions);
        console.log('Email sent successfully:', info.response);
    } catch (error) {
        console.log('Failed to send email:', error);
    }
}

function generateOTP() {
    return Math.floor(100000 + Math.random() * 900000).toString();
}

module.exports = {
    sendVerificationEmail,
    generateOTP,
};
