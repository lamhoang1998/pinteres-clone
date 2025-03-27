import styles from "./SearchBar.module.css";
import { FaSearch } from "react-icons/fa";
import { useAppSelector } from "../../hooks";
import { BASE_DOMAIN_CLOUDINARY } from "../../constant/app.constant";
import { NavLink } from "react-router-dom";
import { getAccessToken } from "../../helpers/auth.helper";
import { useState } from "react";
import { useAuth } from "../../context/authContext";

function SearchBar() {
	const userInfo = useAppSelector((store) => store.userState.info);
	const accessToken = getAccessToken();

	const { setSearchValueContext } = useAuth();

	const [searchValue, setSeachValue] = useState("");
	console.log("searchValue", searchValue);

	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter") {
			setSearchValueContext(searchValue); // Update context state when Enter is pressed
		}
	};

	return (
		<div className={styles.searchBar}>
			<div className={styles.searchingBarContainer}>
				<div className={styles.searchingBar}>
					<FaSearch
						onClick={() => {
							setSearchValueContext(searchValue);
						}}
					/>

					<input
						className={styles.searchInput}
						size={100}
						placeholder="search"
						value={searchValue}
						onChange={(e) => {
							setSeachValue(e.target.value);
							setSearchValueContext(e.target.value);
						}}
						onKeyDown={handleKeyDown}
					/>
				</div>
				<div className={styles.avatarInfoContainer}>
					{accessToken && (
						<NavLink to="/profile">
							<img
								width={50}
								height={50}
								src={`${BASE_DOMAIN_CLOUDINARY}/${userInfo?.avatar}`}
								className={styles.avatarImg}
							/>
						</NavLink>
					)}
				</div>
			</div>
		</div>
	);
}

export default SearchBar;
