import { inject } from "mobx-react";
import { useEffect } from "react";
import { useLocation, useNavigationType } from "react-router-dom";

function NavigationHistoryUpdater(props) {
	const { UIStore } = props;
	const location = useLocation();
	const navigationType = useNavigationType();
	const path = location.pathname + location.search;
	useEffect(() => {
		UIStore.updateNavigationHistory(path, navigationType);
	}, [path]);

	return null;
}

export default inject("UIStore")(NavigationHistoryUpdater);
