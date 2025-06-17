import express from 'express';
import upload from '../middlewares/upload.js';
import {
  renderUploadForm,
  handleUpload,
  listXrays
} from '../controllers/xrayController.js';

const router = express.Router();

router.get('/', listXrays);
router.get('/upload', renderUploadForm);
router.post('/upload', upload.single('xray'), handleUpload); // ⬅️ middleware here!

export default router;
