import { Express } from "express";
import { LocationController } from "../../controller/location.controller";
import { MiddlewareAuth } from "../../middleware/auth";

export default function LocationRoutes(app: Express) {
  const locationController = new LocationController();
  const middlewareJwt = new MiddlewareAuth();

  app.post(
    `/v1/create_location`,
    middlewareJwt.authenticationToken,
    locationController.createLocation
  );
  app.get(
    `/v1/get_location`,
    middlewareJwt.authenticationToken,
    locationController.getAllLocation
  );
  app.get(
    `/v1/get_single_location/:id`,
    middlewareJwt.authenticationToken,
    locationController.getSingleLocation
  );
  app.put(
    `/v1/update_location/:id`,
    middlewareJwt.authenticationToken,
    locationController.updateKurirService
  );
  app.delete(
    `/v1/delete_location/:id`,
    middlewareJwt.authenticationToken,
    locationController.deleteLocation
  );
}
