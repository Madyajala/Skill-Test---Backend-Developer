import express, { Request, Response } from 'express';
import authMiddleware from './middlewares';
import jwt from 'jsonwebtoken';

const app = express();

app.use(express.json());

app.get('/protected-route', authMiddleware, (req: Request, res: Response) => {
  const userId = (req as any).userId;
  res.json({ message: `Protected route accessed by user ${userId}` });
});


app.post('/login', (req: Request, res: Response) => {
  const { username, password } = req.body;

 
  if (username === 'user' && password === 'password') {
    const token = jwt.sign({ userId: '123456' }, 'your_secret_key_here', { expiresIn: '1h' });
    return res.json({ token });
  } else {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
});


const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
