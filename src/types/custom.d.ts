import { AuthResponse } from "./index";

declare global {
    namespace Express {
        export interface Request {
            user: AuthResponse;
        }
    }
}
