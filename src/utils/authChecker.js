"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const authChecker = ({ context }) => {
    return !!context.user;
};
exports.default = authChecker;
