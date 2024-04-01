import express, { Request, Response } from 'express';
import { Pool } from 'pg';

const app = express();
const port = 3000;


const pool = new Pool({
  user: 'username',
  host: 'localhost',
  database: 'nama_database',
  password: 'password_database',
  port: 5432,
});


app.get('/data', async (req: Request, res: Response) => {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM nama_tabel');
    client.release();

    res.json(result.rows);
  } catch (err) {
    console.error('Error executing query', err);
    res.status(500).json({ message: 'Error executing query' });
  }
});


app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});
