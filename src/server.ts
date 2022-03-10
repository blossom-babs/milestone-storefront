import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import Client from "./database";


const app: express.Application = express();
const address: string = "0.0.0.0:3000";

app.use(bodyParser.json());


app.get("/", async function (req: Request, res: Response) {
console.log('client connection from server', Client)
});

app.post("/", async (req: Request, res: Response) => {

})


app.listen(3000, function () {
  console.log(`starting app on: ${address}`);
});
