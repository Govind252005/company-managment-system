const express = require('express');
const router = express.Router();
const prisma = require('../db');

router.get('/', async (req, res) => {
  try {
    const result = await prisma.employeeProduct.findMany({
      include: {
        employee: { select: { name: true } },
        product: { select: { name: true } }
      }
    });
    // Map to match the previous response structure
    const mapped = result.map(ep => ({
      employee_id: ep.employee_id,
      product_id: ep.product_id,
      employee_name: ep.employee?.name,
      product_name: ep.product?.name
    }));
    res.json(mapped);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/', async (req, res) => {
  let { product_id, employee_id } = req.body;
  product_id = Number(product_id);
  employee_id = Number(employee_id);
  if (!product_id || !employee_id) {
    return res.status(400).json({ error: 'product_id and employee_id are required' });
  }
  try {
    const employeeProduct = await prisma.employeeProduct.create({
      data: { product_id, employee_id }
    });
    res.json(employeeProduct);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/', async (req, res) => {
  const { product_id, employee_id } = req.body;
  try {
    await prisma.employeeProduct.delete({
      where: {
        product_id_employee_id: {
          product_id,
          employee_id
        }
      }
    });
    res.sendStatus(204);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
