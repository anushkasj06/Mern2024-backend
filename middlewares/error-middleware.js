const errorMiddleware = (err, req, res, next) => {
    console.log("Error Middleware Triggered:", err);
    const status = err.status || 500;
    const message = err.message || "BANKEND ERROR";
    const extraDetails = err.extraDetails || "Error from backend";

    return res.status(status).json({message, extraDetails});
};


module.exports = errorMiddleware;