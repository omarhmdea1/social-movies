import { useState, useEffect } from "react";
import { inject, observer } from "mobx-react";

import * as Styles from "./PlannedMovieFormStyles";
import PlannedMovieCard from "../../../../components/PlannedMovieCard";

function PlannedMovieForm(props) {
	const { UsersStore, movie } = props;
	const { plannedMovieFormData } = UsersStore;

	useEffect(() => {
		return () => UsersStore.clearPlannedMovieFormData();
	}, []);

	function toggleVisibility() {
		UsersStore.updatePlannedMovieFormData(
			"visibleToOthers",
			!plannedMovieFormData.visibleToOthers
		);
	}

	return (
		<>
			<PlannedMovieCard
				hideDeleteBtn
				editMode
				toggleVisibility={toggleVisibility}
				disableLinks
				plannedMovie={{
					visibleToOthers: plannedMovieFormData.visibleToOthers,
					movie,
				}}
			/>
		</>
	);
}

export default inject("UsersStore")(observer(PlannedMovieForm));
