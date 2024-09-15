const jwt = require('jsonwebtoken');

// Middleware to validate JWT token
const authMiddleware = (req, res, next) => {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized.' });
    }

    // Extract the token from the "Bearer <token>" format
    const extractedToken = token.split(' ')[1];

    try {
        // Verify the token using JWT_SECRET
        const decoded = jwt.verify(extractedToken, process.env.JWT_SECRET);

        // Check the expiration time
        const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
        if (decoded.exp < currentTime) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        // Attach the decoded token to the request object for further use
        req.user = decoded;

        // Proceed to the next middleware or route
        next();
    } catch (err) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
};

module.exports = authMiddleware;
