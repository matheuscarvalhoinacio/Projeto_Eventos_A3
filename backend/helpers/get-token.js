const getToken = (req) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return null;  
    }

    const parts = authHeader.split(' ');

    if (parts.length !== 2) {
        return null;  
    }

    const token = parts[1];

    return token;
};

module.exports = getToken;
