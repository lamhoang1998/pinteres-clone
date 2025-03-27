import { Check, X } from "lucide-react";

import styles from "./PasswordStrengthMeter.module.css";

type PasswordCriteriaProps = {
	password: string;
};

const PasswordCriteria = ({ password = "" }: PasswordCriteriaProps) => {
	console.log("password criteria", password);
	const criteria = [
		{ label: "At least 6 characters", met: password?.length >= 6 },
		{ label: "Contains uppercase letter", met: /[A-Z]/.test(password) },
		{ label: "Contains lowercase letter", met: /[a-z]/.test(password) },
		{ label: "Contains a number", met: /\d/.test(password) },
		{ label: "Contains special character", met: /[^A-Za-z0-9]/.test(password) },
	];

	return (
		<div className="mt-2 space-y-1">
			{criteria.map((item) => (
				<div key={item.label} className="flex items-center text-xs">
					{item.met ? (
						<Check className="size-4 text-red-800 mr-2" />
					) : (
						<X className="size-4 text-slate-800 mr-2" />
					)}
					<span className={item.met ? "text-red-700" : "text-slate-800"}>
						{item.label}
					</span>
				</div>
			))}
		</div>
	);
};

type Props = {
	password: string;
};

function PasswordStrengthMeter({ password }: Props) {
	const getStrength = (pass: string) => {
		let strength: number = 0;
		if (pass?.length >= 6) strength++;
		if (pass?.match(/[a-z]/) && pass.match(/[A-Z]/)) strength++;
		if (pass?.match(/\d/)) strength++;
		if (pass?.match(/[^a-zA-Z\d]/)) strength++;
		return strength;
	};
	const strength = getStrength(password);

	console.log("strength", strength);

	const getColor = (strength: number) => {
		if (strength === 0) return `rgba(248, 113, 113, 1)`;
		if (strength === 1) return `rgba(252, 165, 165, 1)`;
		if (strength === 2) return `rgba(110, 231, 183, 1)`;
		if (strength === 3) return "rgba(16, 185, 129, 1)";
		return `rgba(5, 150, 105, 1)`;
	};

	const getStrengthText = (strength: number) => {
		if (strength === 0) return "Very Weak";
		if (strength === 1) return "Weak";
		if (strength === 2) return "Fair";
		if (strength === 3) return "Good";
		return "Strong";
	};

	return (
		<div className={styles.container}>
			<div className={styles.passwordStrengthContainer}>
				<span className={styles.passwordStrength}>Password strength</span>
				<span className={styles.passwordStrengthValue}>
					{getStrengthText(strength)}
				</span>
			</div>
			<div className={styles.passwordStrengthVisualityContainer}>
				{[...Array(4)].map((_, index) => (
					<div
						key={index}
						className={styles.passwordStrengthVisuality}
						style={{
							backgroundColor: `${
								index < strength ? getColor(strength) : `rgb(30, 28, 28)`
							}`,
						}}
					></div>
				))}
			</div>
			<PasswordCriteria password={password} />
		</div>
	);
}

export default PasswordStrengthMeter;
