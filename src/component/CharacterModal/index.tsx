import React from "react";
import { View, Text, Modal, StyleSheet, Image, Button } from "react-native";
import Character from "@/interfaces/Character";

// Prop do modal de personagem
interface CharacterModalProps {
  visible: boolean;
  onClose: () => void;
  character: Character | null;
  onEdit: (character: Character) => void;
  onDelete: () => void;
}
export default function CharacterModal({
  visible,
  onClose,
  character,
  onEdit,
  onDelete,
}: CharacterModalProps) {
  if (!character) {
    return null;
  }

  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Image source={{ uri: character.image }} style={styles.image} />
          <Text style={styles.title}>{character.name}</Text>
          <Text>Status: {character.status}</Text>
          <Text>Species: {character.species}</Text>
          <Text>Gender: {character.gender}</Text>

          {character.type && <Text>Type: {character.type}</Text>}

          <View style={styles.buttonContainer}>
            <Button title="Edit" onPress={() => onEdit(character)} />
            <Button
              title="Delete"
              onPress={onDelete}
              color="red"
            />
          </View>

          <Button title="Close" onPress={onClose} />
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
    alignItems: "center",
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
    width: '80%',
  },
});
