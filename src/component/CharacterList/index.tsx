import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  Alert,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import Character from "@/interfaces/Character";
import CharacterModal from "../CharacterModal";
import EditModal from "../EditModal";
import useRickAndMortyData from "@/hooks/useRickAndMortyData"; 

// Props da lista de personagens
interface CharacterListProps {
  searchTerm: string;
  filter: string;
  sortOrder: "asc" | "desc";
}

export default function CharacterList({
  searchTerm,
  filter,
  sortOrder,
}: CharacterListProps) {
  const { characters, isLoading, setCharacters } = useRickAndMortyData(); 
  const [filteredCharacters, setFilteredCharacters] = useState<Character[]>([]);
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(
    null
  );
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);

  // Filtra e ordena os personagens conforme os critérios
  useEffect(() => {
    const getFilteredAndSortedCharacters = () => {
      let filtered = characters;

      if (filter !== "All") {
        filtered = filtered.filter((character) => character.status === filter);
      }

      if (searchTerm) {
        filtered = filtered.filter((character) =>
          character.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }

      filtered = filtered.sort((a, b) => {
        if (a.name < b.name) return sortOrder === "asc" ? -1 : 1;
        if (a.name > b.name) return sortOrder === "asc" ? 1 : -1;
        return 0;
      });

      return filtered;
    };

    setFilteredCharacters(getFilteredAndSortedCharacters());
  }, [searchTerm, filter, sortOrder, characters]);

  // Funções para abrir e fechar o modal de click do personagem
  const openModal = (character: Character) => {
    setSelectedCharacter(character);
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
    setSelectedCharacter(null);
  };

  // Função para excluir um personagem
  const handleDelete = (id: number) => {
    Alert.alert(
      "Exclusão de Personagem",
      "Tem certeza que deseja excluir este personagem?",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Excluir",
          onPress: () => {
            const updatedCharacters = characters.filter(
              (character) => character.id !== id
            );
            setCharacters(updatedCharacters);
          },
          style: "destructive",
        },
      ]
    );
    setIsModalVisible(false);
  };

  // Função para editar um personagem
  const handleEdit = (character: Character) => {
    setSelectedCharacter(character);
    setIsEditModalVisible(true);
    setIsModalVisible(false);
  };

  // Função para salvar as alterações feitas em algum personagem
  const saveEdit = (updatedCharacter: Character) => {
    const updatedCharacters = characters.map((char) =>
      char.id === updatedCharacter.id ? updatedCharacter : char
    );
    setCharacters(updatedCharacters);
    setIsEditModalVisible(false);
  };

  // Função para renderizar os personagens
  const renderItem = ({ item }: { item: Character }) => (
    <TouchableOpacity onPress={() => openModal(item)}>
      <View style={styles.card}>
        <Image source={{ uri: item.image }} style={styles.image} />
        <View style={styles.bgName}>
          <Text style={styles.name}>{item.name}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  if (isLoading) {
    return <Text style={styles.loading}>Loading...</Text>;
  }

  return (
    <View style={styles.container}>
      {filteredCharacters.length === 0 ? (
        <Text style={styles.noResults}>No characters found</Text>
      ) : (
        <FlatList
          numColumns={2}
          columnWrapperStyle={{ justifyContent: "space-between" }}
          showsVerticalScrollIndicator={false}
          style={styles.list}
          data={filteredCharacters}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          keyboardShouldPersistTaps="handled"
        />
      )}
      <CharacterModal
        character={selectedCharacter}
        visible={isModalVisible}
        onClose={closeModal}
        onDelete={() => handleDelete(selectedCharacter?.id!)}
        onEdit={handleEdit}
      />
      {selectedCharacter !== null && (
        <EditModal
          character={selectedCharacter}
          visible={isEditModalVisible}
          onClose={() => setIsEditModalVisible(false)}
          onSave={saveEdit}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  name: {
    color: "white",
    fontSize: 16,
    lineHeight: 16,
    fontFamily: "Raleway",
    fontWeight: "400",
    padding: 5,
    textAlign: "center",
  },
  card: {
    width: 156,
    height: 122,
    borderRadius: 8,
    margin: 5,
    borderColor: "#68C360",
    borderWidth: 2,
  },
  image: {
    width: 152,
    height: 93,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
  bgName: {
    backgroundColor: "#17241A",
    borderBottomEndRadius: 7,
    borderBottomStartRadius: 7,
  },
  list: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  noResults: {
    color: "white",
    fontSize: 18,
    textAlign: "center",
    marginTop: 20,
  },
  loading: {
    color: "white",
    fontSize: 18,
    textAlign: "center",
    marginTop: 20,
  },
});
