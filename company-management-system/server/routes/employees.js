const express = require('express');
const router = express.Router();
const prisma = require('../db');

router.get('/', async (req, res) => {
  try {
    const employees = await prisma.employee.findMany();
    res.json(employees);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/', async (req, res) => {
  const { name, address, designation, contact_no, salary, department_id } = req.body;
  try {
    const employee = await prisma.employee.create({
      data: {
        name,
        address,
        designation,
        contact_no,
        salary: salary !== undefined ? parseFloat(salary) : undefined,
        department_id: department_id !== undefined && department_id !== null
        ? Number(department_id)
        : undefined,
      },
    });
    res.status(201).json(employee);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, address, designation, contact_no, salary, department_id } = req.body;
// Validate department_id if provided
const deptId = department_id != null ? Number(department_id) : undefined;
if (deptId !== undefined) {
  const existingDept = await prisma.department.findUnique({ where: { id: deptId } });
  if (!existingDept) {
    return res.status(400).json({ error: `Department with id ${deptId} does not exist` });
  }
}
  
  try {
    await prisma.employee.update({
      where: { id: Number(id) },
      data: {
        name,
        address,
        designation,
        contact_no,
        salary: salary !== undefined ? parseFloat(salary) : undefined,
        department_id: deptId,
      },
    });
    res.sendStatus(204);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.employee.delete({ where: { id: Number(id) } });
    res.sendStatus(204);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
