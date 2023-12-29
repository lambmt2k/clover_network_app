import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import StyledText from "../StyledText/StyledText";

const CustomButton = ({ emoji, text, color, ...rest }) => {
  return (
    <TouchableOpacity {...rest}  activeOpacity={0.7}>
      <View style={styles.container}>
        {emoji}
        <View style={{ paddingHorizontal: 4 }} />
        <Text style={[styles.text, { color: color }]}>{text}</Text>
        
      </View>
    </TouchableOpacity>
  );
};

export default CustomButton;
const styles = StyleSheet.create({
  
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    textTransform: "capitalize",
    fontSize: 16,
  },
});
