import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema, loginSchema } from "../types/loginSchema";
import { useLoginMutation } from "../common/api/mutation/mutation";
import { useNavigate } from "react-router-dom";
import { setAccessToken, setRefreshToken } from "../helpers/auth.helper";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Mail, Lock, Loader } from "lucide-react";

function Login() {
	const navigate = useNavigate();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<LoginSchema>({
		resolver: zodResolver(loginSchema),
	});

	const login = useLoginMutation();

	const onSubmit = handleSubmit((data) => {
		login.mutate(data, {
			onSuccess: (data) => {
				setAccessToken(data.data.metaData.tokens.accessToken);
				setRefreshToken(data.data.metaData.tokens.refreshToken);

				toast.success("successfully signed in");

				navigate("/");
			},
		});
	});

	return (
		// <form className="flex flex-col gap-5" onSubmit={onSubmit}>
		// 	<h2 className="text-sm font-bold text-center md:text-xl lg:text-3xl">
		// 		welcome to my picture
		// 	</h2>
		// 	<div className="flex flex-col gap-5 w-full pl-36 md:pl-60 lg:pl-72">
		// 		<label
		// 			htmlFor="fullName"
		// 			className="text-gray-700 text-sm text-left font-bold "
		// 		>
		// 			email
		// 		</label>
		// 		<input
		// 			id="email"
		// 			{...register("email")}
		// 			className="border rounded w-3/4 py-1 px-2 font-normal"
		// 		></input>
		// 		{errors.email && (
		// 			<span className="text-red-500">{errors.email.message}</span>
		// 		)}
		// 		<label
		// 			htmlFor="password"
		// 			className="text-gray-700 text-sm text-left font-bold flex-1"
		// 		>
		// 			password
		// 		</label>
		// 		<input
		// 			id="password"
		// 			type="password"
		// 			{...register("passWord")}
		// 			className="border rounded w-3/4 py-1 px-2 font-normal"
		// 		></input>
		// 		{errors.passWord && (
		// 			<span className="text-red-500">{errors.passWord.message}</span>
		// 		)}

		// 		<span>
		// 			<button
		// 				type="submit"
		// 				className="bg-blue-600 text-white p-2 font-bold hover:bg-blue-500 text-xl"
		// 			>
		// 				Login
		// 			</button>
		// 		</span>
		// 	</div>
		// </form>
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5 }}
			className=" w-full bg-lg-page bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl h-screen flex flex-col justify-center items-center"
		>
			<h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-red-400 to-rose-500 text-transparent bg-clip-text">
				Welcome Back
			</h2>

			<form
				onSubmit={onSubmit}
				className="w-6/12 bg-lg-container max-w-[420px] flex flex-col justify-center items-center rounded-lg mb-4"
			>
				<div className="flex flex-col w-[90%] items-center gap-6 py-7">
					<div className="flex w-full bg-input-bg p-2 rounded-md gap-2">
						<Mail />
						<input
							type="text"
							id="email"
							{...register("email")}
							className="border-none bg-transparent outline-none"
							placeholder="Email"
						></input>
					</div>
					{errors.email && (
						<span className="text-red-500">{errors.email.message}</span>
					)}

					<div className="flex w-full bg-input-bg p-2 rounded-md gap-2">
						<Lock />
						<input
							type="password"
							id="password"
							{...register("passWord")}
							className="border-none bg-transparent outline-none"
							placeholder="Password"
						></input>
					</div>
					{errors.passWord && (
						<span className="text-red-500">{errors.passWord.message}</span>
					)}
				</div>

				<motion.button
					whileHover={{ scale: 1.02 }}
					whileTap={{ scale: 0.98 }}
					className="my-5 w-[90%] py-3 px-4 bg-gradient-to-r from-red-500 to-rose-500 text-white 
						font-bold rounded-lg shadow-lg hover:from-red-500
						hover:to-rose-700 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2
						 focus:ring-offset-gray-900 transition duration-200"
					type="submit"
					disabled={login.isPending}
				>
					{login.isPending ? (
						<Loader className="w-6 h-6 animate-spin  mx-auto" />
					) : (
						"Login"
					)}
				</motion.button>
			</form>
			<div className="px-8 py-4 bg-gray-900 w-2/4 max-w-[420px]  bg-opacity-50 flex justify-center items-center rounded-md">
				<p className="text-sm text-gray-400 ">
					Don't have an account?{" "}
					<Link to="/sign-up" className="text-green-400 hover:underline">
						Sign up
					</Link>
				</p>
			</div>
		</motion.div>
	);
}

export default Login;
