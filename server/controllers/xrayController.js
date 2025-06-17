import cloudinary from '../config/cloudinary.js';
import { Xray, Patient } from '../models/index.js';

export const renderUploadForm = async (req, res) => {
  try {
    const patients = await Patient.findAll();
    res.render('admin/uploadXray', { patients });
  } catch (err) {
    console.error('Error loading patients:', err);
    res.status(500).send('Failed to load patients');
  }
};

export const handleUpload = async (req, res) => {
  const { patientId, notes } = req.body;
  const file = req.file;

  if (!file) {
    return res.status(400).send('No file uploaded');
  }

  try {
    const uploadResult = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: 'dental_clinic/xrays' },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
      stream.end(file.buffer);
    });

    await Xray.create({
      patientId,
      imageUrl: uploadResult.secure_url,
      notes
    });

    res.redirect('/admin/xrays');
  } catch (error) {
    console.error('❌ Upload error:', error);
    res.status(500).send('Upload failed');
  }
};

export const listXrays = async (req, res) => {
  try {
    const xrays = await Xray.findAll({ include: [Patient] });
    res.render('admin/xrays', { xrays });
  } catch (err) {
    res.status(500).send('Failed to load xrays');
  }
};
