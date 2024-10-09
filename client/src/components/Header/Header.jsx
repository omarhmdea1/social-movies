import { useState, useEffect } from "react";
import { inject, observer } from "mobx-react";
import { useNavigate } from "react-router-dom";

import UIUtils from "../../utils/uiUtils";
import * as Styles from "./HeaderStyles";
import { useIsAboveDevice, DEVICE_SIZES } from "../../hooks/useIsAboveDevice";
import useInputController from "../../hooks/useInputController";
import AccountDropDown from "./components/AccountDropDown";
import Input from "../Input";
import { ReactComponent as Logo } from "../../assets/logo/primary.svg";
import MobileRightSection from "./components/MobileRightSection/MobileRightSection";

function Header(props) {
	const { AuthStore, UIStore } = props;
	const activeUser = AuthStore.data?.activeUser;
	const searchController = useInputController("");
	const navigate = useNavigate();
	const [isScrolled, setIsScrolled] = useState(false);
	const isAboveTablet = useIsAboveDevice(DEVICE_SIZES.iPadsAndTablets);

	function search(e) {
		e.preventDefault();
		const query = searchController.value;
		if (!query) {
			return;
		}
		navigate(`/search?query=${query}`);
		searchController.onChange({ target: { value: "" } });
	}

	function backButtonClicked() {
		navigate(UIStore.previousPage, { replace: true });
	}

	function isBackButtonVisible() {
		const standaloneMode = UIUtils.isStandalone();
		const isFullScreen = UIUtils.isFullScreen();
		if (UIStore.isBackButtonHidden) {
			return false;
		}
		if (!standaloneMode && isAboveTablet && !isFullScreen) {
			return false;
		}
		return true;
	}

	useEffect(() => {
		if (UIStore.transparentHeader) {
			function updateScroll() {
				if (isScrolled === window.scrollY > 50) {
					return;
				}
				setIsScrolled(window.scrollY > 50);
			}
			document.addEventListener("scroll", updateScroll);

			return () => document.removeEventListener("scroll", updateScroll);
		}
	}, [isScrolled, UIStore.transparentHeader]);

	return (
		<Styles.Root transparent={UIStore.transparentHeader && !isScrolled}>
			<Styles.Header center={!activeUser}>
				<Styles.LeftSection>
					{isBackButtonVisible() && (
						<Styles.BackButton onClick={backButtonClicked}>
							<span className="material-icons-round">
								arrow_back_ios
							</span>
						</Styles.BackButton>
					)}
					<Styles.Logo to="/">
						<Logo />
					</Styles.Logo>
				</Styles.LeftSection>

				{activeUser && (
					<>
						<Styles.DesktopRightSection>
							<form onSubmit={search} noValidate>
								<Input
									placeholder="Search"
									{...searchController}
								/>
							</form>
							<AccountDropDown />
						</Styles.DesktopRightSection>

						<MobileRightSection
							search={search}
							searchController={searchController}
						/>
					</>
				)}
			</Styles.Header>
		</Styles.Root>
	);
}

export default inject("AuthStore", "UIStore")(observer(Header));
