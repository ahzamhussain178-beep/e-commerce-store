const express = require('express');
const router = express.Router();
const prisma = require('../prisma');

// GET /products
router.get('/', async (req, res) => {
  try {
    const { page = 1, limit = 10, search, category, published = true } = req.query;
    const skip = (page - 1) * limit;

    const where = {
      published: published === 'true' ? true : published === 'false' ? false : undefined,
    };

    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
        { sku: { contains: search, mode: 'insensitive' } }
      ];
    }

    if (category) {
      where.category = category;
    }

    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where,
        skip,
        take: parseInt(limit),
        orderBy: { createdAt: 'desc' }
      }),
      prisma.product.count({ where })
    ]);

    res.json({
      success: true,
      products,
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

// GET /products/:id
router.get('/:id', async (req, res) => {
  try {
    const id = Number(req.params.id);
    const product = await prisma.product.findUnique({ where: { id } });
    if (!product) return res.status(404).json({ success: false, message: 'Product not found' });
    res.json({ success: true, product });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// POST /products
router.post('/', async (req, res) => {
  try {
    const { title, description, price, images, stock, sku, category, published } = req.body;

    const product = await prisma.product.create({
      data: {
        title,
        description,
        price: parseFloat(price),
        images: images || [],
        stock: parseInt(stock) || 0,
        sku,
        category,
        published: published !== undefined ? published : true
      }
    });

    res.status(201).json({ success: true, product });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// PUT /products/:id
router.put('/:id', async (req, res) => {
  try {
    const id = Number(req.params.id);
    const { title, description, price, images, stock, sku, category, published } = req.body;

    const product = await prisma.product.update({
      where: { id },
      data: {
        title,
        description,
        price: parseFloat(price),
        images,
        stock: parseInt(stock),
        sku,
        category,
        published
      }
    });

    res.json({ success: true, product });
  } catch (error) {
    if (error.code === 'P2025') {
      res.status(404).json({ success: false, message: 'Product not found' });
    } else {
      res.status(500).json({ success: false, error: error.message });
    }
  }
});

// DELETE /products/:id
router.delete('/:id', async (req, res) => {
  try {
    const id = Number(req.params.id);
    await prisma.product.delete({ where: { id } });
    res.json({ success: true, message: 'Product deleted successfully' });
  } catch (error) {
    if (error.code === 'P2025') {
      res.status(404).json({ success: false, message: 'Product not found' });
    } else {
      res.status(500).json({ success: false, error: error.message });
    }
  }
});

module.exports = router;
