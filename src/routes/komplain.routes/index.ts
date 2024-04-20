import { Express } from "express";
import { KomplainController } from "../../controller/komplain.controller";
import { MiddlewareAuth } from "../../middleware/auth";

export default function KomplainRoutes(app: Express) {
  const komplainController = new KomplainController();
  const middlewareJwt = new MiddlewareAuth();

  app.post(
    `/v1/create_komplain`,
    middlewareJwt.authenticationToken,
    komplainController.createKomplain
  );
}
