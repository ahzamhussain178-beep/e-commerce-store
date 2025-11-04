require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');
const jwt = require('jsonwebtoken');
const authRouter = require('./routes/auth');
const productsRouter = require('./routes/products');
const ordersRouter = require('./routes/orders');
const analyticsRouter = require('./routes/analytics');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();
const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => res.json({ ok: true, version: '0.1.0' }));
app.use('/auth', authRouter);
app.use('/products', productsRouter);
app.use('/orders', ordersRouter);
app.use('/analytics', analyticsRouter);

// Simple subscribe endpoint (stores to server/subscriptions.json)
app.post('/subscribe', express.json(), (req, res) => {
	const { email } = req.body || {};
	if (!email || !email.includes('@')) return res.status(400).json({ success: false, message: 'Invalid email' });
	try {
		const file = path.join(__dirname, '..', 'subscriptions.json');
		let arr = [];
		if (fs.existsSync(file)) {
			arr = JSON.parse(fs.readFileSync(file, 'utf8') || '[]');
		}
		arr.push({ email, createdAt: new Date().toISOString() });
		fs.writeFileSync(file, JSON.stringify(arr, null, 2));
		return res.json({ success: true });
	} catch (e) {
		console.error('subscribe error', e);
		return res.status(500).json({ success: false, message: 'Server error' });
	}
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server listening on ${PORT}`));
