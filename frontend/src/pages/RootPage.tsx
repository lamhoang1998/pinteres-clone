import { ReactNode, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import { getInfo } from "../reducers/users.reducers";
import { useLocation, useNavigate } from "react-router-dom";

type Props = {
	children: ReactNode;
	protect?: boolean;
};

function RootPage({ children, protect = false }: Props) {
	const dispatch = useAppDispatch();

	const location = useLocation();

	const navigate = useNavigate();

	const isVerified = useAppSelector(
		(store) => store.userState.info?.isVerified
	);

	useEffect(
		function () {
			console.log("isProtect", protect);
			if (protect) {
				console.log("protect");
				dispatch(getInfo());
			}
		},
		[location]
	);

	if (!protect) {
		return <div>{children}</div>;
	} else {
		if (isVerified) {
			return <div>{children}</div>;
		} else if (!isVerified && isVerified !== undefined) {
			navigate("/email-verify");
		}
	}
}

export default RootPage;
