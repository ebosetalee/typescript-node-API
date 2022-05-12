import ErrorResponse from "./index";

class ValidationError extends ErrorResponse {
    metadata: Record<string, object>;
    constructor(message: string, code: number, metadata: Record<string, object>) {
        super(message, code);
        this.metadata = metadata;
    }
}

export default ValidationError;
