"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mailtrap_1 = require("mailtrap");
var app_constant_js_1 = require("../constant/app.constant.js");
var TOKEN = app_constant_js_1.MAILTRAP_TOKEN;
var client = new mailtrap_1.MailtrapClient({
    token: TOKEN,
});
var sender = {
    email: "hello@demomailtrap.co",
    name: "Mailtrap Test",
};
var recipients = [
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
