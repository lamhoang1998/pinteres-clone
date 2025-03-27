"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PORT = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const root_router_1 = __importDefault(require("./routers/root.router"));
const error_helper_1 = require("./common/helpers/error.helper");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use(root_router_1.default);
app.use(error_helper_1.handleError);
exports.PORT = 3000;
app.listen(exports.PORT, () => {
    console.log(`server running on ${exports.PORT}`);
});
