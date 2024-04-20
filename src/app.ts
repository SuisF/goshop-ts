import express, { Express } from "express";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";
import cors from "cors";
import bodyParser from "body-parser";
import Routes from "./routes/routes";

export const app: Express = express();
const port = process.env.PORT || 8001;
dotenv.config();
const prisma = new PrismaClient();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

Routes(app);

app.listen(port, async () => {
  console.log("Initializing Prisma");
  prisma
    .$connect()
    .then(() => {
      console.log("Database Is Connected Through Prisma");
      console.log(`Server Is Running At Port ${port}`);
    })
    .catch((err) => {
      console.log("Failed To Connect To DB");
      console.log(`Prisma Error => ${err}`);
      process.exit(1);
    });
});
