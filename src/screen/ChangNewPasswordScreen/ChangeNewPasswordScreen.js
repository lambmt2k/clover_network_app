import { View, Text, TouchableWithoutFeedback, Keyboard, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Input from "../../components/Input/Input";
import StyledText from "../../components/StyledText/StyledText";
import { colors } from "../../themes/style";
import Button from "../../components/Button/Button";
import * as yup from "yup";
import { useFormik } from "formik";
import { styles } from "./styles";
import AuthApi from "../../apis/Auth";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { Ionicons } from '@expo/vector-icons';

const ChangeNewPasswordScreen = () => {
  const navigation = useNavigation();
  const { user } = useSelector((state) => state.login);
  
  const passwordRule =
    /^(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9!@#\$%\^\&*\)\(+=._-]{8,}$/;
  const passwordValidationSchema = yup.object().shape({
    oldPassword: yup
    .string()
    .required("Old Password is required"),
    password: yup
      .string()
      .min(8, ({ min }) => `Password must be at least ${min} characters`)
      .matches(
        passwordRule,
        "Password must contain at least 1 lower case letter,1 upper case letter and 1 number"
      )
      .required("Password is required"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password'), null], 'Must match "Password" field value')
  });
  const [error,setError] = useState()

  const formik = useFormik({
    validateOnMount: true,
    validationSchema: passwordValidationSchema,
    initialValues: {
      oldPassword:"",
      password: "",
      confirmPassword: "",
    },
    onSubmit: (values) => {
        const data = {
            oldPassword:values.oldPassword,
            newPassword:values.password,
            repeatNewPassword:values.confirmPassword
        }
        console.log(data)
      AuthApi.changePassword(user.tokenId,data).then(res=>{
        if(res.data.code === 4){
            setError("Wrong old password")
        }
        if(res.data.code === 7){
            setError("New password must be different from old password")
        }
        if(res.data.code === 100){
            setError("")
            navigation.navigate("HomeScreen")
        }
        
        
      }).catch(err=>{
        console.log(err)
      })
    },
  });
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <SafeAreaView style={{ paddingHorizontal: 10 }}>
        <View style={{ alignItems: "center", marginTop: 8, marginBottom: 8,flexDirection:"row" ,justifyContent:"space-between"}}>
        <TouchableOpacity onPress={()=>navigation.goBack()}>
        <Ionicons name="chevron-back" size={24} color={colors.primary} />
        </TouchableOpacity>
          <StyledText
            title="Change your Password"
            textStyle={{
              color: colors.primary,
              fontSize: 24,
              fontFamily: "BeVietnamPro_500Medium",
            }}
          />
          <View></View>
        </View>

        <Input
          label="Old Password"
          placeholder="*******"
          name="oldPassword"
          onChangeText={formik.handleChange("oldPassword")}
          value={formik.values.oldPassword}
          isPassword={true}
        />
        {formik.errors.oldPassword && formik.touched.oldPassword && (
              <Text style={styles.errorText}>{formik.errors.oldPassword}</Text>
            )}
        <Input
          label="Password"
          placeholder="*******"
          name="password"
          onChangeText={formik.handleChange("password")}
          value={formik.values.password}
          isPassword={true}
        />
        {formik.errors.password && formik.touched.password && (
              <Text style={styles.errorText}>{formik.errors.password}</Text>
            )}
        <Input
          label="Repeat new password"
          placeholder="*******"
          name="confirmPassword"
          onChangeText={formik.handleChange("confirmPassword")}
          value={formik.values.confirmPassword}
          isPassword={true}
        />
        {formik.errors.confirmPassword && formik.touched.confirmPassword && (
              <Text style={styles.errorText}>{formik.errors.confirmPassword}</Text>
            )}
        
        
        <Button title="Change password" onPress={formik.handleSubmit} />
        { error && <StyledText title={error} textStyle={styles.errorText}/>}
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default ChangeNewPasswordScreen;
