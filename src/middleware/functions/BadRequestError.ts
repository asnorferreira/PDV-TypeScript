import { ApiError } from "./ApiError"

export class BadRequestError extends ApiError {
    constructor(message: string) {
        super(message, 400)
    }
}