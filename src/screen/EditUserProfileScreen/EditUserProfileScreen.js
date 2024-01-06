import {
  View,
  Text,
  SafeAreaView,
  Pressable,
  Image,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { styles } from "./styles";
import { colors } from "../../themes/style";
import { Ionicons } from "@expo/vector-icons";
import StyledText from "../../components/StyledText/StyledText";
import { useDispatch, useSelector } from "react-redux";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import UploadModal from "../../components/UploadModal/UploadModal";
import * as ImagePicker from "expo-image-picker";
import UserApi from "../../apis/User";
import { getUserInfo } from "../../features/Auth/UserFeature/UserSlice";
import GroupApi from "../../apis/Group";

const EditUserProfileScreen = () => {
  const { userInfo, loading } = useSelector((state) => state.user);
  const { user } = useSelector((state) => state.login);
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();
  const onPressOut = () => {
    setModalVisible(false);
  };
  const dispatch = useDispatch();
  const [avatar, setAvatar] = useState(userInfo.avatar);
  const [userProfile, setUserProfile] = useState();
  const [background, setBackGround] = useState(userProfile?.userInfo.bannerUrl);
  const [savedMode, setSavedMode] = useState("avatar");
  const uploadImage = async (mode) => {
    try {
      let res = {};
      if (mode === "gallery") {
        await ImagePicker.requestMediaLibraryPermissionsAsync();
        res = await ImagePicker.launchImageLibraryAsync({
          allowsEditing: true,
          aspect: [1, 1],
          quality: 0.1,
        });
      } else {
        await ImagePicker.requestCameraPermissionsAsync();
        res = await ImagePicker.launchCameraAsync({
          cameraType: ImagePicker.CameraType.front,
          allowsEditing: true,
          aspect: [1, 1],
          quality: 0.2,
        });
      }
      if (!res.canceled) {
        const fileType = res.assets[0].uri.substring(
          res.assets[0].uri.lastIndexOf(".") + 1
        );
        console.log(res.assets[0]);
        const fileName = res.assets[0].uri.replace(/^.*[\\\/]/, "");

        // const fileAvt = new File(
        //   [res.assets[0].uri],
        //   `imageFile-${fileName}`,
        //   {
        //     type: fileType,
        //   },
        // )

        const savedImage = { fileType, fileName, uri: res.assets[0].uri };
        await saveImage(savedImage);
      }
    } catch (error) {
      console.log("Error uploading image: " + error.message);
      setModalVisible(false);
    }
  };
  const saveImage = async (image) => {
    try {
      setModalVisible(false);
      sendToBackEnd(image);
    } catch (error) {
      throw error;
    }
  };
  

  const sendToBackEnd = async (image) => {
    try {
      if (savedMode === "avatar") {
        const formData = new FormData();

        formData.append("imageFile", {
          uri: image.uri,
          type: `image/${image.fileType}`,
          name: image.fileName,
        });
        await UserApi.updateUserAvatar(user.tokenId, formData)
          .then((responseData) => {
            dispatch(getUserInfo(user.tokenId));
            setAvatar(image.uri);
          })
          .catch((err) => {
            console.log(err);
          });
      }
      if (savedMode === "background") {
        const formData = new FormData();

        formData.append("bannerFile", {
          uri: image.uri,
          type: `image/${image.fileType}`,
          name: image.fileName,
        });
        formData.append("groupId", userInfo.userWallId);
        
        await GroupApi.changeGroupBanner(user.tokenId, formData)
          .then((res) => {
            console.log(res.data.data);
            dispatch(getUserInfo(user.tokenId));
            setBackGround(res.data.data.group.bannerUrl);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    } catch (error) {
      console.log(error);
    }
  };
  const getUserProfile = () => {
    UserApi.getUserProfile(user.tokenId, userInfo.userId)
      .then((res) => {
        setUserProfile(res.data.data);
        setBackGround(res.data.data.userInfo.bannerUrl)
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const onChangeAvatarPress = () => {
    setSavedMode("avatar"), setModalVisible(true);
  };
  const onChangeBackgroundPress = () => {
    setSavedMode("background"), setModalVisible(true);
  };

  useEffect(() => {
    getUserProfile();
  }, []);
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
      {
        <UploadModal
          modalVisible={modalVisible}
          onPressOut={onPressOut}
          onPressCamera={() => uploadImage()}
          onPressGallery={() => uploadImage("gallery")}
        />
      }
      <ScrollView style={styles.container}>
        <View style={{ marginTop: 10 }}>
          <View style={[styles.flexRow, styles.container]}>
            <View>
              <StyledText title="Avatar" textStyle={styles.textStyle2} />
            </View>
            <Pressable onPress={onChangeAvatarPress}>
              <View>
                <StyledText title="Edit" textStyle={styles.textEdit} />
              </View>
            </Pressable>
          </View>
          <View style={{ alignItems: "center" }}>
            <View style={styles.avatarContainer}>
              <Image source={{ uri: userInfo.avatar }} style={styles.avatar} />
            </View>
          </View>
        </View>
        <View style={styles.divider}></View>
        <View style={{ marginTop: 10 }}>
          <View style={[styles.flexRow, styles.container]}>
            <View>
              <StyledText title="Background" textStyle={styles.textStyle2} />
            </View>
            <Pressable onPress={onChangeBackgroundPress}>
              <View>
                <StyledText title="Edit" textStyle={styles.textEdit} />
              </View>
            </Pressable>
          </View>
          <View style={{ alignItems: "center" }}>
            <View style={styles.bgContainer}>
              <Image
                source={{ uri: background
                        ? background
                        : "https://picsum.photos/1920/1080" }}
                style={styles.userBg}
              />
            </View>
          </View>
        </View>
        <View style={styles.divider}></View>
        <View>
          <View style={[styles.flexRow, styles.container]}>
            <View>
              <StyledText title="Profile" textStyle={styles.textStyle2} />
            </View>
            <Pressable
              onPress={() => navigation.navigate("EditUserInfoScreen")}
            >
              <View>
                <StyledText title="Edit" textStyle={styles.textEdit} />
              </View>
            </Pressable>
          </View>
          <View style={{ marginTop: 10 }}>
            <View style={styles.groupText}>
              <AntDesign name="user" size={24} color={colors.primary} />
              <StyledText
                title={userInfo.firstname + " " + userInfo.lastname}
              />
            </View>
            <View style={styles.groupText}>
              <Feather name="phone" size={24} color={colors.primary} />
              <StyledText
                title={
                  userInfo.phoneNo ? (
                    userInfo.phoneNo
                  ) : (
                    <Text>
                      Don't have phone numbers
                      <StyledText
                        title={" UPDATE NEEDED"}
                        textStyle={styles.textWarning}
                      />
                    </Text>
                  )
                }
              />
            </View>

            <View style={styles.groupText}>
              <FontAwesome
                name="birthday-cake"
                size={24}
                color={colors.primary}
              />
              <StyledText title={userInfo.dayOfBirth} />
            </View>
            <View style={styles.groupText}>
              <FontAwesome
                name="transgender"
                size={24}
                color={colors.primary}
              />
              <StyledText title={userInfo.gender} />
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default EditUserProfileScreen;
