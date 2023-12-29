import {
  View,
  Text,
  Pressable,
  TouchableOpacity,
  ScrollView,
  Platform,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import Input from "../../components/Input/Input";
import { useFormik } from "formik";
import * as yup from "yup";
import { styles } from "./styles";
import { RadioButton } from "react-native-paper";
import { useState } from "react";
import { colors } from "../../themes/style";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useDispatch, useSelector } from "react-redux";
import StyledText from "../../components/StyledText/StyledText";
import { Ionicons } from "@expo/vector-icons";
import { useEffect } from "react";
import Button from "../../components/Button/Button";
import UserApi from "../../apis/User";
import { getUserInfo } from "../../features/Auth/UserFeature/UserSlice";
import { SafeAreaView } from "react-native-safe-area-context";

const EditUserInfoScreen = () => {
  const navigation = useNavigation();
  const [showPicker, setShowPicker] = useState(false);

  const [date, setDate] = useState(new Date());
  const togglePicker = () => {
    setShowPicker(!showPicker);
  };
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [signUpMessage, setSignUpMessage] = useState(null);
  const { userInfo, loading } = useSelector((state) => state.user);
  const { user } = useSelector((state) => state.login);
  const [selectedValue, setSelectedValue] = useState();
  const dispatch = useDispatch();
  const formatDate = (rawDate) => {
    let date = new Date(rawDate);
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();

    month = month < 10 ? `0${month}` : month;
    day = day < 10 ? `0${day}` : day;
    console.log(`${day}/${month}/${year}`);
    return `${month}/${day}/${year}`;
  };
  const formatDate2 = (date) => {
    let dateString = date;
    let [day, month, year] = dateString.split("/");

    return `${year}-${month}-${day}`;
  };
  useEffect(() => {
    if (userInfo.gender === "MALE") {
      setSelectedValue(0);
    } else if (userInfo.gender === "FEMALE") {
      setSelectedValue(1);
    } else {
      setSelectedValue(2);
    }
    setDateOfBirth(userInfo.dayOfBirth);
  }, []);
  const phoneRule = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
  const updateValidationSchema = yup.object().shape({
    firstName: yup.string().required("First name is required"),
    lastName: yup.string().required("Last name is required"),
    gender: yup.string().required("Gender is required"),
    dayOfBirth: yup.string().required("Birthday is required"),
    phone: yup
      .string()
      .matches(phoneRule, "Please enter the correct phone number format!")
      .required("Phone number is required"),
  });
  const formik = useFormik({
    validateOnMount: true,
    validationSchema: updateValidationSchema,
    initialValues: {
      firstName: userInfo.firstname,
      lastName: userInfo.lastname,
      phone: userInfo.phoneNo,
      gender: userInfo.gender,
      dayOfBirth: userInfo.dayOfBirth,
    },
    onSubmit: (values) => {
      const updateUserInfo = {
        firstname: values.firstName,
        lastname: values.lastName,
        phoneNo: values.phone,
        dayOfBirth: values.dayOfBirth,
        gender: values.gender,
      };
      console.log(updateUserInfo);
      UserApi.updateUserInfo(user.tokenId, updateUserInfo)
        .then((res) => {
          dispatch(getUserInfo(user.tokenId));
          navigation.goBack();
          console.log(res);
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
    formik.setFieldValue("dayOfBirth", formatDate(date));
    togglePicker();
  };
  return (
    <SafeAreaView>
      <View>
        <View clasName="Header" style={styles.header}>
          <Pressable
            onPress={() => {
              navigation.goBack();
            }}
          >
            <Ionicons name="chevron-back" size={24} color={colors.primary} />
          </Pressable>
          <View>
            <StyledText
              title="Edit user profile"
              textStyle={styles.textStyle}
            />
          </View>
          <View></View>
        </View>
      </View>
      <ScrollView>
        <View>
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
              label="Phone"
              placeholder="Phone No"
              name="phone"
              onChangeText={formik.handleChange("phone")}
              value={formik.values.phone}
              keyboardType="numeric"
            />
            {formik.errors.phone && formik.touched.phone && (
              <Text style={styles.errorText}>{formik.errors.phone}</Text>
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

            {/* {showPicker && (
              <DateTimePickerAndroid
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
            )} */}
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

            {formik.errors.dayOfBirth && formik.touched.dayOfBirth && (
              <Text style={styles.errorText}>{formik.errors.dayOfBirth}</Text>
            )}
            {/* <Pressable style={styles.updateBtn}  onPress={formik.handleSubmit}>
              <StyledText title="Update" textStyle={styles.btnText}/>
            </Pressable> */}
            <Button
              title="Update"
              style={{ marginTop: 15 }}
              onPress={formik.handleSubmit}
            />
            {signUpMessage && (
              <Text style={styles.errorText}>{signUpMessage}</Text>
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default EditUserInfoScreen;
