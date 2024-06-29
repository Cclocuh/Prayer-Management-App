import { Router } from 'express';
import {
  createPrayer,
  getPrayers,
  getPrayerById,
  updatePrayerById,
  deletePrayerById
} from './prayerController';

const router = Router();

router.post('/prayers', createPrayer);
router.get('/prayers', getPrayers);
router.get('/prayers/:id', getPrayerById);
router.put('/prayers/:id', updatePrayerById);
router.delete('/prayers/:id', deletePrayerById);

export default router;
