import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema, loginSchema } from "../types/loginSchema";
import { useLoginMutation } from "../common/api/mutation/mutation";
import { useNavigate } from "react-router-dom";
import { setAccessToken, setRefreshToken } from "../helpers/auth.helper";
import { toast } from "react-toastify";

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
		<form className="flex flex-col gap-5" onSubmit={onSubmit}>
			<h2 className="text-sm font-bold text-center md:text-xl lg:text-3xl">
				welcome to my picture
			</h2>
			<div className="flex flex-col gap-5 w-full pl-36 md:pl-60 lg:pl-72">
				<label
					htmlFor="fullName"
					className="text-gray-700 text-sm text-left font-bold "
				>
					email
				</label>
				<input
					id="email"
					{...register("email")}
					className="border rounded w-3/4 py-1 px-2 font-normal"
				></input>
				{errors.email && (
					<span className="text-red-500">{errors.email.message}</span>
				)}
				<label
					htmlFor="password"
					className="text-gray-700 text-sm text-left font-bold flex-1"
				>
					password
				</label>
				<input
					id="password"
					type="password"
					{...register("passWord")}
					className="border rounded w-3/4 py-1 px-2 font-normal"
				></input>
				{errors.passWord && (
					<span className="text-red-500">{errors.passWord.message}</span>
				)}

				<span>
					<button
						type="submit"
						className="bg-blue-600 text-white p-2 font-bold hover:bg-blue-500 text-xl"
					>
						Login
					</button>
				</span>
				<span>reset password?</span>
			</div>
		</form>
	);
}

export default Login;
