const express = require('express');
const router = express.Router();
const prisma = require('../db');

router.get('/', async (req, res) => {
  try {
    const defects = await prisma.defect.findMany();
    res.json(defects);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/', async (req, res) => {
  const { product_id, employee_id, description, defect_date, status } = req.body;
  // Parse defect_date into a Date object
let parsedDefectDate;
if (defect_date) {
  const parts = defect_date.split('-');
  if (parts.length === 3) {
    // assume "DD-MM-YYYY"
    const [day, month, year] = parts;
    parsedDefectDate = new Date(`${year}-${month}-${day}`);
  } else {
    parsedDefectDate = new Date(defect_date);
  }
}
  try {
    const defect = await prisma.defect.create({
      data: { product_id: Number(product_id), employee_id: Number(employee_id), description, defect_date: parsedDefectDate, status }
    });
    res.json(defect);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { product_id, employee_id, description, defect_date, status } = req.body;
  // Parse defect_date into a Date object
let parsedDefectDate;
if (defect_date) {
  const parts = defect_date.split('-');
  if (parts.length === 3) {
    // assume "DD-MM-YYYY"
    const [day, month, year] = parts;
    parsedDefectDate = new Date(`${year}-${month}-${day}`);
  } else {
    parsedDefectDate = new Date(defect_date);
  }
  }
  
  try {
    await prisma.defect.update({
      where: { id: Number(id) },
      data: { product_id: Number(product_id), employee_id: Number(employee_id), description, defect_date: parsedDefectDate, status }
    });
    res.sendStatus(204);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.defect.delete({ where: { id: Number(id) } });
    res.sendStatus(204);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
