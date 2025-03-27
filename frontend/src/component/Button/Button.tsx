import { ReactNode, ComponentPropsWithoutRef } from "react";
import styles from "./Button.module.css";

type ButtonProps = {
	children: ReactNode;
	onClick?: () => void;
	icon?: ReactNode;
} & ComponentPropsWithoutRef<"button">; // Include all native button props

export const Button = ({
	onClick,
	children,
	icon,
	className,
	...rest
}: ButtonProps) => {
	return (
		<button
			onClick={onClick}
			// Merge "button" base class with custom className
			className={`${styles.button} ${className || ""}`}
			// Spread all remaining props (type, data-*, etc.)
			{...rest}
		>
			{icon} {children}
		</button>
	);
};

type ButtonReusableProps = {
	children: ReactNode;
	onClick?: () => void;
};

export function ButtonReusable({ children }: ButtonReusableProps) {
	return children;
}
