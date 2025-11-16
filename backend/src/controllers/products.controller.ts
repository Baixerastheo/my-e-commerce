import { Router } from 'express';
const router = Router();

const products = require('../data/products.json');

router.get('/', (req, res) => res.json(products));

router.get('/:id', (req, res) => {
    const product = products.find((p: any) => p.id === Number(req.params.id));
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.json(product);
});

export default router;
