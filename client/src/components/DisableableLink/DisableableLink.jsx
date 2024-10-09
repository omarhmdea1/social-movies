import { Link } from "react-router-dom";

function DisableableLink(props) {
	const { children, disabled = false, external = false, ...rest } = props;

	if (disabled) {
		return <a className={rest.className}>{children}</a>;
	}

	if (external) {
		return <a {...rest}>{children}</a>;
	}

	return <Link {...rest}>{children}</Link>;
}

export default DisableableLink;
