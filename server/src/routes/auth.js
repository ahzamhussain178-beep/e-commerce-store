const express = require('express');
const router = express.Router();
const prisma = require('../prisma');

// Helper to locate model on prisma client in a case-insensitive way
function getModel(modelName) {
  if (!prisma) return null;
  if (prisma[modelName]) return prisma[modelName];
  const lower = modelName.toLowerCase();
  if (prisma[lower]) return prisma[lower];
  // try camelCase
  const camel = modelName.charAt(0).toLowerCase() + modelName.slice(1);
  if (prisma[camel]) return prisma[camel];
  // fallback: search keys
  const key = Object.keys(prisma).find(k => k.toLowerCase() === lower);
  return key ? prisma[key] : null;
}
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const twilio = require('twilio');

const SMS_FROM = process.env.TWILIO_FROM || null;
const TWILIO_SID = process.env.TWILIO_SID || null;
const TWILIO_TOKEN = process.env.TWILIO_TOKEN || null;

let twilioClient = null;
if (TWILIO_SID && TWILIO_TOKEN) twilioClient = twilio(TWILIO_SID, TWILIO_TOKEN);

// POST /auth/request-otp
router.post('/request-otp', async (req, res) => {
  const { phone } = req.body;
  if (!phone) return res.status(400).json({ success: false, message: 'phone required' });
  const code = Math.floor(100000 + Math.random() * 900000).toString();
  const expiresAt = new Date(Date.now() + 1000 * 60 * 5);
  try {
    const OTP = getModel('OTP');
    if (!OTP) throw new Error('Prisma model for OTP not found');
    await OTP.create({ data: { phone, code, expiresAt } });
  } catch (e) {
    console.error('prisma otp create error', e);
  }
  // send SMS if configured
  if (twilioClient && SMS_FROM) {
    try {
      await twilioClient.messages.create({ body: `Your verification code: ${code}`, from: SMS_FROM, to: phone });
      return res.json({ success: true, message: 'OTP sent' });
    } catch (e) {
      console.error('twilio send error', e);
    }
  }
  // dev fallback: return code in response
  console.info(`[DEV OTP] phone=${phone} code=${code}`);
  return res.json({ success: true, message: 'OTP stored (dev)', devCode: code });
});

// POST /auth/verify-otp
router.post('/verify-otp', async (req, res) => {
  const { phone, code } = req.body;
  if (!phone || !code) return res.status(400).json({ success: false, message: 'phone and code required' });
  try {
    const OTP = getModel('OTP');
    if (!OTP) return res.status(500).json({ success: false, message: 'Server misconfigured: OTP model not found' });
    const record = await OTP.findFirst({ where: { phone, code }, orderBy: { createdAt: 'desc' } });
    if (!record) return res.status(400).json({ success: false, message: 'Invalid OTP' });
    if (new Date() > record.expiresAt) return res.status(400).json({ success: false, message: 'OTP expired' });

    // create or upsert user
    const User = getModel('User');
    if (!User) return res.status(500).json({ success: false, message: 'Server misconfigured: User model not found' });
    let user = await User.findUnique({ where: { phone } });
    if (!user) {
      user = await User.create({ data: { phone, role: 'user' } });
    }
    const token = jwt.sign({ sub: user.id, role: user.role }, process.env.JWT_SECRET || 'dev-secret', { expiresIn: '7d' });
    // delete used OTP
    await OTP.deleteMany({ where: { id: record.id } }).catch(() => {});
    return res.json({ success: true, token, user });
  } catch (e) {
    console.error('verify-otp error', e);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
  const token = jwt.sign({ sub: user.id, role: user.role }, process.env.JWT_SECRET || 'dev-secret', { expiresIn: '7d' });
  // delete used OTP
  await prisma.otp.deleteMany({ where: { id: record.id } }).catch(() => {});
  return res.json({ success: true, token, user });
});

// POST /auth/admin-login
router.post('/admin-login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ success: false });
  const User = getModel('User');
  if (!User) return res.status(500).json({ success: false, message: 'Server misconfigured: User model not found' });
  const admin = await User.findUnique({ where: { email } });
  if (!admin) return res.status(401).json({ success: false, message: 'Invalid' });
  const ok = await bcrypt.compare(password, admin.passwordHash || '');
  if (!ok || admin.role !== 'admin') return res.status(401).json({ success: false, message: 'Invalid' });
  const token = jwt.sign({ sub: admin.id, role: admin.role }, process.env.JWT_SECRET || 'dev-secret', { expiresIn: '7d' });
  return res.json({ success: true, token, user: { id: admin.id, email: admin.email, role: admin.role } });
});

module.exports = router;
