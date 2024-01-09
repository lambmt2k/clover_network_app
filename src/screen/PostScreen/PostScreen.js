import {
  View,
  Text,
  Pressable,
  Image,
  TextInput,
  Modal,
  TouchableOpacity,
  Platform,
} from "react-native";
import React, { useCallback, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import StyledText from "../../components/StyledText/StyledText";
import { styles } from "./styles";
import { useSelector } from "react-redux";
import { AntDesign } from "@expo/vector-icons";
import style, { colors } from "../../themes/style";
import { FontAwesome } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import FbGrid from "react-native-fb-image-grid";
import * as ImagePicker from "expo-image-picker";
import { Entypo } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import PostApi from "../../apis/Post";
import { BASE_URL_V2 } from "../../settings/apiConfig";
import { useRef } from "react";
import { FontAwesome5 } from "@expo/vector-icons";

const PostScreen = ({ route }) => {
  const { screen, checkId, userWallId } = route.params;

  const navigation = useNavigation();
  const { userInfo } = useSelector((state) => state.user);
  const { user } = useSelector((state) => state.login);
  const [listImage, setListImage] = useState([]);
  const [visible, setVisible] = useState(false);
  const [content, setContent] = useState("");
  const [privacy, setPrivacy] = useState("PUBLIC");
  const [changeDisplayModal, setChangeDisplayModal] = useState(true);
  const [imageData, setImageData] = useState([]);
  const [errorModal, setErrorModal] = useState(false);
  // const selectFromGalery = () => {
  //   ImagePicker.openPicker({
  //     width: 300,
  //     height: 400,
  //     cropping: true,
  //   }).then((image) => {
  //     console.log(image);
  //   });
  // };
  const onPressCamera = async () => {
    try {
      let res = {};

      await ImagePicker.requestCameraPermissionsAsync();
      res = await ImagePicker.launchCameraAsync({
        cameraType: ImagePicker.CameraType.back,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.2,
      });

      if (!res.canceled) {
        const fileType = res.assets[0].uri.substring(
          res.assets[0].uri.lastIndexOf(".") + 1
        );

        const fileName = res.assets[0].uri.replace(/^.*[\\\/]/, "");

        // const fileAvt = new File(
        //   [res.assets[0].uri],
        //   `imageFile-${fileName}`,
        //   {
        //     type: fileType,
        //   },
        // )

        //const base64Url = `data:image/${fileType};base64,${res.assets[0].base64}`;

        const savedImage = {
          uri: res.assets[0].uri,
          type: `images/${fileType}`,
          name: fileName,
        };

        setVisible(false);
        setImageData([...imageData, savedImage]);
        setListImage([...listImage, savedImage.uri]);
      }
    } catch (error) {
      console.log("Error uploading image: " + error.message);
      setVisible(false);
    }
  };
  const onPressGallery = async () => {
    try {
      let res = {};
      await ImagePicker.requestMediaLibraryPermissionsAsync();
      res = await ImagePicker.launchImageLibraryAsync({
        aspect: [1, 1],
        quality: 0.1,
        base64: true,
        allowsMultipleSelection: true,
      });
      if (!res.canceled) {
        const fileType = res.assets[0].uri.substring(
          res.assets[0].uri.lastIndexOf(".") + 1
        );

        const fileName = res.assets[0].uri.replace(/^.*[\\\/]/, "");

        // const fileAvt = new File(
        //   [res.assets[0].uri],
        //   `imageFile-${fileName}`,
        //   {
        //     type: fileType,
        //   },
        // )
        // console.log(res);
        // let listBase64Url = [];
        // listBase64Url = res.assets.map(
        //   (item) =>
        //     `data:image/${item.uri.substring(
        //       item.uri.lastIndexOf(".") + 1
        //     )};base64,${item.base64}`
        // );
        //const base64Url = `data:image/${fileType};base64,${res.assets[0].base64}`;
        const listImageUrl = res.assets.map((item) => item.uri);
        listImageObject = res.assets.map((item) => {
          const fileType = item.uri.substring(item.uri.lastIndexOf(".") + 1);

          const fileName = item.uri.replace(/^.*[\\\/]/, "");
          const savedImage = {
            uri: item.uri,
            type: `images/${fileType}`,
            name: fileName,
          };
          return savedImage;
        });
        setImageData([...imageData, ...listImageObject]);
        setListImage([...listImage, ...listImageUrl]);
        setVisible(false);
        //saveImage(savedImage);
      }
    } catch (error) {
      console.log("Error uploading image: " + error.message);
      setVisible(false);
    }
  };

  const saveImage = async (image) => {
    try {
      setVisible(false);
      setListImage([...listImage, image.base64Url]);
      //sendToBackEnd(image);
    } catch (error) {
      throw error;
    }
  };
  const handleOnchangeText = (value) => {
    setContent(value);
  };
  const handePressImage = () => {
    setVisible(true);
    setChangeDisplayModal(true);
  };
  const handlePressPrivacy = () => {
    setChangeDisplayModal(false);
    setVisible(true);
  };
  const handleChosePrivacy = (status) => {
    if (status === "PUBLIC") {
      setPrivacy("PUBLIC");
    } else if (status === "FRIEND") {
      setPrivacy("FRIEND");
    } else {
      setPrivacy("ONLY_ME");
    }
  };
  const handlePost = () => {
    let feedItem = {};
    if (screen === "User") {
      feedItem = {
        authorId: userInfo.userId,
        content: content,
        htmlContent: content,
        postToUserWall: true,
        privacyGroupId: userInfo.userWallId,
        privacyType: privacy,
        toUserId: null,
      };
    }

    if (screen === "Group") {
      feedItem = {
        authorId: userInfo.userId,
        content: content,
        htmlContent: content,
        postToUserWall: false,
        privacyGroupId: checkId,
        privacyType: "PUBLIC",
        toUserId: null,
      };
    }
    console.log(screen);
    if (screen === "Friend") {
      feedItem = {
        authorId: userInfo.userId,
        content: content,
        htmlContent: content,
        postToUserWall: true,
        privacyGroupId: userWallId,
        privacyType: "PUBLIC",
        toUserId: checkId,
      };
    }
    console.log(feedItem);

    // const newItem = JSON.stringify(feedItem);
    // const blobData = new Blob([newItem], { type: "application/json" });
    // console.log(typeof newItem);
    let formData = new FormData();

    formData.append("feedItem", {
      string: JSON.stringify(feedItem), //This is how it works :)
      type: "application/json",
    });

    if (imageData?.length > 0) {
      imageData.forEach((image) => {
        formData.append("images", {
          name: image.name,
          type: image.type,
          uri: image.uri,
        });
      });
    }
    formData.append("images", imageData);

    PostApi.createPost(user.tokenId, formData)
      .then((res) => {
        navigation.goBack();
      })
      .catch((err) => {
        console.log(err);
        setErrorModal(true);
      });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <View style={styles.appBarContainer}>
        <Pressable onPress={() => navigation.goBack()}>
          <View>
            <AntDesign name="close" size={24} color={colors.primary} />
          </View>
        </Pressable>
        <StyledText title="Create Post" textStyle={styles.appBarText} />
        <TouchableOpacity
          onPress={handlePost}
          disabled={!listImage || !content ? true : false}
          style={[
            styles.postButton,
            {
              backgroundColor:
                !listImage || !content ? colors.secondary : colors.primary,
            },
          ]}
        >
          <StyledText title="Post" textStyle={[styles.postButtonText]} />
        </TouchableOpacity>
      </View>
      <View style={styles.userContainer}>
        <View style={styles.styleLeftContainer}>
          <Image source={{ uri: userInfo.avatar }} style={styles.userImage} />
          <View>
            <StyledText
              title={`${userInfo.firstname} ${userInfo.lastname}`}
              textStyle={styles.username}
            />
            <View>
            {screen === "User" ?<TouchableOpacity onPress={handlePressPrivacy}>
                {privacy === "ONLY_ME" ? (
                  <View style={styles.privacy}>
                    <FontAwesome name="lock" size={14} color="#b1b4b6" />
                    <StyledText
                      title="Only Me"
                      textStyle={styles.privacyText}
                    />
                  </View>
                ) : privacy === "FRIEND" ? (
                  <View style={styles.privacy}>
                    <FontAwesome5 name="user-friends" size={14} color="#b1b4b6" />
                    <StyledText title="Friend" textStyle={styles.privacyText} />
                  </View>
                ) : (
                  <View style={styles.privacy}>
                    <MaterialIcons name="public" size={14} color="#b1b4b6" />
                    <StyledText title="Public" textStyle={styles.privacyText} />
                  </View>
                )}
              </TouchableOpacity>:null}
              
            </View>
          </View>
        </View>
        <View>
          <TouchableOpacity onPress={handePressImage}>
            <MaterialCommunityIcons
              name="image-multiple"
              size={32}
              color={colors.primary}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.textArea}>
        <TextInput
          placeholder="What's on your mind?"
          multiline={true}
          placeholderTextColor={colors.primary}
          onChangeText={handleOnchangeText}
        />
      </View>
      <View style={{ width: "100%", height: 400 }}>
        <FbGrid images={listImage} onPress={() => console.log("press")} />
      </View>

      {
        <View style={styles.centeredView}>
          <Modal visible={visible} animationType="slide" transparent={true}>
            <Pressable style={styles.outside} onPress={() => setVisible(false)}>
              {changeDisplayModal ? (
                <View style={styles.modalView}>
                  <View style={styles.iconContainer}>
                    <TouchableOpacity onPress={onPressCamera}>
                      <View style={styles.groupIcon}>
                        <AntDesign
                          name="camera"
                          size={24}
                          color={colors.primary}
                        />
                        <StyledText title="Pick Image From Camera" />
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={onPressGallery}>
                      <View style={styles.groupIcon}>
                        <Entypo name="image" size={24} color={colors.primary} />
                        <StyledText title="Pick Image From Gallery" />
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
              ) : (
                <View style={styles.modalViewPivacy}>
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
                          title="(Everyone on Clover )"
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
                    onPress={() => handleChosePrivacy("FRIEND")}
                  >
                    <View style={styles.privacyIcon}>
                      <FontAwesome5
                        name="user-friends"
                        size={24}
                        color="black"
                      />
                    </View>

                    <View style={styles.groupPrivacyRight}>
                      <View style={{ width: 280 }}>
                        <StyledText
                          title="Friends"
                          textStyle={{
                            fontSize: 16,
                            fontFamily: "BeVietnamPro_500Medium",
                          }}
                        />
                        <StyledText
                          title="(Only your Friends )"
                          textStyle={{
                            fontSize: 12,
                            color: colors.secondary,
                          }}
                        />
                      </View>
                      <View>
                        {privacy === "FRIEND" ? (
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
                    onPress={() => handleChosePrivacy("ONLY_ME")}
                  >
                    <View style={styles.privacyIcon}>
                      <FontAwesome name="lock" size={24} color="black" />
                    </View>

                    <View style={styles.groupPrivacyRight}>
                      <View style={{ width: 280 }}>
                        <StyledText
                          title="Only Me"
                          textStyle={{
                            fontSize: 16,
                            fontFamily: "BeVietnamPro_500Medium",
                          }}
                        />

                        <StyledText
                          title="(Only you )"
                          textStyle={{
                            fontSize: 12,
                            color: colors.secondary,
                          }}
                        />
                      </View>
                      <View>
                        {privacy === "ONLY_ME" ? (
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
              )}
            </Pressable>
          </Modal>
        </View>
      }
      {
        <View style={styles.centeredView}>
          <Modal animationType="slide" transparent={true} visible={errorModal}>
            <Pressable
              style={styles.outside}
              onPress={() => setErrorModal(false)}
            >
              <View style={styles.centeredView}>
                <View style={styles.modalViewError}>
                  <StyledText
                    title="Your images too large! Please chose again!"
                    textStyle={styles.modalErrorText}
                  />
                  <Entypo name="emoji-sad" size={24} color={colors.primary} />
                </View>
              </View>
            </Pressable>
          </Modal>
        </View>
      }
    </SafeAreaView>
  );
};

export default PostScreen;
