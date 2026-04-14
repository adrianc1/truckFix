import { Request, Response } from 'express';
import { getBreakdownFilters } from '../services/claudeService';

export const breakdownFilters = async (req: Request, res: Response) => {
	const { problem } = req.body;

	if (!problem || typeof problem !== 'string') {
		res.status(400).json({ error: 'problem is required' });
		return;
	}

	try {
		const filters = await getBreakdownFilters(problem);
		res.json(filters);
	} catch (error) {
		console.error('Claude API error:', error);
		res.status(500).json({ error: 'Failed to analyze breakdown' });
	}
};
