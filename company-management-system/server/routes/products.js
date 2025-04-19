const express = require('express');
const router = express.Router();
const prisma = require('../db');

router.get('/', async (req, res) => {
  try {
    const products = await prisma.product.findMany();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/', async (req, res) => {
  const { name, type, price, mfd, department_id } = req.body;

  // Parse and validate inputs
const priceNum = price != null ? parseFloat(price) : undefined;
let mfdDate;
if (mfd) {
  const parts = mfd.split('-');
  if (parts.length === 3) {
    // assume "DD-MM-YYYY"
    const [day, month, year] = parts;
    mfdDate = new Date(`${year}-${month}-${day}`);
  } else {
    mfdDate = new Date(mfd); // ISO date
  }
}
  const deptId = department_id != null ? Number(department_id) : undefined;
  

  try {
   const product = await prisma.product.create({
  data: {
    name,
    type,
    price: priceNum,
    mfd: mfdDate,
    department_id: deptId,
  },
});
    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, type, price, mfd, department_id } = req.body;
  try {
    await prisma.product.update({
      where: { id: Number(id) },
      data: { name, type, price, mfd, department_id }
    });
    res.sendStatus(204);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.product.delete({ where: { id: Number(id) } });
    res.sendStatus(204);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
