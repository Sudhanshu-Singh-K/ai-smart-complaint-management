const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {

    try {

        // Get token from headers
        const token =
            req.headers.authorization;

        // Check token exists
        if (!token) {

            return res.status(401).json({

                message:
                    "Access Denied"

            });

        }

        // Verify token
        const verified =
            jwt.verify(
                token,
                process.env.JWT_SECRET
            );

        // Store user info
        req.user = verified;

        next();

    } catch (error) {

        res.status(401).json({

            message:
                "Invalid Token"

        });

    }

};

module.exports =
    authMiddleware;