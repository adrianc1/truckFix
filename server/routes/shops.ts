import { Router } from 'express';
import { getShops, nearbyShops } from '../controllers/shopsController';
const router = Router();

router.get('/', getShops);
router.get('/nearby', nearbyShops);

export default router;
