import { useAuth } from "../../context/authContext";
import styles from "./SideBar.module.css";
import { CiSquarePlus } from "react-icons/ci";
import { GoHome } from "react-icons/go";
import { IoMdNotificationsOutline } from "react-icons/io";
import { AiOutlineMessage } from "react-icons/ai";
import { RiSettingsLine } from "react-icons/ri";

function SideBar() {
	const { toggleShowModal } = useAuth();
	return (
		<div className={styles.sidebarContainer}>
			<div className={styles.menuIcons}>
				<a href="/" className={styles.menuIcon}>
					<img src="/logo.png" alt="" />
				</a>
				<GoHome className={styles.menuIcon} />
				<CiSquarePlus className={styles.menuIcon} onClick={toggleShowModal} />
				<IoMdNotificationsOutline className={styles.menuIcon} />
				<AiOutlineMessage className={styles.menuIcon} />
			</div>
			<RiSettingsLine className={styles.menuIcon} />
		</div>
	);
}

export default SideBar;
