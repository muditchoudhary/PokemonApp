// In App.js in a new project

import * as React from "react";
import { View, Text, Button } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

function HomeScreen({ navigation }) {
	return (
		<View
			style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
		>
			<Text>Home Screen</Text>
			<Button
				title="Go to Details"
				onPress={() => {
					/* 1. Navigate to the Details route with params */
					navigation.navigate("Details", {
						itemId: 86,
						otherParam: "anything you want here",
					});
				}}
			/>
		</View>
	);
}

function DetailsScreen({ route, navigation }) {
	/* 2. Get the param */
	const { itemId, otherParam } = route.params;
	return (
		<View
			style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
		>
			<Text>Details Screen</Text>
			<Text>itemId: {JSON.stringify(itemId)}</Text>
			<Text>otherParam: {JSON.stringify(otherParam)}</Text>
			<Button
				title="Go to Details... again"
				onPress={() =>
					navigation.push("Details", {
						itemId: Math.floor(Math.random() * 100),
					})
				}
			/>
			<Button
				title="Go to Home"
				onPress={() => navigation.navigate("Home")}
			/>
			<Button title="Go back" onPress={() => navigation.goBack()} />
		</View>
	);
}

const Stack = createNativeStackNavigator();

function App() {
	return (
		<NavigationContainer>
			<Stack.Navigator initialRouteName="Home">
				<Stack.Screen
					name="Home"
					component={HomeScreen}
					options={{ title: "Mudit" }}
				/>
				<Stack.Screen name="Details" component={DetailsScreen} />
			</Stack.Navigator>
		</NavigationContainer>
	);
}

export default App;
// ---------------------------------------

// import { useState } from "react";
// import {
// 	StyleSheet,
// 	Text,
// 	View,
// 	Button,
// 	ScrollView,
// 	StatusBar,
// } from "react-native";
// import PokemonCard from "./Components/PokemonCard";

// export default function App() {
// 	const [pokemons, setPokemons] = useState({});
// 	const [doesPokemonsFetched, setDoesPokemonsFetched] = useState(false);

// 	const getPokemonImg = async (url) => {
// 		try {
// 			const response = await fetch(url);
// 			const json = await response.json();

// 			const img = json.sprites.other.home.front_default;
// 			return img;
// 		} catch (error) {
// 			console.log(error);
// 		}
// 	};

// 	const getRandomPokemons = async () => {
// 		const response = await fetch(
// 			`https://pokeapi.co/api/v2/pokemon/?limit=5`
// 		);
// 		const json = await response.json();

// 		const fetchedPokemons = await Promise.all(
// 			json.results.map(async (obj) => {
// 				const pokemonName = obj.name;
// 				const pokemonImg = await getPokemonImg(obj.url);

// 				const pokemonObj = {
// 					name: pokemonName,
// 					img: pokemonImg,
// 				};

// 				return pokemonObj;
// 			})
// 		);

// 		return fetchedPokemons;
// 	};

// 	return (
// 		<View style={styles.container}>
//             <StatusBar hidden />
// 			<View style={{ borderWidth: 2, borderColor: "yellow" }}>
// 				<Button
// 					title="Press me"
// 					onPress={() => {
// 						!doesPokemonsFetched
// 							? getRandomPokemons().then((result) => {
// 									console.log(result);
// 									setPokemons(result);
// 									setDoesPokemonsFetched(true);
// 							  })
// 							: null;
// 					}}
// 				/>
// 			</View>

// 			{doesPokemonsFetched ? (
// 				<ScrollView style={styles.scrollViewContainer}>
// 					{/* <PokemonCard imgSrc={pokemons[0].img} pokemonName={pokemons[0].name} /> */}
// 					{pokemons.map((obj) => {
// 						return (
// 							<PokemonCard
// 								imgSrc={obj.img}
// 								pokemonName={obj.name}
// 							/>
// 						);
// 					})}
// 				</ScrollView>
// 			) : (
// 				<View>
// 					<Text>Hello World</Text>
// 				</View>
// 			)}
// 		</View>
// 	);
// }

// const styles = StyleSheet.create({
// 	container: {
// 		width: "100%",
// 		backgroundColor: "green",
// 		borderColor: "red",
// 	},
// 	scrollViewContainer: {
// 		display: "flex",
// 		flexDirection: "column",
// 	},
// });
