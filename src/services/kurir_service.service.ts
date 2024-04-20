import {
  ResponseModelWithData,
  ResponseModelOnlyMessage,
  ResponseWhenError,
} from "../constant/response_model";
import dotenv from "dotenv";
import { KurirServiceForm } from "../dto/kurir_service.dto";
import { prisma } from "../database/db";

dotenv.config();

export class KurirServiceService {
  public async createKurirService(
    createForm: KurirServiceForm
  ): Promise<[ResponseModelWithData, ResponseWhenError]> {
    let responseModelWithData = {} as ResponseModelWithData;
    let responseWhenError = {} as ResponseWhenError;

    try {
      await prisma.kurir_service
        .create({
          data: {
            jenis_layanan: createForm.jenis_layanan,
            status: 0,
          },
        })
        .then((data) => {
          responseModelWithData = {
            status: 201,
            data: data,
            message: "Successfully Create A Kurir Service",
            error: false,
          };
        })
        .catch((error) => {
          responseWhenError = {
            status: 400,
            message: `${error}`,
            error: true,
          };
        });
    } catch (error) {
      responseWhenError = {
        status: 500,
        message: `Something Went Wrong -> ${error}`,
        error: true,
      };
    }

    return [responseModelWithData, responseWhenError];
  }

  public async getAllKurirService(): Promise<
    [ResponseModelWithData, ResponseWhenError]
  > {
    let responseModelWithData = {} as ResponseModelWithData;
    let responseWhenError = {} as ResponseWhenError;

    try {
      await prisma.kurir_service
        .findMany({
          orderBy: {
            kurir_service_id: "desc",
          },
        })
        .then((data) => {
          responseModelWithData = {
            status: 201,
            data: data,
            message: "Successfully Get All Kurir Service Datas",
            error: false,
          };
        })
        .catch((error) => {
          responseWhenError = {
            status: 400,
            message: `${error}`,
            error: true,
          };
        });
    } catch (error) {
      responseWhenError = {
        status: 500,
        message: `Something Went Wrong -> ${error}`,
        error: true,
      };
    }

    return [responseModelWithData, responseWhenError];
  }

  public async getSingleKurirService(
    id: number
  ): Promise<[ResponseModelWithData, ResponseWhenError]> {
    let responseModelWithData = {} as ResponseModelWithData;
    let responseWhenError = {} as ResponseWhenError;

    try {
      await prisma.kurir_service
        .findFirst({
          where: {
            kurir_service_id: Number(id),
          },
        })
        .then((data) => {
          responseModelWithData = {
            status: 200,
            data: data,
            message: `Successfully Get This Data With ID: ${id}`,
            error: false,
          };
        })
        .catch((error) => {
          responseWhenError = {
            status: 400,
            message: `${error}`,
            error: true,
          };
        });
    } catch (error) {
      responseWhenError = {
        status: 500,
        message: `Something Went Wrong -> ${error}`,
        error: true,
      };
    }

    return [responseModelWithData, responseWhenError];
  }

  public async updateKurirService(
    updateForm: KurirServiceForm,
    id: number
  ): Promise<[ResponseModelWithData, ResponseWhenError]> {
    let responseModelWithData = {} as ResponseModelWithData;
    let responseWhenError = {} as ResponseWhenError;

    try {
      await prisma.kurir_service
        .update({
          where: {
            kurir_service_id: Number(id),
          },
          data: {
            jenis_layanan: updateForm.jenis_layanan,
            status: Number(updateForm.status),
          },
        })
        .then((data) => {
          responseModelWithData = {
            status: 200,
            data: data,
            message: `Successfully Update This Data With ID: ${id}`,
            error: false,
          };
        })
        .catch((error) => {
          responseWhenError = {
            status: 400,
            message: `${error}`,
            error: true,
          };
        });
    } catch (error) {
      responseWhenError = {
        status: 500,
        message: `Something Went Wrong -> ${error}`,
        error: true,
      };
    }

    return [responseModelWithData, responseWhenError];
  }

  public async deleteKurirService(
    id: Number
  ): Promise<[ResponseModelOnlyMessage, ResponseWhenError]> {
    let responseModelOnlyMessage = {} as ResponseModelOnlyMessage;
    let responseWhenError = {} as ResponseWhenError;

    try {
      await prisma.kurir_service
        .delete({
          where: {
            kurir_service_id: Number(id),
          },
        })
        .then(() => {
          responseModelOnlyMessage = {
            status: 200,
            message: `Successfully Delete This Data With ID: ${id}`,
            error: false,
          };
        })
        .catch((error) => {
          responseWhenError = {
            status: 400,
            message: `${error}`,
            error: true,
          };
        });
    } catch (error) {
      responseWhenError = {
        status: 500,
        message: `Something Went Wrong -> ${error}`,
        error: true,
      };
    }

    return [responseModelOnlyMessage, responseWhenError];
  }
}
