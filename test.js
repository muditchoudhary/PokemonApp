// const getPokemonImg = async (url) => {
// 	const response = await fetch(url);
// 	const json = await response.json();

// 	const img = json.sprites.other.home.front_default;
// 	return img;
// };

// const getRandomPokemons = async () => {
// 	const response = await fetch(`https://pokeapi.co/api/v2/pokemon/?limit=5`);
// 	const json = await response.json();

// 	const fetchedPokemons = await Promise.all(
// 		json.results.map(async (obj) => {
// 			const pokemonName = obj.name;
// 			const pokemonImg = await getPokemonImg(obj.url);

// 			const pokemonObj = {
// 				name: pokemonName,
// 				img: pokemonImg,
// 			};

// 			return pokemonObj;
// 		})
// 	);

// 	return fetchedPokemons;
// };

// getRandomPokemons();

const doesBothLocationPresent = (
	currentLocation,
	destinationLocation,
	locations
) => {
	let isCurrentLocationPresent = locations.includes(currentLocation);
	let isDestinationLocationPresent = locations.includes(currentLocation);

	if (isCurrentLocationPresent && isDestinationLocationPresent) {
		return true;
	}

	return false;
};

const findBus = (currentLocation, destinationLocation) => {
	// get all the keys
	const jaipurBusesLen = Object.keys(jaipurbuses).length;
	const jaipurBusesObjKeys = Object.keys(jaipurbuses);
	const resultBuses = [];

	for (let i = 0; i < jaipurBusesLen; i++) {
		const currentBusKey = jaipurBusesObjKeys[i];
		const locations = jaipurbuses[currentBusKey].locationRoutes;
		if (
			doesBothLocationPresent(
				currentLocation,
				destinationLocation,
				locations
			)
		) {
			resultBuses.push();
		}
	}

	return resultBuses;
};

const jaipurbuses = {
	bus_6A: {
		busNumer: "6A",
		locationRoutes: ["jhotwara", "vaishali", "amber", "tonk_phatak"],
	},
	bus_3A: {
		busNumer: "3A",
		locationRoutes: ["jhotwara", "vaishali", "sodala", "ajmeri-gate"],
	},
	bus_4A: {
		busNumer: "4A",
		locationRoutes: ["jhotwara", "vaishali", "galta"],
	},
};

const currentLocation = "jhotwara";
const destinationLocation = "tonk_phatak";

const result = findBus(currentLocation, destinationLocation);

result.map((bus) => console.log(bus));
