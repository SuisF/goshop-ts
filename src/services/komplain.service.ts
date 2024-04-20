import {
  ResponseModelWithData,
  ResponseModelOnlyMessage,
  ResponseWhenError,
} from "../constant/response_model";
import dotenv from "dotenv";
import { prisma } from "../database/db";
import { KomplainForm } from "../dto/komplain.dto";

dotenv.config();

export class KomplainService {
  public async createKomplain(
    komplainForm: KomplainForm
  ): Promise<[ResponseModelWithData, ResponseWhenError]> {
    let responseModelWithData = {} as ResponseModelWithData;
    let responseWhenError = {} as ResponseWhenError;

    try {
      await prisma.komplain
        .create({
          data: {
            komplain_id: Number(komplainForm.komplain_id),
            user_id: Number(komplainForm.user_id),
            product_id: Number(komplainForm.product_id),
            message: komplainForm.message,
            created_at: new Date(),
          },
        })
        .then((data) => {
          responseModelWithData = {
            status: 200,
            data: data,
            message: `Successfully Create A Complain`,
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
}
