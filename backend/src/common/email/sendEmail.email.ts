import { MailtrapClient } from "mailtrap";
import { MAILTRAP_TOKEN } from "../constant/app.constant";

function sendEmail(email: string, verifyCode: string) {
	const token = MAILTRAP_TOKEN;
	console.log("send email");
	console.log("email", email);

	const sender = {
		email: "hello@demomailtrap.co",
		name: "Mailtrap Test",
	};

	const recipients: { email: string }[] = [{ email: email }];

	if (token) {
		const client = new MailtrapClient({
			token: token as string,
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

export default sendEmail;
