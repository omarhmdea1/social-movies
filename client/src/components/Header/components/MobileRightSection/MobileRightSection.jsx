import { useState, useEffect, useRef } from "react";

import * as Styles from "./MobileRightSectionStyles";
import Avatar from "../../../Avatar";
import Input from "../../../Input";

function MobileRightSection(props) {
	const { search, searchController } = props;
	const [showForm, setShowForm] = useState(false);
	const formRef = useRef();

	useEffect(() => {
		const inputElement = formRef.current.querySelector("input");
		if (showForm) {
			inputElement.focus();
		} else {
			inputElement.blur();
		}
	}, [showForm]);

	function toggleShowForm() {
		setShowForm((prev) => !prev);
	}

	function onSubmit(e) {
		e.preventDefault();
		setShowForm(false);
		search(e);
	}

	return (
		<Styles.Root>
			<Avatar small active={showForm} onClick={toggleShowForm}>
				<span className="material-icons-round">search</span>
			</Avatar>

			<Styles.Form
				active={showForm}
				as="form"
				onSubmit={onSubmit}
				ref={formRef}
			>
				<Avatar small onClick={toggleShowForm}>
					<span className="material-icons-round">close</span>
				</Avatar>

				<Input placeholder="Search" {...searchController} />

				<Avatar small as="button" type="submit">
					<span className="material-icons-round">check</span>
				</Avatar>
			</Styles.Form>
		</Styles.Root>
	);
}

export default MobileRightSection;
