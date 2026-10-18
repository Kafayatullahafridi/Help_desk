export class AppError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
  }
}

export function notFound(_request, _response, next) {
  next(new AppError(404, "Route not found."));
}

export function errorHandler(error, _request, response, _next) {
  console.error(error);
  const status = error.status || (error.name === "ValidationError" ? 400 : 500);
  response.status(status).json({ success: false, message: status === 500 ? "Internal server error." : error.message });
}
