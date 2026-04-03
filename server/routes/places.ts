import { Router } from 'express';
import { searchGooglePlaces } from '../services/placesServices';

const router = Router();

// proxy to Google Places API
router.post('/', searchGooglePlaces);

export default router;
