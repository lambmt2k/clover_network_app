import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import React from "react";
import { colors } from "../../themes/style";

const Loader = () => {
  return (
    <View >
      
      <ActivityIndicator size="small" color={colors.primary}/>
    </View>
  );
};

export default React.memo(Loader);
