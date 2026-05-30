import express from 'express';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import Product from '../models/Product.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => { cb(null, 'uploads/'); },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const allowed = /jpeg|jpg|png|webp/;
    if (allowed.test(path.extname(file.originalname).toLowerCase()) && allowed.test(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Only images are allowed'));
    }
  },
  limits: { fileSize: 5 * 1024 * 1024 }
});

// GET all products
router.get('/', async (req, res) => {
  try {
    // ─── Sync with external billing server ───
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000); // 5s timeout
      const billingRes = await fetch('https://billing-server-gaha.onrender.com/api/products', {
        signal: controller.signal
      });
      clearTimeout(timeoutId);
      if (billingRes.ok) {
        const billingProducts = await billingRes.json();
        if (Array.isArray(billingProducts)) {
          const existingProducts = await Product.find();
          const existingNames = new Set(existingProducts.map(p => p.name));

          const productsToSave = [];
          const seenIncoming = new Set();
          for (const bp of billingProducts) {
            if (bp.name && !existingNames.has(bp.name) && !seenIncoming.has(bp.name)) {
              seenIncoming.add(bp.name);
              productsToSave.push(new Product({
                name: bp.name,
              }));
            }
          }
          if (productsToSave.length > 0) {
            await Product.insertMany(productsToSave);
          }
        }
      }
    } catch (syncError) {
      console.error('Failed to sync products from billing server:', syncError.message);
    }

    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products', error: error.message });
  }
});

// GET single product
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching product', error: error.message });
  }
});

// POST create product
router.post('/', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: 'Image is required' });

    const product = new Product({
      name:        req.body.name,
      image:       req.file.filename,
    });

    const saved = await product.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(400).json({ message: 'Error creating product', error: error.message });
  }
});

// PUT update product
router.put('/:id', upload.single('image'), async (req, res) => {
  try {
    const updateData = {
      name:        req.body.name,
    };

    if (req.file) updateData.image = req.file.filename;

    const product = await Product.findByIdAndUpdate(
      req.params.id, updateData, { new: true, runValidators: true }
    );

    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (error) {
    res.status(400).json({ message: 'Error updating product', error: error.message });
  }
});

// DELETE product
router.delete('/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting product', error: error.message });
  }
});

export default router;