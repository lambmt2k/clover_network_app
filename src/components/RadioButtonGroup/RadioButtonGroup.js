import { View, Text } from "react-native";
import React, { useState } from "react";
import { styles } from "./styles";
import { RadioButton } from "react-native-paper";

const RadioButtonGroup = () => {
  const [selectedValue, setSelectedValue] = useState("option1");
  return (
    <View style={styles.container}>
      <View style={styles.radioGroup}>
        <View style={styles.radioButton}>
          <RadioButton.Android
            value="option1"
            status={selectedValue === "option1" ? "checked" : "unchecked"}
            onPress={() => setSelectedValue("option1")}
            color="#007BFF"
          />
          <Text style={styles.radioLabel}>ReactJS</Text>
        </View>

        <View style={styles.radioButton}>
          <RadioButton.Android
            value="option2"
            status={selectedValue === "option2" ? "checked" : "unchecked"}
            onPress={() => setSelectedValue("option2")}
            color="#007BFF"
          />
          <Text style={styles.radioLabel}>NextJs</Text>
        </View>

        <View style={styles.radioButton}>
          <RadioButton.Android
            value="option3"
            status={selectedValue === "option3" ? "checked" : "unchecked"}
            onPress={() => setSelectedValue("option3")}
            color="#007BFF"
          />
          <Text style={styles.radioLabel}>React Native</Text>
        </View>
      </View>
    </View>
  );
};

export default React.memo(RadioButtonGroup);
