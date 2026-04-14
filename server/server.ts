import dotenv from 'dotenv';
dotenv.config({ path: '.env' });
dotenv.config({ path: '.env.local' });

import express from 'express';
import cors from 'cors';
import shopsRouter from './routes/shops';
import placesRouter from './routes/places';
import claudeRouter from './routes/claude';

const app = express();

app.use(
	cors({ origin: ['https://truckfix.netlify.app', 'http://localhost:5173'] }),
);
app.use(express.json());

app.use('/api/claude', claudeRouter);
app.use('/api/shops', shopsRouter);
app.use('/api/places', placesRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log(`TruckFix server listening on port ${PORT}!`);
});
