import { View, Text } from "react-native";
import React, { useState } from "react";
import { styles } from "./styles";
import { RadioButton } from "react-native-paper";
import { colors } from "../../themes/style";

const RadioButtonGroup = ({label}) => {
  const [selectedValue, setSelectedValue] = useState("option1");
  return (
    <View>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.container}>
        <View style={styles.radioGroup}>
          <View style={styles.radioButton}>
            <RadioButton.Android
              value="option1"
              status={selectedValue === "option1" ? "checked" : "unchecked"}
              onPress={() => setSelectedValue("option1")}
              color={colors.primary}
            />
            <Text style={styles.radioLabel}>Male</Text>
          </View>

          <View style={styles.radioButton}>
            <RadioButton.Android
              value="option2"
              status={selectedValue === "option2" ? "checked" : "unchecked"}
              onPress={() => setSelectedValue("option2")}
              color={colors.primary}
            />
            <Text style={styles.radioLabel}>Female</Text>
          </View>

          <View style={styles.radioButton}>
            <RadioButton.Android
              value="option3"
              status={selectedValue === "option3" ? "checked" : "unchecked"}
              onPress={() => setSelectedValue("option3")}
              color={colors.primary}
            />
            <Text style={styles.radioLabel}>Others</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default React.memo(RadioButtonGroup);
