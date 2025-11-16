import { Router } from 'express';
import productsRouter from '../controllers/products.controller';

const router = Router();
router.use('/products', productsRouter);

export default router;
