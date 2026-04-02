import { Router } from 'express';
import { getShops } from '../controllers/shopsController';
const router = Router();

// return all verified shops
router.get('/', getShops);

export default router;
