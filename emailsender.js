const nodemailer = require('nodemailer');

async function sendEmail() {
    const senderEmail = 'onescafe6688@gmail.com';
    const senderPassword = 'hkzbavswluwwugds';

    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: senderEmail,
            pass: senderPassword
        }
    });

    let mailOptions = {
        from: senderEmail,
        to: 'kahchunlim885@gmail.com',
        subject: 'Test Email',
        text: 'This is a test email sent from a Node.js program.'
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log('Failed to send email:', error);
        }
        console.log('Email sent successfully:', info.response);
    });
}

sendEmail().catch(console.error);