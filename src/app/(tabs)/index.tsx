import { View, StyleSheet, Text } from "react-native";
import { Header } from "@/component/Header";
import Search from "@/component/Search";
import CharacterList from "@/component/CharacterList";
import { useState } from "react";
import AddButton from "@/component/AddButton";
import AddCharacterModal from "@/component/AddCharacterModal";
import Character from "@/interfaces/Character";


export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("All");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [characters, setCharacters] = useState<Character[]>([]);
  const [isAddCharacterModalVisible, setIsAddCharacterModalVisible] = useState(false);

  // Função para atualizar os personagens da lista de personagens após selecionar o filtro
  const handleFilterChange = (newFilter: string) => {
    setFilter(newFilter);
  };

  // Função para atualizar a ordenação da lista de personagens em asc ou desc
  // Ultimo requisito do desafio 
  const handleSortChange = (newSortOrder: string) => {
    if (newSortOrder === "asc" || newSortOrder === "desc") {
      setSortOrder(newSortOrder);
    } else {
      console.error(`Invalid sort order: ${newSortOrder}`);
    }
  };

  // Função para adicionar um novo personagem através do botão de adicionar que está localizado no meio da tela
  const handleAddCharacter = (newCharacter: Character) => {
    setCharacters((prevCharacters) => [...prevCharacters, newCharacter]);
    setIsAddCharacterModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <Header
        onFilterChange={handleFilterChange}
        onSortChange={handleSortChange}
      />
      <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm}></Search>

      <View>
        <CharacterList
          searchTerm={searchTerm}
          filter={filter}
          sortOrder={sortOrder}
          characters={characters}
          setCharacters={setCharacters}
        />
        <View style={styles.addbutton}>
          <AddButton onPress={() => setIsAddModalVisible(true)} />
        </View>
      </View>
      <AddCharacterModal
        visible={isAddModalVisible}
        onClose={() => setIsAddModalVisible(false)}
        onAddCharacter={handleAddCharacter}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: '#050D05',
    paddingTop: 50,
  },
  text: {
    fontSize: 30,
    color: 'white',
    fontFamily: 'Raleway_900Black',
  },
  addbutton: {
    position: "absolute",
    right: 125,
    bottom: 230
  },
});
