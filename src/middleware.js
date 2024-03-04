export function logRequest(logger) {
    return function(req, res, next) {
        logger.info(`${req.method} ${req.originalUrl}`);
        next();
    }
}

export function handleError(logger) {
    return function (err, req, res, next) {
        logger.error(err);

        if (!err.httpStatus) console.error(err);

        res.status(err.httpStatus || 500);

        res.send({
            error:   err.name    || "Error",
            message: err.message || "",
        });

        next();
    }
}