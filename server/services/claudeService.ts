import Anthropic from '@anthropic-ai/sdk';

export type BreakdownFilters = {
	isMobileService?: boolean;
	is24Hours?: boolean;
	services?: string[];
	sortBy: 'distance' | 'rating';
	urgency: 'high' | 'medium' | 'low';
};

export const getBreakdownFilters = async (
	problem: string,
): Promise<BreakdownFilters> => {
	const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
	const message = await client.messages.create({
		model: 'claude-haiku-4-5-20251001',
		max_tokens: 256,
		messages: [
			{
				role: 'user',
				content: `A truck driver has broken down and describe
  "${problem}"                                                                       
                                          
  Return a JSON object with these fields:     
  - isMobileService: true if they can't move the truck                               
  - is24Hours: true if it sounds urgent/nighttime
  - services: array of relevant repair types from this list only: ["brakes", "tires",
   "engine", "diesel", "transmission", "electrical", "hvac", "suspension"]
  - sortBy: "distance" if urgent, "rating" if not                                    
  - urgency: "high", "medium", or "low"       
                                                                                     
  Respond with only raw valid JSON. No explanation, no markdown, no code blocks.`,
			},
		],
	});

	const raw = message.content[0].type === 'text' ? message.content[0].text : '';
	const text = raw.replace(/^```json\s*/i, '').replace(/```\s*$/, '').trim();
	return JSON.parse(text) as BreakdownFilters;
};
