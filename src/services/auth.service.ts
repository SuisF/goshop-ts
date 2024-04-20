import {
  ResponseModelOnlyMessage,
  ResponseWhenError,
  ResponseModelWithToken,
  ResponseModelWithData,
} from "../constant/response_model";
import { prisma } from "../database/db";
import { KurirUserForm, UserForm } from "../dto/auth.dto";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export class AuthService {
  // User Auth
  public async signUp(
    userForm: UserForm,
    hash: string
  ): Promise<[ResponseModelOnlyMessage, ResponseWhenError]> {
    let responseModelOnlyMessage = {} as ResponseModelOnlyMessage;
    let responseWhenError = {} as ResponseWhenError;

    try {
      const checkExistingUsers = await prisma.users.findUnique({
        where: {
          username: userForm.username,
        },
      });

      if (checkExistingUsers) {
        responseWhenError = {
          status: 400,
          message: "Username Already Exist",
          error: true,
        };
      } else {
        await prisma.users
          .create({
            data: {
              username: userForm.username,
              nama: userForm.nama,
              password: hash,
            },
          })
          .then(() => {
            responseModelOnlyMessage = {
              status: 201,
              message: "Successfully Create An Account",
              error: false,
            };
          })
          .catch((err) => {
            responseWhenError = {
              status: 400,
              message: `${err}`,
              error: true,
            };
          });
      }
    } catch (err) {
      responseWhenError = {
        status: 500,
        message: `Something Went Wrong ${err}`,
        error: true,
      };
    }

    return [responseModelOnlyMessage, responseWhenError];
  }

  public async signIn(
    userForm: UserForm
  ): Promise<[ResponseModelWithToken, ResponseWhenError]> {
    let responseModelWithToken = {} as ResponseModelWithToken;
    let responseWhenError = {} as ResponseWhenError;

    try {
      let checkExistingUsers = await prisma.users.findFirst({
        where: {
          username: userForm.username,
        },
      });

      if (checkExistingUsers === null) {
        responseWhenError = {
          status: 404,
          message: `User Can't Be Found`,
          error: true,
        };
      } else {
        const resultBcrypt = bcrypt.compareSync(
          userForm.password,
          checkExistingUsers.password
        );
        if (resultBcrypt) {
          const token = jwt.sign(
            {
              data: {
                id: checkExistingUsers.id,
                username: checkExistingUsers.username,
                nama: checkExistingUsers.nama,
                password: checkExistingUsers.password,
              },
            },
            `${process.env.JWT_TOKEN_SECRET}`,
            { expiresIn: "1 day" }
          );
          responseModelWithToken = {
            status: 200,
            token: token,
            message: "Successfully Sign In",
            error: false,
          };
        } else {
          responseWhenError = {
            status: 400,
            message: "Username or Password Is Incorrect",
            error: true,
          };
        }
      }
    } catch (error) {
      responseWhenError = {
        status: 500,
        message: `Something Went Wrong -> ${error}`,
        error: true,
      };
    }

    return [responseModelWithToken, responseWhenError];
  }

  // End Of User Auth

  // Kurir Auth

  public async kurirSignUp(
    kurirForm: KurirUserForm,
    hash: string
  ): Promise<[ResponseModelOnlyMessage, ResponseWhenError]> {
    let responseModelOnlyMessage = {} as ResponseModelOnlyMessage;
    let responseWhenError = {} as ResponseWhenError;

    try {
      const checkExistingUsers = await prisma.users_kurir.findUnique({
        where: {
          username: kurirForm.username,
        },
      });

      if (checkExistingUsers) {
        responseWhenError = {
          status: 400,
          message: "Username Already Exist",
          error: true,
        };
      } else {
        await prisma.users_kurir
          .create({
            data: {
              nama: kurirForm.nama,
              username: kurirForm.username,
              password: hash,
              kurir_service_id: Number(kurirForm.kurir_service_id),
              location_id: Number(kurirForm.location_id),
              created_at: new Date(),
            },
          })
          .then(() => {
            responseModelOnlyMessage = {
              status: 201,
              message: "Successfully Create A Kurir Account",
              error: false,
            };
          })
          .catch((err) => {
            responseWhenError = {
              status: 400,
              message: `${err}`,
              error: true,
            };
          });
      }
    } catch (error) {
      responseWhenError = {
        status: 500,
        message: `Something Went Wrong -> ${error}`,
        error: true,
      };
    }

    return [responseModelOnlyMessage, responseWhenError];
  }

  public async kurirSignIn(
    kurirForm: KurirUserForm
  ): Promise<[ResponseModelWithToken, ResponseWhenError]> {
    let responseModelWithToken = {} as ResponseModelWithToken;
    let responseWhenError = {} as ResponseWhenError;

    try {
      let checkExistingUsers = await prisma.users_kurir.findFirst({
        where: {
          username: kurirForm.username,
        },
      });

      if (checkExistingUsers === null) {
        responseWhenError = {
          status: 404,
          message: `Kurir User Can't Be Found`,
          error: true,
        };
      } else {
        const resultBcrypt = bcrypt.compareSync(
          kurirForm.password,
          checkExistingUsers.password
        );
        if (resultBcrypt) {
          const token = jwt.sign(
            {
              data: {
                id: checkExistingUsers.id,
                nama: checkExistingUsers.nama,
                username: checkExistingUsers.username,
                password: checkExistingUsers.password,
                kurir_service_id: checkExistingUsers.kurir_service_id,
                location_id: checkExistingUsers.location_id,
              },
            },
            `${process.env.JWT_TOKEN_SECRET}`,
            { expiresIn: "1 day" }
          );
          responseModelWithToken = {
            status: 200,
            token: token,
            message: "Successfully Sign In As Kurir",
            error: false,
          };
        } else {
          responseWhenError = {
            status: 400,
            message: "Username or Password Is Incorrect",
            error: true,
          };
        }
      }
    } catch (error) {
      responseWhenError = {
        status: 500,
        message: `Something Went Wrong -> ${error}`,
        error: true,
      };
    }

    return [responseModelWithToken, responseWhenError];
  }

  // End Of Kurir Auth
}
