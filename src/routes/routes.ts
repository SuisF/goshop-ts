import { Express, Request, Response } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import AuthRoutes from "./auth.routes";
import KurirServiceRoutes from "./kurir_service.routes";
import LocationRoutes from "./location.routes";
import KomplainRoutes from "./komplain.routes";

export default function Routes(app: Express) {
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(cors());
  app.use(bodyParser.json());

  app.get("/", (req: Request, res: Response) => {
    res.status(200).json({
      message: "Connected",
    });
  });

  AuthRoutes(app);
  KurirServiceRoutes(app);
  LocationRoutes(app);
  KomplainRoutes(app);
}
