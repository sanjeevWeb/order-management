function validateRequest(schema) {
    return async function validator(req, res, next) {
        try {
            const validated = await schema.validateAsync(req.body, {
                abortEarly: false, 
            });
            req.body = validated; 
            next();
        } catch (err) {
            if (err.isJoi) {
                const errorDetails = err.details.map(detail => detail.message);
                return res.status(400).json({
                    error: "Validation failed",
                    details: errorDetails,
                });
            }
            // unexpected error
            console.error("Validation error:", err);
            return res.status(500).json({ error: "Server error during validation" });
        }
    };
}

module.exports = validateRequest;
