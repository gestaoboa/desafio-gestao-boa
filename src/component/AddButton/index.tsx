import React from "react";
import { TouchableOpacity, StyleSheet, Image } from "react-native";

// Props do botão de adicionar personagem
interface AddCharacterButtonProps {
    onPress: () => void;
  }

export default function AddButton({onPress}: AddCharacterButtonProps) {
  return (
    <TouchableOpacity onPress={onPress}>
      <Image
        style={styles.Add_button}
        source={{
          uri: "https://firebasestorage.googleapis.com/v0/b/unify-v3-copy.appspot.com/o/pep24cpgcl-1%3A66?alt=media&token=87d76adc-2131-432e-89e4-8f11ae9e628b",
        }}
        
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  Add_button: {
    width: 120,
    height: 120,
  },
});
