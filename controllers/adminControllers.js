const Admin = require('../models/Admin');
const bcrypt = require('bcrypt');
const { sendVerificationEmail, generateOTP } = require('../services/emailSender');

exports.registerAdmin = async (req, res) => {
    try {
        const { email, password} = req.body;
        const existingAdmin = await Admin.findOne({ email });
        if (existingAdmin) {
            return res.status(400).json({ message: 'Email already in use' });
        }
        const otp = generateOTP();
        const otpExpires = Date.now() + 10 * 60 * 1000; // OTP expires in 10 minutes

        const admin = new Admin({
            email,
            password: await bcrypt.hash(password, 10),
            otp,
            otpExpires,
            verified: false,
        });
        console.log('Admin data to be saved:', admin);
        await admin.save();
        await sendVerificationEmail(email, otp);
        console.log(`OTP sent to ${email} with OTP ${otp}`);
        res.status(200).json({ message: 'Verification OTP sent. Please check your email.' });
    } catch (error) {
        console.error('Error registering admin:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.verifyOtp = async (req, res) => {
    try {
        const { email, otp } = req.body;
        const admin = await Admin.findOne({ email, otp });
        if (!admin) {
            return res.status(400).json({ message: 'Invalid OTP or email' });
        }
        if (admin.otpExpires < Date.now()) {
            return res.status(400).json({ message: 'OTP expired' });
        }
        admin.verified = true;
        admin.otp = undefined;
        admin.otpExpires = undefined;
        await admin.save();
        res.status(200).json({ message: 'Email verified successfully. You can now log in.' });
    } catch (error) {
        console.error('Error verifying OTP:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.loginAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const admin = await Admin.findOne({ email });
        if (!admin) {
            console.log('Admin not found');
            return res.status(401).send('Invalid credentials');
        }
        const isMatch = await bcrypt.compare(password, admin.password);
        console.log('Password match:', isMatch);
        if (isMatch) {
            req.session.isAuthenticated = true;
            req.session.admin = admin;
            res.status(200).json(admin);
        } else {
            res.status(401).send('Invalid credentials');
        }
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).send('Error logging in');
    }
};

exports.logoutAdmin = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).send('Failed to logout');
        }
        res.clearCookie('connect.sid'); // Assuming express-session is used
        res.status(200).send('Logged out');
    });
};
