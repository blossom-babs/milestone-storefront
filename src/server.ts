import { BookStore, Book } from './models/books';
import express, { Request, Response } from "express";
import bodyParser from "body-parser";

const app: express.Application = express();
const address: string = "0.0.0.0:3000";

app.use(bodyParser.json());


app.get("/", async function (req: Request, res: Response) {
  try {
    const allBooks = new BookStore()
    const result = await allBooks.index()
    res.status(200).json(result)
  } catch (error) {
    throw new Error(`Could not retrieve books: ${error}`)
  }
});

app.get('/:id', async (req: Request, res: Response) => {
  try {
    const id = req.params.id
    const book = new BookStore()
    const result = await book.show(id)
    if (result === undefined) {
      res.status(200).json({ Message: `Book with id ${id} cannot be found.` })
      return;
    } else {
      res.status(200).json(result)
      return;
    }
    // WHAT HAPPENS IF THE ID is valid but it doesn't exist ✅
  } catch (error) {
    throw new Error(`Could not retrieve book: ${error}`)

  }
})

app.delete('/:id', async (req: Request, res: Response) => {
  try {
    const id = req.params.id
    const removeBook = new BookStore()
    const result = await removeBook.delete(id)
    // what if id is valid but not available in the db
    res.status(200).json(result)
  } catch (error) {
    throw new Error(`Could not retrieve book: ${error}`)
  }
})

app.post("/", async (req: Request, res: Response) => {
  const book: Book = req.body
  try {
    const addBook = new BookStore()
    const result = await addBook.create(book)
    res.status(200).json(result)
  } catch (error) {
    res.send(404).json({ Message: `Unable to save book ${book.title}` })
  }
})

app.put('/:id', async (req: Request, res: Response) => {
  try {
    const book  = req.body
    console.log(book)
    const id = req.params.id
    const editBook = new BookStore()
    const result = await editBook.update(id, book)
    res.status(400).json(result)
  } catch (error) {
    res.status(400).json({ message: `${error}` })
  }
})

app.listen(3000, function () {
  console.log(`starting app on: ${address}`);
});
