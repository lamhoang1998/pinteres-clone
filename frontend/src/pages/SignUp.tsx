import styles from "./SignUp.module.css";
import { useForm } from "react-hook-form";
import { RegisterSchema, registerSchema } from "../types/registerSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { User } from "lucide-react";
import { Mail } from "lucide-react";
import { Lock } from "lucide-react";
import { motion } from "framer-motion";

import PasswordStrengthMeter from "../component/Password/PasswordStrengthMeter";
import { useRegisterMutation } from "../common/api/mutation/mutation";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function SignUp() {
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm<RegisterSchema>({ resolver: zodResolver(registerSchema) });

	const navigate = useNavigate();

	const password = watch("passWord");

	const { mutate } = useRegisterMutation();

	const onSubmit = handleSubmit((data) => {
		console.log(data);
		mutate(data, {
			onSuccess: () => {
				toast.success("successfully register");
				navigate("/email-verify");
			},
			onError: (error) => {
				toast.error(error.response?.data.message);
			},
		});
	});

	return (
		<div className={styles.signUpBody}>
			<form className={styles.container} onSubmit={onSubmit}>
				<h2 className={styles.title}>Create an Account</h2>
				<div className={styles.inputsContainer}>
					<div className={styles.inputContainer}>
						<User />
						<input
							type="text"
							id="fullName"
							{...register("fullName")}
							className={styles.input}
							placeholder="Full Name"
						/>
					</div>
					{errors.fullName && (
						<span className="text-red-500">{errors.fullName.message}</span>
					)}

					<div className={styles.inputContainer}>
						<Mail />
						<input
							id="email"
							{...register("email")}
							className={styles.input}
							placeholder="Email"
						></input>
					</div>
					{errors.email && (
						<span className="text-red-500">{errors.email.message}</span>
					)}

					<div className={styles.inputContainer}>
						<Lock />
						<input
							id="password"
							type="password"
							{...register("passWord")}
							className={styles.input}
							placeholder="Password"
						></input>
					</div>
					{errors.passWord && (
						<span className="text-red-500">{errors.passWord.message}</span>
					)}

					<PasswordStrengthMeter password={password} />

					<motion.button
						className="mt-5 w-full py-3 px-4 bg-gradient-to-r from-red-500 to-rose-500 text-white 
						font-bold rounded-lg shadow-lg hover:from-red-500
						hover:to-rose-700 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2
						 focus:ring-offset-gray-900 transition duration-200"
						whileHover={{ scale: 1.02 }}
						whileTap={{ scale: 0.98 }}
						type="submit"
						// disabled={isLoading}
					>
						{/* {isLoading ? (
							<Loader className=" animate-spin mx-auto" size={24} />
						) : (
							"Sign Up"
						)} */}
						Sign Up
					</motion.button>
				</div>
			</form>
		</div>
	);
}

export default SignUp;
