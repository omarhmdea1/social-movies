import { inject, observer } from "mobx-react";
import { useLocation } from "react-router-dom";

import * as Styles from "./MobileBottomNavigationStyles";
import Divider from "../Divider";

function MobileBottomNavigation(props) {
	const { UIStore } = props;
	const currentPage = UIStore.currentPage;
	const { pathname } = useLocation();

	if (["/login", "/register", "/demo"].includes(pathname)) {
		return null;
	}

	return (
		<Styles.Root>
			<Styles.Link
				active={pathname !== "/mobile-settings"}
				to={currentPage || "/"}
			>
				<span className="material-icons-round">home</span>
			</Styles.Link>
			<Divider vertical />
			<Styles.Link
				active={pathname === "/mobile-settings"}
				to="/mobile-settings"
			>
				<span className="material-icons-round">settings</span>
			</Styles.Link>
		</Styles.Root>
	);
}

export default inject("UIStore")(observer(MobileBottomNavigation));
