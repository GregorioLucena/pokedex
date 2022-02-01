import React, { useState, useEffect } from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { getPokemosApi, getPokemonsDetailsByUrlApi } from "../api/pokemon";
import PokemonList from "../components/PokemonList";

const Pokedex = () => {
  const [pokemons, setPokemons] = useState([]);
  const [nextUrl, setNexturl] = useState(null);

  useEffect(() => {
    (async () => {
      await loadPokemos();
    })();
  }, []);

  const loadPokemos = async () => {
    try {
      const response = await getPokemosApi(nextUrl);
      setNexturl(response.next);
      const pokemonsArray = [];
      for await (const pokemon of response.results) {
        const pokemonsDetails = await getPokemonsDetailsByUrlApi(pokemon.url);

        pokemonsArray.push({
          id: pokemonsDetails.id,
          name: pokemonsDetails.name,
          type: pokemonsDetails.types[0].type.name,
          order: pokemonsDetails.order,
          image:
            pokemonsDetails.sprites.other["official-artwork"].front_default,
        });
      }

      setPokemons([...pokemons, ...pokemonsArray]);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <SafeAreaView>
      <PokemonList
        pokemons={pokemons}
        loadPokemos={loadPokemos}
        isNext={setNexturl}
      />
    </SafeAreaView>
  );
};

export default Pokedex;
