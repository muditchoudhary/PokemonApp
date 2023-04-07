import { View, Text, Image, StyleSheet } from "react-native";
import cardImg from "../assets/card-demo-img.png";

export default function PokemonCard(props) {
	return (
		<View style={styles.cardContainer}>
			<View style={styles.imageContainer}>
				<Image
					style={{
						width: "100%",
						height: "100%",
						resizeMode: "contain",
					}}
					source={cardImg}
				/>
			</View>
			<View style={styles.textContainer}>
				<Text style={{ fontSize: 16 }}>{props.pokemonName} </Text>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	cardContainer: {
		display: "flex",
		borderWidth: 1,
		borderColor: "orange",
		width: "100%",
		padding: 5,
		flexDirection: "row",
	},
	imageContainer: {
		flex: 1,
		borderWidth: 1,
		borderColor: "pink",
		padding: 5,
		width: "100%",
		height: 100,
	},
	textContainer: {
		flex: 2,
		borderWidth: 1,
		borderColor: "blue",
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		padding: 5,
	},
});
