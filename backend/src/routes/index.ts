import { Router } from 'express';
import productsRouter from '../controllers/products.controller';
import analyticsRouter from '../controllers/analytics.controller';

const router = Router();
router.use('/products', productsRouter);
router.use('/analytics', analyticsRouter);

export default router;
