import { useNavigate } from "react-router-dom";

import InfoCard from "../../components/InfoCard";
import { ReactComponent as NoConnection } from "../../assets/no-connection.svg";

function GenericErrorPage() {
	const navigate = useNavigate();

	return (
		<InfoCard
			title="Error"
			description={`Looks like you lost your connection. Please check it and try again.`}
			Image={{ type: "svg", SVG: NoConnection }}
			btnTitle="Retry"
			callback={() => navigate(0, { replace: true })}
		/>
	);
}

export default GenericErrorPage;
