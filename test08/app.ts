import express, { Application } from 'express';
import Controller from './controller';

const app: Application = express();
const port: number = 3000;

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));

app.get('/', Controller.home);
app.get('/shoes/add', Controller.add);
app.post('/shoes/add', Controller.handlerAdd);
app.get('/shoes/status/:id/available', Controller.handlerEditAvai);
app.get('/shoes/status/:id/discontinue', Controller.handlerEditDis);
app.get('/shoes/delete/:id', Controller.delete);

app.listen(port, () => {
  console.log(`Surya sebatang Rp. ${port}`);
});
