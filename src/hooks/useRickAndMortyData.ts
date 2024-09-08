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
      console.error("Erro ao carregar personagens:", error);
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
      console.error("Erro ao carregar personagens:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadCharacters();
  }, []);

  const updateStorage = async (updatedCharacters: Character[]) => {
    try {
      await AsyncStorage.setItem(
        "characters",
        JSON.stringify(updatedCharacters)
      );
    } catch (error) {
      console.error("Failed to update characters in storage:", error);
    }
  };

  return {
    characters,
    isLoading,
    setCharacters: (updatedCharacters: Character[]) => {
      setCharacters(updatedCharacters),
      updateStorage(updatedCharacters)
    }
  };
};

export default useRickAndMortyData;
