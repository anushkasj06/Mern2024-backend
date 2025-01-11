const validate = (Schema) => async (req, res, next) => {
    try {
        const parseBody = await Schema.parseAsync(req.body);
        req.body = parseBody;
        next();
    } catch (err) {
        const status = 422;
        const message = "Fill the Details properly";
        let extraDetails = "Unknown validation error";

        if (err.issues) {
            extraDetails = err.issues
                .map((issue) => `${issue.path.join(".")}: ${issue.message}`)
                .join(", ");
        }

        const error = {
            status,
            message,
            extraDetails,
        };

        console.log("Validation Error:", error);
        next(error);
    }
};

module.exports = validate;
