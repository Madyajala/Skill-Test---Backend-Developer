import { Request, Response } from 'express';
import Model from './model';

class Controller {
    public static async home(req: Request, res: Response): Promise<void> {
        try {
            let data = await Model.listShoes();
            res.render('home', { data });
        } catch (error) {
            console.log(error);
            res.send(error);
        }
    }

    public static async add(req: Request, res: Response): Promise<void> {
        try {
            const { name, categoryId, minSize, maxSize, status } = req.body;
            await Model.addShoes(name, categoryId, minSize, maxSize, status);
            res.redirect('/');
        } catch (error) {
            console.log(error);
            res.send(error);
        }
    }

    public static async handlerAdd(req: Request, res: Response): Promise<void> {
        try {
            const { name, categoryId, minSize, maxSize, status } = req.body;
            await Model.addShoes(name, categoryId, minSize, maxSize, status);
            res.redirect('/');
        } catch (error) {
            console.log(error);
            res.send(error);
        }
    }

    public static async handlerEditAvai(req: Request, res: Response): Promise<void> {
        try {
            const id = +req.params.id;
            await Model.editShoesAvai(id);
            res.redirect('/');
        } catch (error) {
            console.log(error);
            res.send(error);
        }
    }

    public static async handlerEditDis(req: Request, res: Response): Promise<void> {
        try {
            const id = +req.params.id;
            await Model.editShoesDis(id);
            res.redirect('/');
        } catch (error) {
            console.log(error);
            res.send(error);
        }
    }

    public static async delete(req: Request, res: Response): Promise<void> {
        try {
            const id = +req.params.id;
            await Model.deleteShoes(id);
            res.redirect('/');
        } catch (error) {
            console.log(error);
            res.send(error);
        }
    }
}

export default Controller;
