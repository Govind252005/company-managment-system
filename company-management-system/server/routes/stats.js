const express = require('express');
const router = express.Router();
const prisma = require('../db');

router.get('/', async (req, res) => {
  try {
    const stats = {};
    stats.total_employees = await prisma.employee.count();
    stats.total_products = await prisma.product.count();
    stats.total_defects = await prisma.defect.count();
    stats.total_materials = await prisma.rawMaterial.count();
    stats.total_departments = await prisma.department.count();
    res.json(stats);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
