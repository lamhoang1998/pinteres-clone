import { Outlet } from "react-router-dom";
import SideBar from "./SideBar";
import SearchBar from "./SearchBar";

import styles from "./AppLayOut.module.css";

export default function AppLayOut() {
	return (
		<div className={styles.container}>
			<SideBar />
			<SearchBar />
			<Outlet />
		</div>
	);
}
