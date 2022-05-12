class ErrorResponse extends Error {
    public code: number;
    public message: string;
    constructor(message: string, code: number) {
        super(message);
        this.code = code;
        this.name = this.constructor.name;

        Error.captureStackTrace(this);
    }
}

export default ErrorResponse;
