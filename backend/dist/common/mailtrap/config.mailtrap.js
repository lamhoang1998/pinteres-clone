"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sender = void 0;
// console.log("mailtrap", MAILTRAP_TOKEN);
// dotenv.config();
// const TOKEN = "83ec10ab0dfe782d4c9199c74593f50f";
// if (!TOKEN) {
// 	throw new Error("MAILTRAP_TOKEN is not set in the environment variables.");
// }
// const client = new MailtrapClient({
// 	token: TOKEN as string,
// });
exports.sender = {
    email: "hello@demomailtrap.co",
    name: "Mailtrap Test",
};
const recipients = [
    {
        email: "lamkyo373@gmail.com",
    },
];
// client
// 	.send({
// 		from: sender,
// 		to: recipients,
// 		subject: "You are awesome!",
// 		text: "Congrats for sending test email with Mailtrap!",
// 		category: "Integration Test",
// 	})
// 	.then(console.log, console.error);
