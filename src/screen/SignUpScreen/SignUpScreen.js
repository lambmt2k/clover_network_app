import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  Pressable,
  Platform,
} from "react-native";
import React, { useState } from "react";
import style, { colors } from "../../themes/style";
import { useNavigation } from "@react-navigation/native";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import GoogleLoginButton from "../../components/GoogleLoginButton/GoogleLoginButton";
import RadioButtonGroup from "../../components/RadioButtonGroup/RadioButtonGroup";
import { styles } from "./styles";
import { RadioButton } from "react-native-paper";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as yup from "yup";
import { useFormik } from "formik";
import AuthApi from "../../apis/Auth";

const SignUpScreen = () => {
  const navigation = useNavigation();
  const [selectedValue, setSelectedValue] = useState();
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [signUpMessage, setSignUpMessage] = useState(null);
  const togglePicker = () => {
    setShowPicker(!showPicker);
  };
  const formatDate = (rawDate) => {
    let date = new Date(rawDate);
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();

    month = month < 10 ? `0${month}` : month;
    day = day < 10 ? `0${day}` : day;

    return `${year}-${month}-${day}`;
  };

  const passwordRule =
    /^(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9!@#\$%\^\&*\)\(+=._-]{8,}$/;
  const loginValidationSchema = yup.object().shape({
    firstName: yup.string().required("First name is required"),
    lastName: yup.string().required("Last name is required"),
    gender: yup.string().required("Gender is required"),
    dateOfBirth: yup.string().required("Birthday is required"),
    email: yup
      .string()
      .email("Please enter valid email")
      .required("Email address is required"),
    password: yup
      .string()
      .min(8, ({ min }) => `Password must be at least ${min} characters`)
      .matches(
        passwordRule,
        "Password must contain at least 1 lower case letter,1 upper case letter and 1 number"
      )
      .required("Password is required"),
  });
  const formik = useFormik({
    validateOnMount: true,
    validationSchema: loginValidationSchema,
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      gender: null,
      dateOfBirth: "",
    },
    onSubmit: (values) => {
      const registerInfo = {
        firstname: values.firstName,
        lastname: values.lastName,
        email: values.email,
        password: values.password,
        dayOfBirth: values.dateOfBirth,
        gender: values.gender,
      };
      console.log(registerInfo)
      AuthApi.registerApi(registerInfo)
        .then((res) => {
          console.log(res.data);
          if (res.data.messageEN === "Existed user") {
            setSignUpMessage("Sign up failed, account already exists!");
            return;
          }
          if (res.data.messageEN === "Action success") {
            setSignUpMessage("");
            navigation.navigate("SignUpSuccess");
            return;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  });
  const handleRadioButtonChange = (value) => {
    setSelectedValue(value);
    formik.setFieldValue("gender", value);
  };
  const onChangeDate = ({ type }, selectedDate) => {
    if (type == "set") {
      const currentDate = selectedDate;
      setDate(currentDate);

      if (Platform.OS === "android") {
        togglePicker();
        setDateOfBirth(formatDate(currentDate));
        formik.setFieldValue("dateOfBirth", dateOfBirth);
      }
    } else {
      togglePicker();
    }
  };
  const confirmIOSDate = () => {
    setDateOfBirth(formatDate(date));
    formik.setFieldValue("dateOfBirth", formatDate(date));
    togglePicker();
  };
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <SafeAreaView style={style.droidSafeArea}>
        <ScrollView>
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
                <Input
                  label="First Name"
                  placeholder="John"
                  name="firstName"
                  onChangeText={formik.handleChange("firstName")}
                  value={formik.values.firstName}
                />
                {formik.errors.firstName && formik.touched.firstName && (
                  <Text style={styles.errorText}>
                    {formik.errors.firstName}
                  </Text>
                )}
              </View>

              <View className="flex-1">
                <Input
                  label="Last Name"
                  placeholder="Doe"
                  name="lastName"
                  onChangeText={formik.handleChange("lastName")}
                  value={formik.values.lastName}
                />
                {formik.errors.lastName && formik.touched.lastName && (
                  <Text style={styles.errorText}>{formik.errors.lastName}</Text>
                )}
              </View>
            </View>

            <Input
              label="E-mail"
              placeholder="example@gmail.com"
              name="email"
              onChangeText={formik.handleChange("email")}
              value={formik.values.email}
            />
            {formik.errors.email && formik.touched.email && (
              <Text style={styles.errorText}>{formik.errors.email}</Text>
            )}

            <Input
              isPassword
              label="Password"
              placeholder="*******"
              name="password"
              onChangeText={formik.handleChange("password")}
              value={formik.values.password}
            />
            {formik.errors.password && formik.touched.password && (
              <Text style={styles.errorText}>{formik.errors.password}</Text>
            )}

            <View className="Gender" style={{ marginBottom: 10 }}>
              <Text style={styles.label}>Gender</Text>
              <RadioButton.Group
                onValueChange={(value) => handleRadioButtonChange(value)}
                value={selectedValue}
              >
                <View style={styles.container}>
                  <View style={styles.radioGroup}>
                    <View style={styles.radioButton}>
                      <RadioButton.Android
                        value={0}
                        color={colors.primary}
                        uncheckedColor={colors.primary}
                      />
                      <Text style={styles.radioLabel}>Male</Text>
                    </View>
                    <View
                      className="divider"
                      style={{
                        borderWidth: 1,
                        borderColor: colors.primary,
                        height: "80%",
                      }}
                    ></View>
                    <View style={styles.radioButton}>
                      <RadioButton.Android
                        value={1}
                        color={colors.primary}
                        uncheckedColor={colors.primary}
                      />
                      <Text style={styles.radioLabel}>Female</Text>
                    </View>
                    <View
                      className="divider"
                      style={{
                        borderWidth: 1,
                        borderColor: colors.primary,
                        height: "80%",
                      }}
                    ></View>
                    <View style={styles.radioButton}>
                      <RadioButton.Android
                        value={2}
                        color={colors.primary}
                        uncheckedColor={colors.primary}
                      />
                      <Text style={styles.radioLabel}>Others</Text>
                    </View>
                  </View>
                </View>
              </RadioButton.Group>
            </View>
            {formik.errors.gender && formik.touched.gender && (
              <Text style={styles.errorText}>{formik.errors.gender}</Text>
            )}

            {showPicker && (
              <DateTimePicker
                mode="date"
                value={date}
                display="spinner"
                onChange={onChangeDate}
                maximumDate={new Date()}
              />
            )}
            {showPicker && Platform.OS === "ios" && (
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-around",
                  gap: 10,
                }}
              >
                <Button
                  title="Cancel"
                  style={{
                    width: "50%",
                    paddingVertical: 15,
                    paddingHorizontal: 10,
                  }}
                  onPress={togglePicker}
                />
                <Button
                  title="Ok"
                  style={{
                    width: "50%",
                    paddingVertical: 15,
                    paddingHorizontal: 10,
                  }}
                  onPress={confirmIOSDate}
                />
              </View>
            )}
            {!showPicker && (
              <Pressable onPress={togglePicker}>
                <Input
                  label="Date of birth"
                  placeholder="yyyy-mm-dd"
                  editable={false}
                  value={dateOfBirth}
                  onChangeText={setDateOfBirth}
                  onPressIn={togglePicker}
                  isDate={true}
                />
              </Pressable>
            )}

            {formik.errors.dateOfBirth && formik.touched.dateOfBirth && (
              <Text style={styles.errorText}>{formik.errors.dateOfBirth}</Text>
            )}

            <Button
              title="Sign Up"
              style={{ marginTop: 15 }}
              onPress={formik.handleSubmit}
            />
            {signUpMessage && (
              <Text style={styles.errorText}>{signUpMessage}</Text>
            )}

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
            <GoogleLoginButton />
          </View>
        </ScrollView>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default SignUpScreen;
