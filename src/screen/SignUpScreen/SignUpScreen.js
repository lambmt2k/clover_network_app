import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import React from "react";
import style from "../../themes/style";
import { useNavigation } from "@react-navigation/native";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import GoogleLoginButton from "../../components/GoogleLoginButton/GoogleLoginButton";
import RadioButtonGroup from "../../components/RadioButtonGroup/RadioButtonGroup";

const SignUpScreen = () => {
  const navigation = useNavigation();
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <SafeAreaView style={style.droidSafeArea}>
        <View className="flex flex-row	justify-center items-center mt-16">
          <View className=" rounded-full border-2 p-2 border-[#2EA043] mr-2">
            <Image
              source={require("../../../assets/img/clover.png")}
              className="w-12 h-12 "
            />
          </View>
          <Text className={`text-[#2EA043] text-4xl font-bold `}>Clover</Text>
        </View>
        <View className="justify-center items-center my-3">
          <Text className="font-bold text-xl text-[#2EA044]">
            Register now!
          </Text>
        </View>
        <View className="w-4/5 mx-auto">
          <View className="flex-row gap-2">
            <View className="flex-1 ">
              <Input label="First Name" placeholder="John" />
            </View>
            <View className="flex-1">
              <Input label="Last Name" placeholder="Doe" />
            </View>
          </View>
          <Input label="E-mail" placeholder="example@gmail.com" />

          <Input isPassword label="Password" placeholder="*******" />

          <RadioButtonGroup/>

          {/* <Button title="Sign In" onPress={() => navigation.navigate("Home")}/> */}

          
          <View className="flex flex-row mt-5">
            <Text className="text-lg">Already have account? </Text>
            <View>
              <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                <Text className="text-lg font-extrabold">Sign in</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View className="flex-row items-center mt-8">
            <View className="h-px flex-auto bg-slate-400" />
            <View>
              <Text className="text-center w-10 text-lg">Or</Text>
            </View>
            <View className="h-px flex-auto bg-slate-400" />
          </View>
          <GoogleLoginButton/>
          
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default SignUpScreen;
