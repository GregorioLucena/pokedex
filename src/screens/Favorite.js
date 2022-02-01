import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { getPokemonsFavoritesApi } from "../api/favorite";

const Favorite = () => {
  const [favorite, setFavorite] = useState(null);
  console.log("entro");
  useEffect(() => {
    (async () => {
      const response = await getPokemonsFavoritesApi();
      console.log(response);
    })();
  });

  return (
    <SafeAreaView>
      <Text>Favorite</Text>
    </SafeAreaView>
  );
};

export default Favorite;
