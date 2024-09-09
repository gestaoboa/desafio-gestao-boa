import React, { useState } from "react";
import { Modal, View, Text, TextInput, Button, StyleSheet } from "react-native";
import Character from "@/interfaces/Character";
import { Picker } from '@react-native-picker/picker';

// Props do modal de adicionar personagem (do botão de adicionar)
interface AddCharacterModalProps {
  visible: boolean;
  onClose: () => void;
  onAddCharacter: (newCharacter: Character) => void;
}

const AddCharacterModal: React.FC<AddCharacterModalProps> = ({
  visible,
  onClose,
  onAddCharacter,
}) => {
  const [name, setName] = useState("");
  const [status, setStatus] = useState("");
  const [species, setSpecies] = useState("");
  const [gender, setGender] = useState("");
  const [image, setImage] = useState("");

  const clearForm = () => {
    setName("");
    setStatus("");
    setSpecies("");
    setGender("");
    setImage("");
  };

  // Função para adicionar um novo personagem através do botão de adicionar
  const handleSave = () => {
    if (!name || !status || !species || !gender || !image) {
      alert("Preencha todos os campos!");
      return;
    }

    const newCharacter: Character = {
      id: Date.now(),
      name,
      status,
      species,
      gender,
      image,
      type: "",
    };
    onAddCharacter(newCharacter);
    onClose();
    clearForm();
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.title}>Add New Character</Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="Name"
            placeholderTextColor={"gray"}
          />
          <Picker
            selectedValue={status}
            style={styles.picker}
            onValueChange={(itemValue: string) => setStatus(itemValue)}
            selectionColor={"black"}
            placeholder="Status"
          >
            <Picker.Item label="Alive" value="Alive" />
            <Picker.Item label="Dead" value="Dead" />
            <Picker.Item label="Unknown" value="Unknown" />
          </Picker>
          <TextInput
            style={styles.input}
            value={species}
            onChangeText={setSpecies}
            placeholder="Species"
            placeholderTextColor={"gray"}
          />
          <Picker
            selectedValue={gender}
            style={styles.picker}
            onValueChange={(itemValue: string) => setGender(itemValue)}
            placeholder="Gender"
            
          >
            <Picker.Item label="Female" value="female" />
            <Picker.Item label="Male" value="male" />
            <Picker.Item label="Unknown" value="unknown" />
          </Picker>
          <TextInput
            style={styles.input}
            value={image}
            onChangeText={setImage}
            placeholder="Image URL"
            placeholderTextColor={"gray"}
          />
          <View style={styles.buttonContainer}>
            <Button title="Save" onPress={handleSave} />
            <Button title="Cancel" onPress={onClose} color="red" />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
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
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 10,
    width: "100%",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  picker: {
    height: 40,
    width: "100%",
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 200,
  },
});

export default AddCharacterModal;
