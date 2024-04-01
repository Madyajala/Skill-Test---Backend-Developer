import express, { Request, Response } from 'express';
import multer from 'multer';
import path from 'path';

const app = express();
const PORT = 3000;

// Konfigurasi Multer untuk menyimpan file
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads'); // Folder penyimpanan file
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

// Middleware untuk menangani permintaan upload file
app.post('/upload', upload.single('file'), (req: Request, res: Response) => {
  if (!req.file) {
    return res.status(400).send('No files were uploaded.');
  }
  res.send('File uploaded successfully.');
});

// Middleware untuk menampilkan form upload
app.get('/', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Mulai server
app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
