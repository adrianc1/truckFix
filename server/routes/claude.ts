import { Router } from 'express';
import { breakdownFilters } from '../controllers/claudeController';

const router = Router();

router.post('/breakdown-filters', breakdownFilters);

export default router;
