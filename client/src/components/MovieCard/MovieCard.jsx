import { inject, observer } from "mobx-react";

import { Link } from "react-router-dom";
import * as Styles from "./MovieCardStyles";
import { ReactComponent as IMDBLogo } from "../../assets/imdb-logo.svg";
import MovieRatingContainer from "../MovieRatingContainer/MovieRatingContainer";
import DisableableLink from "../DisableableLink";

function MovieCard(props) {
	const { disableLinks, movie } = props;
	const { id, title, releaseDate, posterImageURL, IMDBRating } = movie;

	return (
		<Styles.Root>
			<Styles.Poster
				disabled={disableLinks}
				to={`/movie/${id}`}
				src={posterImageURL}
			/>
			<Styles.Info>
				<DisableableLink
					disabled={disableLinks}
					to={`/movie/${id}`}
					className="p-small bold"
				>
					{title}
				</DisableableLink>
				<p className="p-small bold">
					{new Date(releaseDate).getFullYear()}
				</p>
				<MovieRatingContainer>
					<IMDBLogo />
					<p className="p-small bold">{IMDBRating}/10</p>
				</MovieRatingContainer>
			</Styles.Info>
		</Styles.Root>
	);
}

export default inject("MoviesStore", "UsersStore")(observer(MovieCard));
