import e, { Request, Response } from "express";
import { KurirUserForm, UserForm } from "../dto/auth.dto";
import { AuthService } from "../services/auth.service";
import Joi from "joi";
import bcrypt from "bcrypt";

export class AuthController {
  // User Controller
  public async signUp(req: Request, res: Response) {
    const signUpData: UserForm = req.body;
    const authService = new AuthService();

    const schema = Joi.object()
      .keys({
        username: Joi.string().min(6).required().messages({
          "string.min": "Username must be atleast 6 characters",
          "any.required": "username cannot be empty",
        }),
        nama: Joi.string().required().messages({
          "any.required": "Nama cannot be empty",
        }),
        password: Joi.string().min(6).required().messages({
          "string.min": "Password must be atleast 6 characters",
          "any.required": "Password cannot be empty",
        }),
      })
      .unknown(true);

    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(signUpData.password, salt);

    const { error, value } = schema.validate(req.body);

    if (error != undefined) {
      return res.status(400).json({
        status: 400,
        message: error?.details.map((e) => e.message).join(","),
        error: true,
      });
    } else {
      const [success, error] = await authService.signUp(signUpData, hash);
      if (error.error) {
        return res.status(error.status).json(error);
      } else {
        res.status(success.status).json(success);
      }
    }
  }

  public async signIn(req: Request, res: Response) {
    const authService = new AuthService();
    const reqForm: UserForm = {
      ...req.body,
    };

    const schema = Joi.object()
      .keys({
        username: Joi.string().min(6).required().messages({
          "string.min": "Username must be atleast 6 characters",
          "any.required": "Username cannot be empty",
        }),
        password: Joi.string().min(6).required().messages({
          "string.min": "Password must be atleast 6 characters",
          "any.required": `Password cannot be empty`,
        }),
      })
      .unknown(true);

    const { error, value } = schema.validate(req.body);
    if (error != undefined) {
      return res.status(400).json({
        status: 400,
        message: error?.details.map((e) => e.message).join(","),
        error: true,
      });
    } else {
      const [success, error] = await authService.signIn(reqForm);
      if (error.error) {
        return res.status(error.status).json(error);
      } else {
        res.status(success.status).json(success);
      }
    }
  }
  // End Of User Controller

  // Kurir Controller
  public async kurirSignUp(req: Request, res: Response) {
    const kurirSignUpData: KurirUserForm = req.body;
    const authService = new AuthService();

    const schema = Joi.object()
      .keys({
        nama: Joi.string().required().messages({
          "any.required": "Nama cannot be empty",
        }),
        username: Joi.string().min(6).required().messages({
          "string.min": "Username must be atleast 6 characters",
          "any.required": "Username cannot be empty",
        }),
        password: Joi.string().min(6).required().messages({
          "string.min": "Password must be atleast 6 characters",
          "any.required": "Password cannot be empty",
        }),
        kurir_service_id: Joi.number().required().messages({
          "any.required": "kurir_service_id cannot be empty",
        }),
        location_id: Joi.number().required().messages({
          "any.required": "location_id cannot be empty",
        }),
      })
      .unknown(true);

    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(kurirSignUpData.password, salt);

    const { error, value } = schema.validate(req.body);

    if (error != undefined) {
      return res.status(400).json({
        status: 400,
        message: error?.details.map((e) => e.message).join(","),
        error: true,
      });
    } else {
      const [success, error] = await authService.kurirSignUp(
        kurirSignUpData,
        hash
      );
      if (error.error) {
        return res.status(error.status).json(error);
      } else {
        res.status(success.status).json(success);
      }
    }
  }

  public async kurirSignIn(req: Request, res: Response) {
    const authService = new AuthService();
    const reqForm: KurirUserForm = {
      ...req.body,
    };

    const schema = Joi.object()
      .keys({
        username: Joi.string().min(6).required().messages({
          "string.min": "Username must be atleast 6 characters",
          "any.required": "Username cannot be empty",
        }),
        password: Joi.string().min(6).required().messages({
          "string.min": "Password must be atleast 6 characters",
          "any.required": "Password cannot be empty",
        }),
      })
      .unknown(true);

    const { error, value } = schema.validate(req.body);
    if (error != undefined) {
      return res.status(400).json({
        status: 400,
        message: error?.details.map((e) => e.message).join(","),
        error: true,
      });
    } else {
      const [success, error] = await authService.kurirSignIn(reqForm);
      if (error.error) {
        return res.status(error.status).json(error);
      } else {
        res.status(success.status).json(success);
      }
    }
  }

  // End Of Kurir Controller
}
