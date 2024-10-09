import { useEffect } from "react";
import { inject, observer } from "mobx-react";
import { Link, useNavigate } from "react-router-dom";

import * as Styles from "./MobileSettingsPageStyles";
import { useIsAboveDevice, DEVICE_SIZES } from "../../hooks/useIsAboveDevice";
import Container from "../../components/Container";
import Button from "../../components/Button";
import BigUserBox from "../../components/BigUserBox";
import Divider from "../../components/Divider";

function MobileSettingsPage(props) {
	const { AuthStore } = props;
	const activeUser = AuthStore.data.activeUser;
	const navigate = useNavigate();
	const isAboveTablet = useIsAboveDevice(DEVICE_SIZES.iPadsAndTablets);

	useEffect(() => {
		if (isAboveTablet) {
			navigate("/", { repalce: true });
		}
	}, [isAboveTablet]);

	function logout() {
		AuthStore.logout();
	}

	return (
		<Container expand>
			<Styles.Root>
				<BigUserBox user={activeUser} />
				<Divider />
				<Link to={`/user/${activeUser.id}`}>
					<Button expand>My Profile</Button>
				</Link>
				<Button secondary expand onClick={logout}>
					Logout
				</Button>
			</Styles.Root>
		</Container>
	);
}

export default inject("AuthStore")(observer(MobileSettingsPage));
