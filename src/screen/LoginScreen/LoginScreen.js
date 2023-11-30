import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  TextInputComponent,
  TextInput,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import React, { useLayoutEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import style, { COLORS } from "../../themes/style";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import GoogleLoginButton from "../../components/GoogleLoginButton/GoogleLoginButton";
import Separator from "../../components/Separator/Separator";
import * as yup from "yup";
import { Formik, useFormik } from "formik";
import { styles } from "./styles";
import { useDispatch, useSelector } from "react-redux";
import { loginError, loginUser } from "../../features/Auth/LoginFeatures/LoginSlice";
import Loader from "../../components/Loader/Loader";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LoginScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  
  const {loading,error,isLogin} = useSelector((state)=>state.login)
  const loginValidationSchema = yup.object().shape({
    email: yup
      .string()
      .email("Please enter valid email")
      .required("Email Address is required"),
    password: yup
      .string()
      .min(4, ({ min }) => `Password must be at least ${min} characters`)
      .required("Password is required"),
  });
  
  const formik = useFormik({
    validateOnMount:true,
    validationSchema:loginValidationSchema,
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      
      dispatch(loginUser(values))
      
    },
  });
 
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
            Welcome back!
          </Text>
        </View>
        <View className="w-4/5 mx-auto">
          <Input
            label="E-mail"
            name="email"
            placeholder="example@gmail.com"
            style={styles.textInput}
            onChangeText={formik.handleChange("email")}
            onBlur={formik.handleBlur("email")}
            value={formik.values.email}
            keyboardType="email-address"
          />
          {formik.errors.email && formik.touched.email && (
            <Text style={styles.errorText}>{formik.errors.email}</Text>
          )}
          <Input
            isPassword
            label="Password"
            name="password"
            placeholder="*******"
            onChangeText={formik.handleChange("password")}
            onBlur={formik.handleBlur("password")}
            value={formik.values.password}
            secureTextEntry
          />
          {formik.errors.password && formik.touched.password && (
            <Text style={styles.errorText}>{formik.errors.password}</Text>
          )}
          <Button title="Sign In" onPress={formik.handleSubmit} />
          {loading && (<Loader/>)}
          {error && (<Text style={styles.loginErrorText}>{error}</Text>) }
          
          <View className="flex flex-row mt-5">
            <Text className="text-lg">Don't have account? </Text>
            <View>
              <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
                <Text className="text-lg font-extrabold">Sign up</Text>
              </TouchableOpacity>
            </View>
          </View>
          <Separator text="Or" />
          <GoogleLoginButton />
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default LoginScreen;
