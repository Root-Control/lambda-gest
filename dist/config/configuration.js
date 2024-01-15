"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../@common/utilities/utils");
exports.default = () => ({
    port: parseInt(process.env.APP_PORT, 10) || 3000,
    redis: {
        port: parseInt(process.env.REDIS_PORT, 10) || 6379,
        host: process.env.REDIS_HOST || 'localhost',
    },
    jwt: {
        privateKey: (0, utils_1.getString)(process.env.JWT_PRIVATE_KEY || ''),
        publicKey: (0, utils_1.getString)(process.env.JWT_PUBLIC_KEY || ''),
        ttl: 5000,
    },
});
//# sourceMappingURL=configuration.js.map