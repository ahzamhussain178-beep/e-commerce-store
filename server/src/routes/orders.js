const express = require('express');
const router = express.Router();
const prisma = require('../prisma');
const stripe = process.env.STRIPE_SECRET_KEY ? require('stripe')(process.env.STRIPE_SECRET_KEY) : null;

// GET /orders
router.get('/', async (req, res) => {
  try {
    const { page = 1, limit = 10, status, paymentStatus, search } = req.query;
    const skip = (page - 1) * limit;

    const where = {};

    if (status) where.status = status;
    if (paymentStatus) where.paymentStatus = paymentStatus;

    if (search) {
      where.OR = [
        { orderNumber: { contains: search, mode: 'insensitive' } },
        { customerName: { contains: search, mode: 'insensitive' } },
        { customerEmail: { contains: search, mode: 'insensitive' } }
      ];
    }

    const [orders, total] = await Promise.all([
      prisma.order.findMany({
        where,
        skip,
        take: parseInt(limit),
        orderBy: { createdAt: 'desc' },
        include: {
          orderItems: {
            include: {
              product: true
            }
          }
        }
      }),
      prisma.order.count({ where })
    ]);

    res.json({
      success: true,
      orders,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// GET /orders/:id
router.get('/:id', async (req, res) => {
  try {
    const id = Number(req.params.id);
    const order = await prisma.order.findUnique({
      where: { id },
      include: {
        orderItems: {
          include: {
            product: true
          }
        }
      }
    });

    if (!order) return res.status(404).json({ success: false, message: 'Order not found' });
    res.json({ success: true, order });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// POST /orders/create-payment-intent
router.post('/create-payment-intent', async (req, res) => {
  try {
    const { amount, currency = 'usd' } = req.body;

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Convert to cents
      currency,
      automatic_payment_methods: {
        enabled: true,
      },
    });

    res.json({
      success: true,
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// POST /orders
router.post('/', async (req, res) => {
  try {
    const {
      customerName,
      customerEmail,
      customerPhone,
      shippingAddress,
      billingAddress,
      items,
      paymentMethod,
      paymentId
    } = req.body;

    // Generate order number
    const orderNumber = `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 5).toUpperCase()}`;

    // Calculate total
    let totalAmount = 0;
    const orderItems = [];

    for (const item of items) {
      const product = await prisma.product.findUnique({ where: { id: item.productId } });
      if (!product) {
        return res.status(400).json({ success: false, message: `Product ${item.productId} not found` });
      }

      if (product.stock < item.quantity) {
        return res.status(400).json({ success: false, message: `Insufficient stock for ${product.title}` });
      }

      const itemTotal = product.price * item.quantity;
      totalAmount += itemTotal;

      orderItems.push({
        productId: item.productId,
        quantity: item.quantity,
        price: product.price
      });

      // Update stock
      await prisma.product.update({
        where: { id: item.productId },
        data: { stock: product.stock - item.quantity }
      });
    }

    const order = await prisma.order.create({
      data: {
        orderNumber,
        customerName,
        customerEmail,
        customerPhone,
        shippingAddress,
        billingAddress,
        totalAmount,
        paymentMethod,
        paymentId,
        paymentStatus: paymentId ? 'paid' : 'pending',
        orderItems: {
          create: orderItems
        }
      },
      include: {
        orderItems: {
          include: {
            product: true
          }
        }
      }
    });

    res.status(201).json({ success: true, order });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// PUT /orders/:id
router.put('/:id', async (req, res) => {
  try {
    const id = Number(req.params.id);
    const { status, paymentStatus } = req.body;

    const order = await prisma.order.update({
      where: { id },
      data: {
        status,
        paymentStatus,
        updatedAt: new Date()
      },
      include: {
        orderItems: {
          include: {
            product: true
          }
        }
      }
    });

    res.json({ success: true, order });
  } catch (error) {
    if (error.code === 'P2025') {
      res.status(404).json({ success: false, message: 'Order not found' });
    } else {
      res.status(500).json({ success: false, error: error.message });
    }
  }
});

// DELETE /orders/:id
router.delete('/:id', async (req, res) => {
  try {
    const id = Number(req.params.id);

    // Get order items to restore stock
    const orderItems = await prisma.orderItem.findMany({
      where: { orderId: id },
      include: { product: true }
    });

    // Restore stock
    for (const item of orderItems) {
      await prisma.product.update({
        where: { id: item.productId },
        data: { stock: item.product.stock + item.quantity }
      });
    }

    await prisma.order.delete({ where: { id } });
    res.json({ success: true, message: 'Order deleted successfully' });
  } catch (error) {
    if (error.code === 'P2025') {
      res.status(404).json({ success: false, message: 'Order not found' });
    } else {
      res.status(500).json({ success: false, error: error.message });
    }
  }
});

module.exports = router;
