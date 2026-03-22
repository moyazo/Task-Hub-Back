export type SuccessResponse<T = unknown> = {
    success: true;
    message: string;
    data?: T;
};

export type ErrorResponse = {
    success: false;
    message: string;
    errors?: string[];
};

export type CustomResponse<T = unknown> = SuccessResponse<T> | ErrorResponse;