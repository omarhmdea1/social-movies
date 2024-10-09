import * as Styles from "./PlannedMovieCardStyles";
import MovieCard from "../MovieCard";

function PlannedMovieCard(props) {
	const {
		plannedMovie,
		toggleVisibility,
		deleteMovie,
		disableLinks,
		editMode,
		hideDeleteBtn = false,
	} = props;
	const { movie, visibleToOthers } = plannedMovie;

	return (
		<Styles.Root>
			<MovieCard movie={movie} disableLinks={disableLinks || editMode} />
			{editMode && (
				<Styles.VisibilityCheckBoxContainer>
					<input
						type="checkbox"
						id={movie.IMDBId || movie.id}
						checked={visibleToOthers}
						onChange={toggleVisibility}
					/>
					<label htmlFor={movie.IMDBId || movie.id}>
						Visible to others
					</label>
				</Styles.VisibilityCheckBoxContainer>
			)}
			{!hideDeleteBtn && editMode && (
				<Styles.DeleteBtn className="clickable" onClick={deleteMovie}>
					<span className="material-icons-round">clear</span>
				</Styles.DeleteBtn>
			)}
		</Styles.Root>
	);
}

export default PlannedMovieCard;
