// @ts-ignore ignored import error 
import express, { Request, Response} from "npm:express@4.18.2";
import mongoose from "npm:mongoose@7.6.3";

import { getAll } from "./resolvers/getAll.ts";
// import {getInfoById} from "./resolvers/getInfoById.ts";
import { postCharacter } from "./resolvers/postCharacter.ts";
// import { updateCharacter } from "./resolvers/updateCharacter.ts";
// import { deleteCharacter } from "./resolvers/deleteCharacter.ts";

// IMPORTAR VARIABLES DE ENTORNO DEL ARCHIVO .ENV
import { load } from "https://deno.land/std@0.204.0/dotenv/mod.ts";
const env = await load();

// BUSCA EN EL ARCHIVO .ENV, O SI NO LO HAY BUSCO EN EL S.O. LAS VARIABLES DE ENTORNO
const MONGO_URL = env.MONGO_URL || Deno.env.get("MONGO_URL");
const PORT = env.PORT;

// SI NINGUNA DE LAS 2 EXISTE => ERROR.
if (!MONGO_URL) {
  console.log("You need to define MONGO_URL env");
  Deno.exit(1);
}

// CONEXIÓN A MONGO 
try{
await mongoose.connect(MONGO_URL);
console.info("Mongo connected")
}
catch(e){
  console.log(e);
}

// API 
const app = express();
// PARA PODER HACER (REQUEST.BODY)
app.use(express.json());

// ENDPOINTS
app
.get("/test", (req: Request, res : Response) => res.send("Working!"))
.get("/api/tierramedia/personajes", getAll)
// .get("/api/tierramedia/personajes/:id", getInfoById)
.post("/api/tierramedia/personajes", postCharacter)
// .put("/api/tierramedia/personajes/:id", updateCharacter)
// .delete("/api/tierramedia/personajes/:id", deleteCharacter)

app.listen(PORT);
console.log("Listening in port 3000.");



