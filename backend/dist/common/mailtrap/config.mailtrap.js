"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mailtrap_1 = require("mailtrap");
const app_constant_1 = require("../constant/app.constant");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const TOKEN = app_constant_1.MAILTRAP_TOKEN;
if (!TOKEN) {
    throw new Error("MAILTRAP_TOKEN is not set in the environment variables.");
}
const client = new mailtrap_1.MailtrapClient({
    token: TOKEN,
});
const sender = {
    email: "hello@demomailtrap.co",
    name: "Mailtrap Test",
};
const recipients = [
    {
        email: "lamkyo373@gmail.com",
    },
];
client
    .send({
    from: sender,
    to: recipients,
    subject: "You are awesome!",
    text: "Congrats for sending test email with Mailtrap!",
    category: "Integration Test",
})
    .then(console.log, console.error);
