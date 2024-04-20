export interface ResponseModelWithData {
    status: number;
    data: any;
    message: string;
    error: boolean;
}

export interface ResponseModelOnlyMessage {
    status: number;
    message: string;
    error: boolean;
}

export interface ResponseWhenError {
    status: number;
    message: string;
    error: boolean;
}

export interface ResponseModelWithToken {
    status: number;
    token: string;
    message: string;
    error:boolean;
}

export interface ResponseFailedValidation {
    status: number;
    error: boolean;
    message: string;
}