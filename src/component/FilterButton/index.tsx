import React, { useState } from "react";
import {
  View,
  Text,
  Modal,
  Button,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import { Picker } from "@react-native-picker/picker";

// Props do botão de adicionar personagem
interface FilterButtonProps {
    onFilter: (status: string) => void;
    onSort: (order: "asc" | "desc") => void;
  }

  // Botão de filtro que está localizado no Header 
export default function FilterButton({
  onFilter,
  onSort,
}: FilterButtonProps) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  // Funções para abrir e fechar o modal
  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const handleApply = () => {
    onFilter(selectedFilter);
    onSort(sortOrder);
    toggleModal();
  };

  return (
    <>
      <TouchableOpacity onPress={toggleModal}>
        <Image
          style={styles.Fav_button}
          source={{
            uri: "https://firebasestorage.googleapis.com/v0/b/unify-v3-copy.appspot.com/o/ap8bwuv85ii-1:21?alt=media&token=64f4cd17-0e03-46a6-aed3-3a73525493d7",
          }}
        />
      </TouchableOpacity>

      <Modal visible={isModalVisible} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.title}>Filter and Sort</Text>
            <Text>Filter by Status:</Text>
            <Picker
              selectedValue={selectedFilter}
              onValueChange={(itemValue) => setSelectedFilter(itemValue)}
              style={styles.picker}
            >
              <Picker.Item label="All" value="All" />
              <Picker.Item label="Alive" value="Alive" />
              <Picker.Item label="Dead" value="Dead" />
            </Picker>
            <Text>Sort by Name:</Text>
            <Picker
              selectedValue={sortOrder}
              onValueChange={(itemValue) => setSortOrder(itemValue)}
              style={styles.picker}
            >
              <Picker.Item label="Ascending" value="asc" />
              <Picker.Item label="Descending" value="desc" />
            </Picker>
            <View style={styles.buttonContainer}>
              <Button title="Apply" onPress={handleApply} />
              <Button title="Close" onPress={toggleModal} color="red" />
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
    Fav_button: {
      width: 60,
      height: 60,
    },
    modalContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modalContent: {
      backgroundColor: "white",
      padding: 20,
      borderRadius: 10,
      width: 300,
      alignItems: "center",
    },
    title: {
      fontSize: 18,
      fontWeight: "bold",
      marginBottom: 10,
    },
    picker: {
      width: 150,
      marginBottom: 20,
    },
    buttonContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      width: "100%",
    },
  });
