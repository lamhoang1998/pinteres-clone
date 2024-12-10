import { useForm } from "react-hook-form";
import { RegisterSchema, registerSchema } from "../types/registerSchema";
import { zodResolver } from "@hookform/resolvers/zod";

function Register() {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<RegisterSchema>({ resolver: zodResolver(registerSchema) });

	console.log("errors", errors);

	const onSubmit = handleSubmit((data) => {
		console.log(data);
	});

	return (
		<form className="flex flex-col gap-5 " onSubmit={onSubmit}>
			<h2 className="text-sm font-bold text-center md:text-xl lg:text-3xl">
				Create an Account
			</h2>
			<div className="flex flex-col gap-5 w-full pl-36 md:pl-60 lg:pl-72">
				<label
					htmlFor="fullName"
					className="text-gray-700 text-sm text-left font-bold "
				>
					full name
				</label>
				<input
					id="fullName"
					{...register("fullName")}
					className="border rounded w-3/4 py-1 px-2 font-normal"
				></input>
				{errors.fullName && (
					<span className="text-red-500">{errors.fullName.message}</span>
				)}
				<label
					htmlFor="email"
					className="text-gray-700 text-sm text-left font-bold flex-1"
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
					{...register("password")}
					className="border rounded w-3/4 py-1 px-2 font-normal"
				></input>
				{errors.password && (
					<span className="text-red-500">{errors.password.message}</span>
				)}

				<span>
					<button
						type="submit"
						className="bg-blue-600 text-white p-2 font-bold hover:bg-blue-500 text-xl"
					>
						Create Account
					</button>
				</span>
			</div>
		</form>
	);
}

export default Register;
