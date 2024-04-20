import { Request, Response } from "express";
import { KurirServiceService } from "../services/kurir_service.service";
import { KurirServiceForm } from "../dto/kurir_service.dto";
import Joi from "joi";

export class KurirServiceController {
  public async createKurirService(req: Request, res: Response) {
    const kurirServiceService = new KurirServiceService();
    const reqForm: KurirServiceForm = {
      ...req.body,
    };

    const schema = Joi.object()
      .keys({
        jenis_layanan: Joi.string().required().messages({
          "any.required": "jenis_layanan cannot be empty",
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
      const [success, error] = await kurirServiceService.createKurirService(
        reqForm
      );
      if (error.error) {
        return res.status(error.status).json(error);
      } else {
        return res.status(success.status).json(success);
      }
    }
  }

  public async getAllKurirService(req: Request, res: Response) {
    const kurirServiceService = new KurirServiceService();
    const [success, error] = await kurirServiceService.getAllKurirService();

    if (error.error) {
      return res.status(error.status).json(error);
    } else {
      return res.status(success.status).json(success);
    }
  }

  public async getSingleKurirService(req: Request, res: Response) {
    const { id } = req.params;
    const kurirServiceService = new KurirServiceService();

    const [success, error] = await kurirServiceService.getSingleKurirService(Number(id));

    if(error.error) {
      return res.status(error.status).json(error);
    } else {
      return res.status(success.status).json(success);
    }
  }

  public async updateKurirService(req: Request, res: Response) {
    const updateForm: KurirServiceForm = {
      ...req.body,
    };
    const { id } = req.params;
    const kurirServiceService = new KurirServiceService();

    const schema = Joi.object()
      .keys({
        jenis_layanan: Joi.string().required().messages({
          "any.required": "jenis_layanan cannot be empty",
        }),
        status: Joi.number().required().messages({
          "any.required": "status cannot be empty",
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
      const [success, error] = await kurirServiceService.updateKurirService(
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

  public async deleteKurirService(req: Request, res: Response) {
    const { id } = req.params;
    const kurirServiceService = new KurirServiceService();

    const [success, error] = await kurirServiceService.deleteKurirService(Number(id));

    if (error.error) {
      return res.status(error.status).json(error);
    } else {
      return res.status(success.status).json(success);
    }
  }
}
