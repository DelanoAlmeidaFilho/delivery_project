class AppError {
    public readonly message: string;
    public readonly statusCode: number;
    public readonly code: string;

    constructor(message: string, code = '', statusCode = 400) {
        this.message = message;
        this.code = code;
        this.statusCode = statusCode;
    }
}

export { AppError };
