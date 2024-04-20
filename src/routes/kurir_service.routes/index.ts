import { Express } from "express";
import { KurirServiceController } from "../../controller/kurir_service.controller";
import { MiddlewareAuth } from "../../middleware/auth";

export default function KurirServiceRoutes(app: Express) {
  const kurirServiceController = new KurirServiceController();
  const middlewareJwt = new MiddlewareAuth();

  app.post(
    `/v1/create_kurir_service`,
    middlewareJwt.authenticationToken,
    kurirServiceController.createKurirService
  );
  app.get(
    `/v1/get_kurir_service`,
    middlewareJwt.authenticationToken,
    kurirServiceController.getAllKurirService
  );
  app.get(
    `/v1/get_single_kurir_service/:id`,
    middlewareJwt.authenticationToken,
    kurirServiceController.getSingleKurirService
  );
  app.put(
    `/v1/update_kurir_service/:id`,
    middlewareJwt.authenticationToken,
    kurirServiceController.updateKurirService
  );
  app.delete(
    `/v1/delete_kurir_service/:id`,
    middlewareJwt.authenticationToken,
    kurirServiceController.deleteKurirService
  );
}
