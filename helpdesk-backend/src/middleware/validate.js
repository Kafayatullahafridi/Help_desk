import { AppError } from "../utils/errors.js";

export function validate(schema) {
  return (request, _response, next) => {
    const result = schema.safeParse(request.body);
    if (!result.success) return next(new AppError(400, result.error.issues.map((issue) => issue.message).join(", ")));
    request.body = result.data;
    return next();
  };
}
