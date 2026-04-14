import { Router } from 'express';
const router = Router();

// Call Anthropic API to get a response from Claude
router.post('/', callBreakdownMode);

export default router;
