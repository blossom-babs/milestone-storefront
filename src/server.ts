import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import { MythicalWeaponStore } from "./models/mythical_weapon";
import { Weapon } from './models/mythical_weapon';





const app: express.Application = express();
const address: string = "0.0.0.0:3000";

app.use(bodyParser.json());

const mythicalWeapon = new MythicalWeaponStore();

app.get("/", async function (req: Request, res: Response) {
 const weapon: Weapon = {
     id: 2,
     name: 'Sword',
     type: 'Doubled Edged',
     weight: 50
 }
 const mythicalWeapon = new MythicalWeaponStore();
 const result = await  mythicalWeapon.create(weapon)
  res.send(result);
  
});


app.listen(3000, function () {
  console.log(`starting app on: ${address}`);
});
