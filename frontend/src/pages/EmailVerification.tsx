import { useForm } from "react-hook-form";
import styles from "./EmailVerification.module.css";
import { zodResolver } from "@hookform/resolvers/zod";
import { verifySchema, VerifySchema } from "../types/verifySchema.types";
import { motion } from "framer-motion";

function EmailVerification() {
	const {
		register,
		handleSubmit,
		formState: { errors },
		watch,
	} = useForm<VerifySchema>({
		resolver: zodResolver(verifySchema),
	});

	const verificationCodes = watch("verificationCodes") || [];

	const isComplete = verificationCodes.every((val) => val.trim() !== "");

	console.log("verification", verificationCodes);

	const onSubmit = handleSubmit((data) => {
		console.log(data);
	});

	return (
		<div className={styles.verificationBody}>
			<form className={styles.container} onSubmit={onSubmit}>
				<h2 className={styles.title}>Verify email</h2>
				<span className={styles.subTitle}>
					Enter the 6 digits code sent to your email address
				</span>
				<div className={styles.inputsContainer}>
					{[...Array(6)].map((_, index) => (
						<div key={index}>
							<input
								className={styles.input}
								{...register(`verificationCodes.${index}`)}
								onKeyDown={(e) => {
									if (e.key === "Enter") {
										console.log(verificationCodes[index]);
									}
								}}
							/>
						</div>
					))}
				</div>
				{errors.verificationCodes && (
					<span className="text-red-500">
						{errors.verificationCodes.root?.message}
					</span>
				)}
				<motion.button
					whileHover={{ scale: 1.05 }}
					whileTap={{ scale: 0.95 }}
					type="submit"
					// disabled={isLoading || code.some((digit) => !digit)}
					className={`${styles.button} ${
						isComplete ? styles.activeButton : ""
					}`}
				>
					{/* {isLoading ? "Verifying..." : "Verify Email"} */}
					verify Email
				</motion.button>
			</form>
		</div>
	);
}

export default EmailVerification;
