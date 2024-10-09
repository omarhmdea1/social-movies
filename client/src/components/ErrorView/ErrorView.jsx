import React from "react";

import * as Styles from "./ErrorViewStyles";
import { ReactComponent as ErrorIcon } from "../../assets/error.svg";

function ErrorView({ errorMessage }) {
	return (
		<Styles.Root>
			<ErrorIcon />
			<p className="p-large medium">{errorMessage}</p>
		</Styles.Root>
	);
}

export default ErrorView;
