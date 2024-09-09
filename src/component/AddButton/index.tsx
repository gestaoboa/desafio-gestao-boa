import React from "react";
import { TouchableOpacity, Image, StyleSheet } from "react-native";
import Character from "@/interfaces/Character";
import useRickAndMortyData from "@/hooks/useRickAndMortyData";

interface AddButtonProps {
  onPress: () => void;
}

const AddButton: React.FC<AddButtonProps> = ({ onPress }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Image
        style={styles.Add_button}
        source={{
          uri: "https://firebasestorage.googleapis.com/v0/b/unify-v3-copy.appspot.com/o/pep24cpgcl-1%3A66?alt=media&token=87d76adc-2131-432e-89e4-8f11ae9e628b",
        }}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    position: "absolute",
    bottom: 30,
    right: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  Add_button: {
    width: 120,
    height: 120,
  },
});

export default AddButton;