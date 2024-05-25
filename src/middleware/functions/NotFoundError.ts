import { ApiError } from "./ApiError";

export class NotFoundError extends ApiError {
  constructor(message: string) {
    super(message, 404);
  }
}
