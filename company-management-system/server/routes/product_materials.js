const express = require('express');
const router = express.Router();
const prisma = require('../db');

router.get('/', async (req, res) => {
  try {
    const result = await prisma.productMaterial.findMany({
      include: {
        product: { select: { name: true } },
        rawMaterial: { select: { name: true } }
      }
    });
    const mapped = result.map(pm => ({
      product_id: pm.product_id,
      material_id: pm.material_id,
      product_name: pm.product?.name,
      material_name: pm.rawMaterial?.name
    }));
    res.json(mapped);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/', async (req, res) => {
  let { product_id, material_id } = req.body;
  product_id = Number(product_id);
  material_id = Number(material_id);
  if (isNaN(product_id) || isNaN(material_id)) {
    console.log('Invalid product_id or material_id', product_id, material_id);
    
    return res.status(400).json({ error: 'Invalid product_id or material_id' });
  }
  try {
    const productMaterial = await prisma.productMaterial.create({
      data: { product_id, material_id }
    });
    res.json(productMaterial);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/', async (req, res) => {
  let { product_id, material_id } = req.body;
  product_id = Number(product_id);
  material_id = Number(material_id);
  if (isNaN(product_id) || isNaN(material_id)) {
    return res.status(400).json({ error: 'Invalid product_id or material_id' });
  }
  try {
    await prisma.productMaterial.delete({
      where: {
        product_id_material_id: {
          product_id,
          material_id
        }
      }
    });
    res.sendStatus(204);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
