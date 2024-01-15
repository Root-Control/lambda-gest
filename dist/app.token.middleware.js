"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DecodeJwtMiddleware = void 0;
const common_1 = require("@nestjs/common");
const jwt = require("jsonwebtoken");
let DecodeJwtMiddleware = class DecodeJwtMiddleware {
    use(req, res, next) {
        const token = req.headers.authorization;
        if (token) {
            try {
                const secretOrPublicKey = 'f4lCWCjLeS12XdjqXW3x4IkhgRQkk08iNeEbEgF4pK8EaPjQqOqCZgABrlc8zxBA';
                const decoded = jwt.verify(token, secretOrPublicKey);
                req['user'] = decoded;
                console.log(req['user']);
                next();
                return true;
            }
            catch (error) {
                console.error('Error decoding token:', error);
            }
        }
        else {
            throw new common_1.HttpException('No token provided', common_1.HttpStatus.BAD_REQUEST);
        }
        next();
    }
};
exports.DecodeJwtMiddleware = DecodeJwtMiddleware;
exports.DecodeJwtMiddleware = DecodeJwtMiddleware = __decorate([
    (0, common_1.Injectable)()
], DecodeJwtMiddleware);
//# sourceMappingURL=app.token.middleware.js.map