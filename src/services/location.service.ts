import {
  ResponseModelWithData,
  ResponseModelOnlyMessage,
  ResponseWhenError,
} from "../constant/response_model";
import dotenv from "dotenv";
import { prisma } from "../database/db";
import { LocationForm } from "../dto/location.dto";

dotenv.config();

export class LocationService {
  public async createLocation(
    createForm: LocationForm
  ): Promise<[ResponseModelWithData, ResponseWhenError]> {
    let responseModelWithData = {} as ResponseModelWithData;
    let responseWhenError = {} as ResponseWhenError;

    try {
      await prisma.location
        .create({
          data: {
            location: createForm.location,
          },
        })
        .then((data) => {
          responseModelWithData = {
            status: 201,
            data: data,
            message: "Successfully Create A Location",
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

  public async getAllLocation(): Promise<
    [ResponseModelWithData, ResponseWhenError]
  > {
    let responseModelWithData = {} as ResponseModelWithData;
    let responseWhenError = {} as ResponseWhenError;

    try {
      await prisma.location
        .findMany({
          orderBy: {
            id: "desc",
          },
        })
        .then((data) => {
          responseModelWithData = {
            status: 201,
            data: data,
            message: "Successfully Get All Location Datas",
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

  public async getSingleLocation(
    id: number
  ): Promise<[ResponseModelWithData, ResponseWhenError]> {
    let responseModelWithData = {} as ResponseModelWithData;
    let responseWhenError = {} as ResponseWhenError;

    try {
      await prisma.location
        .findFirst({
          where: {
            id: Number(id),
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

  public async updateLocation(
    updateForm: LocationForm,
    id: number
  ): Promise<[ResponseModelWithData, ResponseWhenError]> {
    let responseModelWithData = {} as ResponseModelWithData;
    let responseWhenError = {} as ResponseWhenError;

    try {
      await prisma.location
        .update({
          where: {
            id: Number(id),
          },
          data: {
            location: updateForm.location,
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

  public async deleteLocation(
    id: Number
  ): Promise<[ResponseModelOnlyMessage, ResponseWhenError]> {
    let responseModelOnlyMessage = {} as ResponseModelOnlyMessage;
    let responseWhenError = {} as ResponseWhenError;

    try {
      await prisma.location
        .delete({
          where: {
            id: Number(id),
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
