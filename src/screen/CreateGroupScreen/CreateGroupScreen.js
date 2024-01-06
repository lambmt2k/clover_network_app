import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Modal,
  Pressable,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "./styles";
import { colors } from "../../themes/style";
import StyledText from "../../components/StyledText/StyledText";
import { AntDesign } from "@expo/vector-icons";
import * as yup from "yup";
import { useFormik } from "formik";
import { useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import GroupApi from "../../apis/Group";
import { useSelector } from "react-redux";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

const CreateGroupScreen = () => {
  const navigation = useNavigation()
  const [visible, setVisible] = useState(false);
  const [privacy, setPrivacy] = useState();
  const { user } = useSelector((state) => state.login);
  const createGroupValidationSchema = yup.object().shape({
    groupName: yup.string().required("Group name is required"),
    description: yup.string().required("Description is required"),
    groupPrivacy: yup.string().required("You haven't chose group privacy yet"),
  });

  const formik = useFormik({
    validateOnMount: true,
    validationSchema: createGroupValidationSchema,
    initialValues: {
      groupName: "",
      description: "",
      groupPrivacy: "",
    },

    onSubmit: (values) => {
      console.log(values);
      //navigation.navigate('InvitePeopleScreen',{groupId:"test"})
      GroupApi.createGroup(user.tokenId, values)
        .then((res) => {
          console.log(res.data);
          navigation.navigate("InvitePeopleScreen", {
            groupId: res.data.data.groupId,
          });
        })
        .catch((error) => {
          console.log(error);
        });
    },
  });
  const handleChosePrivacy = (status) => {
    if (status === "PUBLIC") {
      setPrivacy("PUBLIC");
      formik.setFieldValue("groupPrivacy", "PUBLIC");
    } else {
      setPrivacy("PRIVATE");
      formik.setFieldValue("groupPrivacy", "PRIVATE");
    }
  };
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ flex: 2 }}>
          <View style={styles.header}>
            <View>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <AntDesign name="close" size={24} color={colors.primary} />
              </TouchableOpacity>
            </View>
            <StyledText title="Create Group" textStyle={styles.headerText} />
            <View></View>
          </View>
          <View>
            <View style={styles.groupInputContainer}>
              <StyledText title="Name" textStyle={styles.inputText} />
              <View style={styles.inputContainer}>
                <TextInput
                  placeholder="Name your group"
                  name="groupName"
                  onChangeText={formik.handleChange("groupName")}
                  onBlur={formik.handleBlur("groupName")}
                  value={formik.values.groupName}
                  style={styles.textInput}
                />
              </View>
            </View>
            <View style={styles.groupInputContainer}>
              <StyledText
                title="Description"
                textStyle={styles.inputTextDesc}
              />
              <StyledText
                title="Let's write something about your group topic"
                textStyle={{ color: colors.secondary, marginBottom: 8 }}
              />
              <View style={styles.inputContainer}>
                <TextInput
                  placeholder="Describle your group"
                  style={styles.textArea}
                  multiline={true}
                  name="description"
                  onChangeText={formik.handleChange("description")}
                  onBlur={formik.handleBlur("description")}
                  value={formik.values.description}
                />
              </View>
            </View>
          </View>
          <View style={styles.divider}></View>
          {
            <View style={styles.centeredView}>
              <Modal visible={visible} animationType="slide" transparent={true}>
                <Pressable
                  style={styles.outside}
                  onPress={() => setVisible(false)}
                >
                  <View style={styles.modalView}>
                    <View style={styles.modalHeader}>
                      <View></View>
                      <View>
                        <StyledText
                          title="Chose privacy"
                          textStyle={styles.headerText}
                        />
                      </View>
                      <View>
                        <StyledText
                          title="Done"
                          textStyle={{ color: colors.primary }}
                        />
                      </View>
                    </View>
                    <TouchableOpacity
                      style={styles.groupPrivacy}
                      onPress={() => handleChosePrivacy("PUBLIC")}
                    >
                      <View style={styles.privacyIcon}>
                        <MaterialIcons name="public" size={24} color="black" />
                      </View>

                      <View style={styles.groupPrivacyRight}>
                        <View style={{ width: 280 }}>
                          <StyledText
                            title="Public"
                            textStyle={{
                              fontSize: 16,
                              fontFamily: "BeVietnamPro_500Medium",
                            }}
                          />
                          <StyledText
                            title="Anyone can see members and news from your group"
                            textStyle={{ fontSize: 14 }}
                          />
                          <StyledText
                            title="( You can change to private later )"
                            textStyle={{
                              fontSize: 12,
                              color: colors.secondary,
                            }}
                          />
                        </View>
                        <View>
                          {privacy === "PUBLIC" ? (
                            <Ionicons
                              name="radio-button-on"
                              size={24}
                              color="black"
                            />
                          ) : (
                            <Ionicons
                              name="radio-button-off"
                              size={24}
                              color="black"
                            />
                          )}
                        </View>
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.groupPrivacy}
                      onPress={() => handleChosePrivacy("PRIVATE")}
                    >
                      <View style={styles.privacyIcon}>
                        <FontAwesome name="lock" size={24} color="black" />
                      </View>

                      <View style={styles.groupPrivacyRight}>
                        <View style={{ width: 280 }}>
                          <StyledText
                            title="Private"
                            textStyle={{
                              fontSize: 16,
                              fontFamily: "BeVietnamPro_500Medium",
                            }}
                          />
                          <StyledText
                            title="Only group members can see members and news from your group"
                            textStyle={{ fontSize: 14 }}
                          />
                          <StyledText
                            title="( You can change to private later )"
                            textStyle={{
                              fontSize: 12,
                              color: colors.secondary,
                            }}
                          />
                        </View>
                        <View>
                          {privacy === "PRIVATE" ? (
                            <Ionicons
                              name="radio-button-on"
                              size={24}
                              color="black"
                            />
                          ) : (
                            <Ionicons
                              name="radio-button-off"
                              size={24}
                              color="black"
                            />
                          )}
                        </View>
                      </View>
                    </TouchableOpacity>
                  </View>
                </Pressable>
              </Modal>
            </View>
          }
          <View>
            <View style={styles.groupInputContainer}>
              <StyledText title="Privacy" textStyle={styles.inputText} />
              <View style={styles.inputContainer}>
                <TouchableOpacity
                  style={styles.privacy}
                  onPress={() => setVisible(true)}
                >
                  <View>
                    <StyledText
                      title={privacy ? privacy : "Chose privacy"}
                      textStyle={{ color: colors.secondary }}
                    />
                  </View>
                  <View>
                    <AntDesign
                      name="caretdown"
                      size={24}
                      color={colors.primary}
                    />
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
        <View style={{ flex: 1, justifyContent: "flex-end" }}>
          <View
            style={{
              borderBottomColor: colors.primary,
              borderBottomWidth: 1,
              backgroundColor: "red",
              marginBottom: 5,
            }}
          ></View>
          <TouchableOpacity
            style={[
              styles.btnCreate,
              {
                backgroundColor:
                  !formik.values.groupName ||
                  !formik.values.description ||
                  !formik.values.groupPrivacy
                    ? colors.secondary
                    : colors.primary,
              },
            ]}
            onPress={formik.handleSubmit}
            disabled={
              !formik.values.groupName ||
              !formik.values.description ||
              !formik.values.groupPrivacy
            }
          >
            <StyledText title="Create group" textStyle={styles.btnText} />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default CreateGroupScreen;
