import { Router, Request, Response } from 'express';
import { searchPlacesAPI } from '../services/placesServices';

const router = Router();

// proxy to Google Places API
router.post('/', searchPlacesAPI);

export default router;
