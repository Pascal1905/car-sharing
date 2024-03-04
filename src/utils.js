import logging from "logging";
export const logger = logging.default("main");
export function throwError(name, message, status) {
    let error        = new Error(message || "");
    error.name       = name || "Error";
    error.httpStatus = status || 400;

    throw error;
}
export function throwNotFound() {
    throwError("NOT-FOUND", "Nicht gefunden", 404);
}
export function wrapAsync(handler) {
    return function(req, res, next) {
        try {
            handler(req, res, next)?.catch(next)?.then(next);
        } catch (ex) {
            return next(ex);
        }
    };
}