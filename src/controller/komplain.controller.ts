import { Request, Response } from "express";
import Joi from "joi";
import { KomplainForm } from "../dto/komplain.dto";
import { KomplainService } from "../services/komplain.service";

export class KomplainController {
  public async createKomplain(req: Request, res: Response) {
    const reqForm: KomplainForm = {
      ...req.body,
    };
    const komplainService = new KomplainService();

    const schema = Joi.object().keys({
      user_id: Joi.number().required().messages({
        "any.required": "user_id cannot be empty",
      }),
      product_id: Joi.number().required().messages({
        "any.required": "product_id cannot be empty",
      }),
      message: Joi.string().required().messages({
        "any.required": "message cannot be empty",
      }),
    });

    const { error, value } = schema.validate(reqForm);

    if (error != undefined) {
      return res.status(400).json({
        status: 400,
        message: error?.details.map((e) => e.message).join(","),
        error: true,
      });
    } else {
      const [success, error] = await komplainService.createKomplain(reqForm);
      if (error.error) {
        return res.status(error.status).json(error);
      } else {
        return res.status(success.status).json(success);
      }
    }
  }
}
