const express = require('express');
const router = express.Router();
const prisma = require('../prisma');

// GET /analytics/overview
router.get('/overview', async (req, res) => {
  try {
    const { period = '30' } = req.query; // days
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - parseInt(period));

    // Total revenue
    const totalRevenueResult = await prisma.order.aggregate({
      where: {
        createdAt: { gte: startDate },
        paymentStatus: 'paid'
      },
      _sum: { totalAmount: true }
    });
    const totalRevenue = totalRevenueResult._sum.totalAmount || 0;

    // Total orders
    const totalOrders = await prisma.order.count({
      where: { createdAt: { gte: startDate } }
    });

    // Active customers (unique customers with orders)
    const activeCustomers = await prisma.order.findMany({
      where: { createdAt: { gte: startDate } },
      select: { customerEmail: true },
      distinct: ['customerEmail']
    });
    const activeCustomersCount = activeCustomers.filter(c => c.customerEmail).length;

    // Inventory items (total stock across all products)
    const inventoryResult = await prisma.product.aggregate({
      _sum: { stock: true }
    });
    const inventoryItems = inventoryResult._sum.stock || 0;

    // Recent orders count (last 7 days)
    const recentOrdersStart = new Date();
    recentOrdersStart.setDate(recentOrdersStart.getDate() - 7);
    const recentOrders = await prisma.order.count({
      where: { createdAt: { gte: recentOrdersStart } }
    });

    // Calculate percentage changes (comparing with previous period)
    const prevPeriodStart = new Date();
    prevPeriodStart.setDate(prevPeriodStart.getDate() - (parseInt(period) * 2));
    const prevPeriodEnd = new Date(startDate);

    const prevRevenueResult = await prisma.order.aggregate({
      where: {
        createdAt: { gte: prevPeriodStart, lt: prevPeriodEnd },
        paymentStatus: 'paid'
      },
      _sum: { totalAmount: true }
    });
    const prevRevenue = prevRevenueResult._sum.totalAmount || 0;
    const revenueChange = prevRevenue > 0 ? ((totalRevenue - prevRevenue) / prevRevenue) * 100 : 0;

    const prevOrders = await prisma.order.count({
      where: { createdAt: { gte: prevPeriodStart, lt: prevPeriodEnd } }
    });
    const ordersChange = prevOrders > 0 ? ((totalOrders - prevOrders) / prevOrders) * 100 : 0;

    const prevCustomers = await prisma.order.findMany({
      where: { createdAt: { gte: prevPeriodStart, lt: prevPeriodEnd } },
      select: { customerEmail: true },
      distinct: ['customerEmail']
    });
    const prevCustomersCount = prevCustomers.filter(c => c.customerEmail).length;
    const customersChange = prevCustomersCount > 0 ? ((activeCustomersCount - prevCustomersCount) / prevCustomersCount) * 100 : 0;

    const prevInventoryResult = await prisma.product.aggregate({
      where: { createdAt: { lt: startDate } },
      _sum: { stock: true }
    });
    const prevInventory = prevInventoryResult._sum.stock || 0;
    const inventoryChange = prevInventory > 0 ? ((inventoryItems - prevInventory) / prevInventory) * 100 : 0;

    res.json({
      success: true,
      data: {
        totalRevenue,
        totalOrders,
        activeCustomers: activeCustomersCount,
        inventoryItems,
        revenueChange: Math.round(revenueChange * 100) / 100,
        ordersChange: Math.round(ordersChange * 100) / 100,
        customersChange: Math.round(customersChange * 100) / 100,
        inventoryChange: Math.round(inventoryChange * 100) / 100,
        recentOrders
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// GET /analytics/sales-chart
router.get('/sales-chart', async (req, res) => {
  try {
    const { period = '30' } = req.query; // days
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - parseInt(period));

    // Group orders by date
    const orders = await prisma.order.findMany({
      where: {
        createdAt: { gte: startDate },
        paymentStatus: 'paid'
      },
      select: {
        createdAt: true,
        totalAmount: true
      },
      orderBy: { createdAt: 'asc' }
    });

    // Aggregate by date
    const salesByDate = {};
    orders.forEach(order => {
      const date = order.createdAt.toISOString().split('T')[0];
      if (!salesByDate[date]) {
        salesByDate[date] = 0;
      }
      salesByDate[date] += order.totalAmount;
    });

    const chartData = Object.entries(salesByDate).map(([date, amount]) => ({
      date,
      amount: Math.round(amount * 100) / 100
    }));

    res.json({ success: true, data: chartData });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// GET /analytics/top-products
router.get('/top-products', async (req, res) => {
  try {
    const { limit = 5, period = '30' } = req.query;
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - parseInt(period));

    const topProducts = await prisma.orderItem.groupBy({
      by: ['productId'],
      where: {
        order: {
          createdAt: { gte: startDate },
          paymentStatus: 'paid'
        }
      },
      _sum: { quantity: true },
      _count: { productId: true },
      orderBy: { _sum: { quantity: 'desc' } },
      take: parseInt(limit)
    });

    // Get product details
    const productIds = topProducts.map(p => p.productId);
    const products = await prisma.product.findMany({
      where: { id: { in: productIds } },
      select: { id: true, title: true, price: true, images: true }
    });

    const productMap = {};
    products.forEach(p => {
      productMap[p.id] = p;
    });

    const result = topProducts.map(item => ({
      product: productMap[item.productId],
      totalSold: item._sum.quantity,
      orderCount: item._count.productId
    }));

    res.json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// GET /analytics/order-status
router.get('/order-status', async (req, res) => {
  try {
    const statusCounts = await prisma.order.groupBy({
      by: ['status'],
      _count: { status: true }
    });

    const result = statusCounts.map(item => ({
      status: item.status,
      count: item._count.status
    }));

    res.json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
