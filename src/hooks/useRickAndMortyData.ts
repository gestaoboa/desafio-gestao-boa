import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState, useEffect } from "react";
import Character from "@/interfaces/Character";

// Hook de fetch da api
const useRickAndMortyData = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Função para dar fetch nos personagens da API
  const fetchCharacters = async () => {
    try {
      const response = await fetch("https://rickandmortyapi.com/api/character");
      const data = await response.json();

      setCharacters(data.results);

      await AsyncStorage.setItem("characters", JSON.stringify(data.results));
    } catch (error) {
      console.error("Failed to fetch characters:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadCharacters = async () => {
    try {
      const storedCharacters = await AsyncStorage.getItem("characters");
      if (storedCharacters) {
        setCharacters(JSON.parse(storedCharacters));
      } else {
        await fetchCharacters();
      }
    } catch (error) {
      console.error("Failed to load characters from storage:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // 
  useEffect(() => {
    loadCharacters();
  }, []);

  return { characters, isLoading, setCharacters };
};

export default useRickAndMortyData;
