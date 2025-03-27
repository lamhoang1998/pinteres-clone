import { ReactNode, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import { getInfo } from "../reducers/users.reducers";
import { useNavigate } from "react-router-dom";

type Props = {
	children: ReactNode;
	protect?: boolean;
};

function RootPage({ children, protect = false }: Props) {
	const dispatch = useAppDispatch();

	const navigate = useNavigate();

	const isVerified = useAppSelector(
		(store) => store.userState.info?.isVerified
	);

	useEffect(function () {
		if (protect) {
			dispatch(getInfo());
		}
	}, []);

	if (!protect) {
		return <div>{children}</div>;
	}

	if (protect) {
		if (isVerified) {
			return <div>{children}</div>;
		} else {
			navigate("/email-verify");
		}
	}
}

export default RootPage;
