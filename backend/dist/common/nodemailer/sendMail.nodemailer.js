"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// function sendEmail() {}
const nodemailer_1 = __importDefault(require("nodemailer"));
const app_constant_1 = require("../constant/app.constant");
const transporter = nodemailer_1.default.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: "joongunkim1@gmail.com",
        pass: "chhq sxgn mcdq xckd",
    },
});
function sendEmail(email, verifyCode) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log({ email: email });
        console.log({ EMAIL_ADDRESS: app_constant_1.EMAIL_ADDRESS });
        const info = yield transporter.sendMail({
            from: "joongunkim1@gmail.com", // sender address
            to: email, // list of receivers
            subject: "Hello ✔", // Subject line
            text: verifyCode, // plain text body
            html: `<b>${verifyCode}</b>`, // html body
        });
        console.log("Message sent: %s", info.messageId);
    });
}
// sendEmail().catch(console.error);
exports.default = sendEmail;
