// middleware/ip.js
module.exports = (req, res, next) => {
    req.ipAddress = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    next();
};