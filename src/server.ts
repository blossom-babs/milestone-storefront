import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import { BooksTable, Book } from "./models/books";

const app: express.Application = express();
const address: string = "0.0.0.0:3000";

app.use(bodyParser.json());


app.get("/", async function (req: Request, res: Response) {
  try {    
    const getAllBooks = new BooksTable()
    const result =  getAllBooks.index()
    res.status(200).json(result)
  } catch (error) {
    throw new Error(`could not fetch book ${error}`)
  }

});


app.listen(3000, function () {
  console.log(`starting app on: ${address}`);
});
