import express, { Request, Response, NextFunction } from 'express';
import { body, validationResult } from 'express-validator';

const app = express();
const PORT = 3000;

// Middleware untuk parsing body dari request
app.use(express.json());

// Endpoint untuk validasi input
app.post(
  '/api/user',
  [
    body('name').isString().notEmpty(),
    body('email').isEmail(),
    body('password').isLength({ min: 6 }),
  ],
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // Jika validasi sukses, lanjutkan ke proses selanjutnya
    next();
  }
);

// Endpoint untuk menambahkan user
app.post('/api/user', (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  // Simulasikan proses penyimpanan user
  // Misalnya, menyimpan ke database
  res.status(201).json({ message: 'User created successfully', name, email });
});

// Middleware untuk menangani kesalahan
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
