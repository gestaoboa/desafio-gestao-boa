import {  Text, View } from "react-native";
import { styles } from "./styles";
import FilterButton from "@/component/FilterButton"

// Props do header
interface HeaderProps{
  onFilterChange: (filter: string) => void;
  onSortChange: (sortOrder: string) => void; 
}
export function Header({ onFilterChange, onSortChange }: HeaderProps) {

  return (
    <View style={styles.Header}>
      <Text style={styles.RickAndMorty}>Rick and Morty</Text>
      <FilterButton onFilter={onFilterChange} onSort={onSortChange}/>
    </View>
  );
}


