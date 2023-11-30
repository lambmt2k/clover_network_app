import { View, Text, SafeAreaView } from "react-native";
import React, { useEffect } from "react";
import style from "../../themes/style";
import { styles } from "./styles";
import { useNavigation } from "@react-navigation/native";

const SignUpSuccessScreen = () => {
    const navigation = useNavigation();
    useEffect(() => {
        setTimeout(() => { navigation.navigate("Login") }, 4000)
    }, []);
  return (
    <SafeAreaView style={style.droidSafeArea}>
      <View style={styles.container}>
        <Text style={styles.text}>Your account has been created! Please check you email to active you account!</Text>
      </View>
    </SafeAreaView>
  );
};

export default SignUpSuccessScreen;
