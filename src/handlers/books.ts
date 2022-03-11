import { Request, Response, Application } from 'express';
import { BookStore, Book } from '../models/books';

const bookStore = new BookStore();

const create = async (req: Request, res: Response) => {
  try {
    const book: Book = req.body;
    const result = await bookStore.create(book);
    res.status(200).json(result);
  } catch (error) {
    res.send(404).json({ Message: `Unable to save book ${req.body.title}` });
  }
};

const index = async (req: Request, res: Response) => {
  try {
    const result = await bookStore.index();
    res.status(200).json(result);
  } catch (error) {
    res
      .status(200)
      .json({ message: `Could not fetch books with error ${error}` });
  }
};

const show = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await bookStore.show(id);
    if (result === undefined) {
      res.status(200).json({ Message: `Book with id ${id} cannot be found.` });
      return;
    }
    res.status(200).json(result);
  } catch (error) {
    res
      .status(200)
      .json({ message: `Could not fetch book with id ${req.params.id}` });
  }
};

const update = async (req: Request, res: Response) => {
  try {
    const book = req.body;
    const { id } = req.params;
    const result = await bookStore.update(id, book);
    res.status(400).json(result);
  } catch (error) {
    res
      .status(200)
      .json({ message: `Could not update book: ${req.body.title}` });
  }
};

const destroy = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await bookStore.delete(id);
    res.status(200).json(result);
  } catch (error) {
    throw new Error(`Could not retrieve book: ${error}`);
  }
};

const BookRoutes = (app: Application) => {
  app.post('/books', create);
  app.get('/books', index);
  app.get('/books/:id', show);
  app.put('/books/:id', update);
  app.delete('/books/:id', destroy);
};

export default BookRoutes;
