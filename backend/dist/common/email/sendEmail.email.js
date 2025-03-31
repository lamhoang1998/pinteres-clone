"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mailtrap_1 = require("mailtrap");
const app_constant_1 = require("../constant/app.constant");
function sendEmail(email, verifyCode) {
    const token = app_constant_1.MAILTRAP_TOKEN;
    console.log("send email");
    console.log("email", email);
    const sender = {
        email: "hello@demomailtrap.co",
        name: "Mailtrap Test",
    };
    const recipients = [{ email: email }];
    if (token) {
        const client = new mailtrap_1.MailtrapClient({
            token: token,
        });
        client.send({
            from: sender,
            to: recipients,
            subject: "You are awesome!",
            text: verifyCode,
            category: "Integration Test",
        });
    }
}
exports.default = sendEmail;
