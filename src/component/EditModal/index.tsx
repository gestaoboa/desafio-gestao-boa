import React, { useState } from "react";
import { Modal, View, Text, TextInput, Button, StyleSheet } from "react-native";
import Character from "@/interfaces/Character";
import { useEffect } from "react";

// Props do modal de editar personagem
interface EditModalProps {
  character: Character;
  visible: boolean;
  onClose: () => void;
  onSave: (updatedCharacter: Character) => void;
}

export default function EditModal({
  character,
  visible,
  onClose,
  onSave,
}: EditModalProps) {
  const [name, setName] = useState(character?.name || "");
  const [status, setStatus] = useState(character?.status || "");
  const [species, setSpecies] = useState(character?.species || "");
  const [gender, setGender] = useState(character?.gender || "");

  // Esse useEffect é responsável por preencher os campos do modal com os valores do personagem
  useEffect(() => {
    setName(character?.name || "");
    setStatus(character?.status || "");
    setSpecies(character?.species || "");
    setGender(character?.gender || "");
  }, [character]);

  // Função para salvar as alterações do personagem
  const handleSave = () => {
    if (character) [onSave({ ...character, name, status, species, gender })];
  };

  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.title}>Edit Character</Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="Name"
          />
          <TextInput
            style={styles.input}
            value={status}
            onChangeText={setStatus}
            placeholder="Status"
          />
          <TextInput
            style={styles.input}
            value={species}
            onChangeText={setSpecies}
            placeholder="Species"
          />
          <TextInput
            style={styles.input}
            value={gender}
            onChangeText={setGender}
            placeholder="Gender"
          />
          <View style={styles.buttonContainer}>
            <Button title="Save" onPress={handleSave} />
            <Button title="Cancel" onPress={onClose} color="red" />
          </View>
        </View>
      </View>
    </Modal>
  );
}

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
  });