import { Request, Response } from "express";
import Joi from "joi";
import { LocationService } from "../services/location.service";
import { LocationForm } from "../dto/location.dto";

export class LocationController {
  public async createLocation(req: Request, res: Response) {
    const locationService = new LocationService();
    const reqForm: LocationForm = {
      ...req.body,
    };

    const schema = Joi.object()
      .keys({
        location: Joi.string().required().messages({
          "any.required": "location cannot be empty",
        }),
      })
      .unknown(true);

    const { error, value } = schema.validate(reqForm);
    if (error != undefined) {
      return res.status(400).json({
        status: 400,
        message: error?.details.map((e) => e.message).join(","),
        error: true,
      });
    } else {
      const [success, error] = await locationService.createLocation(reqForm);
      if (error.error) {
        return res.status(error.status).json(error);
      } else {
        return res.status(success.status).json(success);
      }
    }
  }

  public async getAllLocation(req: Request, res: Response) {
    const locationService = new LocationService();
    const [success, error] = await locationService.getAllLocation();

    if (error.error) {
      return res.status(error.status).json(error);
    } else {
      return res.status(success.status).json(success);
    }
  }

  public async getSingleLocation(req: Request, res: Response) {
    const { id } = req.params;
    const locationService = new LocationService();

    const [success, error] = await locationService.getSingleLocation(
      Number(id)
    );

    if (error.error) {
      return res.status(error.status).json(error);
    } else {
      return res.status(success.status).json(success);
    }
  }

  public async updateKurirService(req: Request, res: Response) {
    const updateForm: LocationForm = {
      ...req.body,
    };
    const { id } = req.params;
    const locationService = new LocationService();

    const schema = Joi.object()
      .keys({
        location: Joi.string().required().messages({
          "any.required": "location cannot be empty",
        }),
      })
      .unknown(true);

    const { error, value } = schema.validate(updateForm);
    if (error != undefined) {
      return res.status(400).json({
        status: 400,
        message: error?.details.map((e) => e.message).join(","),
        error: true,
      });
    } else {
      const [success, error] = await locationService.updateLocation(
        updateForm,
        Number(id)
      );
      if (error.error) {
        return res.status(error.status).json(error);
      } else {
        return res.status(success.status).json(success);
      }
    }
  }

  public async deleteLocation(req: Request, res: Response) {
    const { id } = req.params;
    const locationService = new LocationService();

    const [success, error] = await locationService.deleteLocation(Number(id));

    if (error.error) {
      return res.status(error.status).json(error);
    } else {
      return res.status(success.status).json(success);
    }
  }
}
