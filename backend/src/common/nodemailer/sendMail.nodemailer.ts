// function sendEmail() {}
import nodemailer from "nodemailer";
import { EMAIL_PASSWORD } from "../constant/app.constant";
import { EMAIL_ADDRESS } from "../constant/app.constant";

const transporter = nodemailer.createTransport({
	host: "smtp.gmail.com",
	port: 587,
	secure: false,
	auth: {
		user: "joongunkim1@gmail.com",
		pass: "chhq sxgn mcdq xckd",
	},
});

async function sendEmail(email: string, verifyCode: string) {
	console.log({ email: email });
	console.log({ EMAIL_ADDRESS: EMAIL_ADDRESS });
	const info = await transporter.sendMail({
		from: "joongunkim1@gmail.com", // sender address
		to: email, // list of receivers
		subject: "Hello ✔", // Subject line
		text: verifyCode, // plain text body
		html: `<b>${verifyCode}</b>`, // html body
	});

	console.log("Message sent: %s", info.messageId);
}

// sendEmail().catch(console.error);

export default sendEmail;
