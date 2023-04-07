// In App.js in a new project

import * as React from "react";
import {
  View,
  Text,
  Button,
  TouchableHighlight,
  StyleSheet,
  ScrollView,
  StatusBar,
  Image,
  ActivityIndicator,
} from "react-native";
import { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import PokemonCard from "./Components/PokemonCard";
import cardImg from "./assets/card-demo-img.png";

// function HomeScreen({ navigation }) {
// 	return (
// 		<View
// 			style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
// 		>
// 			<Text>Home Screen</Text>
// 			<Button
// 				title="Go to Details"
// 				onPress={() => {
// 					/* 1. Navigate to the Details route with params */
// 					navigation.navigate("Details", {
// 						itemId: 86,
// 						otherParam: "anything you want here",
// 					});
// 				}}
// 			/>
// 		</View>
// 	);
// }

// function DetailsScreen({ route, navigation }) {
// 	/* 2. Get the param */
// 	const { itemId, otherParam } = route.params;
// 	return (
// 		<View
// 			style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
// 		>
// 			<Text>Details Screen</Text>
// 			<Text>itemId: {JSON.stringify(itemId)}</Text>
// 			<Text>otherParam: {JSON.stringify(otherParam)}</Text>
// 			<Button
// 				title="Go to Details... again"
// 				onPress={() =>
// 					navigation.push("Details", {
// 						itemId: Math.floor(Math.random() * 100),
// 					})
// 				}
// 			/>
// 			<Button
// 				title="Go to Home"
// 				onPress={() => navigation.navigate("Home")}
// 			/>
// 			<Button title="Go back" onPress={() => navigation.goBack()} />
// 		</View>
// 	);
// }

// --------------------------

function HomeScreen({ navigation }) {
  const [pokemons, setPokemons] = useState({});
  const [doesPokemonsFetched, setDoesPokemonsFetched] = useState(false);
  const [doesActivityLoading, setDoesActivityLoading] = useState(false);

  const getPokemonImg = async (url) => {
    try {
      const response = await fetch(url);
      const json = await response.json();

      const img = json.sprites.other.home.front_default;
      return img;
    } catch (error) {
      console.log(error);
    }
  };

  const getRandomPokemons = async () => {
    setDoesActivityLoading(true);
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/?limit=15`);
    const json = await response.json();

    const fetchedPokemons = await Promise.all(
      json.results.map(async (obj) => {
        const pokemonName = obj.name;
        const pokemonImg = await getPokemonImg(obj.url);

        const pokemonObj = {
          name: pokemonName,
          img: pokemonImg,
        };

        return pokemonObj;
      })
    );

    return fetchedPokemons;
  };
  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <View style={styles.upperSubContainer}>
        <Button
          title="Press me"
          onPress={() => {
            !doesPokemonsFetched
              ? getRandomPokemons().then((result) => {
                  setPokemons(result);
                  setDoesPokemonsFetched(true);
                  setDoesActivityLoading(false);
                })
              : null;
          }}
        />
      </View>

      {doesPokemonsFetched ? (
        <ScrollView style={styles.scrollViewContainer}>
          {pokemons.map((obj) => {
            return (
              <TouchableHighlight
                onPress={() => {
                  // 					/* 1. Navigate to the Details route with params */
                  navigation.navigate("Details", {
                    pokemonName: obj.name,
                    pokemonImg: cardImg,
                  });
                }}
                underlayColor="white"
              >
                <PokemonCard imgSrc={obj.img} pokemonName={obj.name} />
              </TouchableHighlight>
            );
          })}
        </ScrollView>
      ) : (
        <View style={styles.scrollViewContainer}>
          {doesActivityLoading ? (
            <ActivityIndicator size="small" color="#0000ff" />
          ) : (
            <Text>Hello World</Text>
          )}
        </View>
      )}
    </View>
  );
}

function DetailsScreen({ route, navigation }) {
  const { pokemonName, pokemonImg } = route.params;
  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          width: "100%",
          height: 250,
          borderWidth: 2,
          borderColor: "black",
        }}
      >
        <Image
          style={{ width: "100%", height: "100%", resizeMode: "contain" }}
          source={pokemonImg}
        />
      </View>

      <View>
        <Text style={{ color: "black", fontSize: 32, textAlign: "center" }}>
          {pokemonName}
        </Text>
      </View>
    </View>
  );
}

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: "Home" }}
        />
        <Stack.Screen name="Details" component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    borderWidth: 2,
    borderColor: "red",
    flex: 1,
  },
  upperSubContainer: {
    borderWidth: 2,
    borderColor: "yellow",
    display: "flex",
    flex: 0,
  },
  scrollViewContainer: {
    display: "flex",
    flexDirection: "column",
    flex: 2,
    borderWidth: 2,
    borderColor: "brown",
  },
});

// export default App;
// ---------------------------------------

// import { useState } from "react";
// import {
//   StyleSheet,
//   Text,
//   View,
//   Button,
//   ScrollView,
//   StatusBar,
// } from "react-native";
// import PokemonCard from "./Components/PokemonCard";
