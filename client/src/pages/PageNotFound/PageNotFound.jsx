import { useNavigate } from "react-router-dom";

import InfoCard from "../../components/InfoCard";
import { ReactComponent as PageNotFoundIllustration } from "../../assets/page-not-found.svg";

function PageNotFound() {
	const navigate = useNavigate();

	return (
		<InfoCard
			title="This Page Isn't Available"
			description={`The link may be broken, or the page may have been removed.\n Check to see if the link you're trying to open is correct.`}
			Image={{ type: "svg", SVG: PageNotFoundIllustration }}
			btnTitle="Back to Home"
			callback={() => navigate("/", { replace: true })}
		/>
	);
}

export default PageNotFound;
