import express, { Request, Response } from 'express';

const app = express();

app.get('/new', (req: Request, res: Response) => res.send('Hello, world!'));

const PORT = 3000;
app.listen(PORT, (error) => {
	if (error) {
		throw error;
	}
	console.log(`TruckFix server listening on port ${PORT}!`);
});
