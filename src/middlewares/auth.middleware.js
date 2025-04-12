const jwt = require('jsonwebtoken');
const userModel = require('../models/user.model');
const secretKey = process.env.JWT_SECRET_KEY;

exports.authorization = async (request, response, next) => {
    try {
        const token = request.headers.Authorization || request.headers.authorization;
        if (!token) {
            return response.status(401).send({ message: "Unauthorized access" });
        }
        const decode = jwt.verify(token, secretKey);
        const user = await userModel.findById({ _id: decode.userId });
        if (user) {
            request.user = user;
            next();
        }
        else {
            return response.status(401).send({ message: "Unauthorized" });
        }

    }
    catch (error) {
        if (error.name === 'TokenExpiredError') {
            response.status(401).json({ message: 'Time out please sign in again' });
        } else {
            response.status(500).json({ message: 'Something went wrong  - please sign again' });
        }
    }
}