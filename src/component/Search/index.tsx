import { useRef } from "react";
import { styles } from "./styles";
import { View, TextInput } from "react-native";

// Props do campo de search
interface Search {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
}
export default function Search({ searchTerm, setSearchTerm }: Search) {
  const inputRef = useRef<TextInput>(null);
  return (
    <View style={styles.Search}>
      <TextInput 
        ref={inputRef}
        style={styles.text}
        placeholder="Digite o nome ou o id do personagem"
        value={searchTerm}
        onChangeText={setSearchTerm}
        onSubmitEditing={() => inputRef.current?.focus()}
      /> 
    </View>
  );
}
