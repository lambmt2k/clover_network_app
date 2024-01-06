import { View, Text, TouchableWithoutFeedback, Keyboard } from "react-native";
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

const ChangePasswordScreen = ({ route }) => {
  const { email } = route.params;
  const navigation = useNavigation();
  
  const passwordRule =
    /^(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9!@#\$%\^\&*\)\(+=._-]{8,}$/;
  const passwordValidationSchema = yup.object().shape({
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
      .oneOf([yup.ref('password'), null], 'Must match "Password" field value'),
    otp: yup.number().required("OTP is required"),
  });
  const [error,setError] = useState()

  const formik = useFormik({
    validateOnMount: true,
    validationSchema: passwordValidationSchema,
    initialValues: {
      email,
      password: "",
      confirmPassword: "",
      otp: null,
    },
    onSubmit: (values) => {
        const data = {
            email:values.email,
            newPassword:values.password,
            repeatNewPassword:values.confirmPassword,
            otp:values.otp
        }
      AuthApi.resetPassword(data).then(res=>{
        if( res.data.code === 5){
            setError(res.data.messageEN)
        }
        if(res.data.code === 100){
            setError(false)
            navigation.navigate("Login");
        }
        
      }).catch(err=>{
        console.log(err)
      })
    },
  });
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <SafeAreaView style={{ paddingHorizontal: 10 }}>
        <View style={{ alignItems: "center", marginTop: 8, marginBottom: 8 }}>
          <StyledText
            title="Change your Password"
            textStyle={{
              color: colors.primary,
              fontSize: 24,
              fontFamily: "BeVietnamPro_500Medium",
            }}
          />
        </View>

        <Input label="Email" value={email} editable={false} />
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
        <Input
          label="OTP (Enter the OTP send to your email)"
          keyboardType="numeric"
          name="otp"
          onChangeText={formik.handleChange("otp")}
          value={formik.values.otp}
          maxLength={6}
        />
        {formik.errors.otp && formik.touched.otp && (
              <Text style={styles.errorText}>{formik.errors.otp}</Text>
            )}
        <Button title="Reset password" onPress={formik.handleSubmit} />
        { error && <StyledText title={error} textStyle={styles.errorText}/>}
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default ChangePasswordScreen;
