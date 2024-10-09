import React from "react";

import * as Styles from "./InfoCardStyles";
import Container from "../Container";
import Button from "../Button";

function InfoCard(props) {
	const { title, description, Image, callback, btnTitle } = props;

	return (
		<Container expand centerVertically centerHorizontally>
			<Styles.Root as="main">
				{Image?.type === "img" && (
					<Styles.ImageContainer>
						<img src={Image.src} alt="ilustration" />
					</Styles.ImageContainer>
				)}
				{Image?.type === "svg" && (
					<Styles.ImageContainer>
						<Image.SVG />
					</Styles.ImageContainer>
				)}
				<h1>{title}</h1>
				{description && <p>{description}</p>}
				{callback && btnTitle && (
					<Button onClick={callback}>{btnTitle}</Button>
				)}
			</Styles.Root>
		</Container>
	);
}

export default InfoCard;
