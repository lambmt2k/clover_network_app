import { View, Text, TouchableOpacity } from "react-native";
import React, { useEffect } from "react";
import style, { colors } from "../../themes/style";
import { styles } from "./styles";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import LottieView from "lottie-react-native";
import StyledText from "../../components/StyledText/StyledText";

const SignUpSuccessScreen = () => {
  const navigation = useNavigation();
  // useEffect(() => {
  //     setTimeout(() => { navigation.navigate("Login") }, 4000)
  // }, []);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, alignItems: "center", paddingTop: 50 }}>
        <Text style={styles.congate}> Congrats</Text>
        <LottieView
          source={require("../../assets/animation/success.json")}
          autoPlay
          loop
        />
      </View>

      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "space-around",
        }}
      >
        <View style={{alignItems:"center"}}>
          <Text style={styles.text}>Your account has been created!</Text>
          <Text style={styles.text}>
            Please check you email to active you account!
          </Text>
        </View>
        <TouchableOpacity style={styles.btnBack} onPress={()=>navigation.navigate("Login")}>
          <StyledText title="Back To Login" textStyle={{color:colors.white,fontSize:16}}/>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default SignUpSuccessScreen;
