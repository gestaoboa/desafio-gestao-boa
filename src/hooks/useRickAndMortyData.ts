import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState, useEffect } from "react";
import Character from "@/interfaces/Character";

// Hook de fetch da api
const useRickAndMortyData = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  // Função para atualizar o AsyncStorage do app
  const updateStorage = async (updatedCharacters: Character[]) => {
    try {
      await AsyncStorage.setItem("characters", JSON.stringify(updatedCharacters));
    } catch (error) {
      console.error("Erro ao atualizar personagens:", error);
    }
  };

  // Função para dar fetch nos personagens da API
  const fetchCharacters = async (page: number) => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `https://rickandmortyapi.com/api/character?page=${page}`
      );
      const data = await response.json();
  
      if (data.results && data.results.length > 0) {
        setCharacters((prevCharacters) => {
          // Adiciona os novos personagens sem sobrescrever os existentes
          const newCharacters = [...prevCharacters, ...data.results];
          const uniqueCharacters = Array.from(
            new Map(newCharacters.map((character) => [character.id, character])).values()
          );
          return uniqueCharacters;
        });
        setPage((prevPage) => prevPage + 1); 
        setHasMore(data.info.next !== null); 
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Erro ao carregar personagens:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Função para carregar os personagens do AsyncStorage
  const loadCharacters = async () => {
    try {
      const storedCharacters = await AsyncStorage.getItem("characters");
      if (storedCharacters) {
        setCharacters(JSON.parse(storedCharacters));
      } else {
        await fetchCharacters(1); 
      }
    } catch (error) {
      console.error("Erro ao carregar personagens:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Carrega os personagens quando o hook for montado
  useEffect(() => {
    loadCharacters();
  }, []);



  return {
    characters,
    isLoading,
    hasMore,
    loadMoreCharacters: () => {
      if (hasMore && !isLoading) {
        fetchCharacters(page);
      }
    },
    setCharacters: (updatedCharacters: Character[]) => {
      setCharacters(updatedCharacters);
      updateStorage(updatedCharacters);
    },
  };
};

export default useRickAndMortyData;
