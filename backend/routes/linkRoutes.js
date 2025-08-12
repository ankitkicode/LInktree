import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import {
  createLink,
  getLinks,
  updateLink,
  deleteLink,
  getPublicLinks,
} from '../controllers/linkController.js';

const router = express.Router();

router.get('/', authMiddleware, getLinks);
router.post('/', authMiddleware, createLink);
router.put('/:id', authMiddleware, updateLink);
router.delete('/:id', authMiddleware, deleteLink);
router.get('/public/:username', getPublicLinks);

export default router;
