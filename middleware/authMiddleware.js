const jwt = require('jsonwebtoken');
const db = require('../models');
const User = db.User;

const authMiddleware = (req, res, next) => {
    let token;

    // Check for the token in the Authorization header
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        try {
            // Get token from header (e.g., "Bearer eyJhbGci...")
            token = req.headers.authorization.split(' ')[1];

            // Verify the token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Attach the user's ID to the request object for later use
            req.user = { id: decoded.id };

            // Move to the next function (the actual route handler)
            next();
        } catch (error) {
            console.error(error);
            res.status(401).json({ message: 'Not authorized, token failed' });
        }
    }

    if (!token) {
        res.status(401).json({ message: 'Not authorized, no token' });
    }
};

// This line is crucial for exporting the function
module.exports = authMiddleware;

