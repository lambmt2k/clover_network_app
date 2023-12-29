import {
  View,
  Text,
  Pressable,
  Image,
  FlatList,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import StyledText from "../../components/StyledText/StyledText";
import { styles } from "./styles";
import { colors } from "../../themes/style";
import { useNavigation } from "@react-navigation/native";
import { Entypo } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import Post from "../../components/Post/Post";
import UploadModal from "../../components/UploadModal/UploadModal";
import * as ImagePicker from "expo-image-picker";
import UserApi from "../../apis/User";
import { Platform } from "react-native";
import { getUserInfo } from "../../features/Auth/UserFeature/UserSlice";
import PostApi from "../../apis/Post";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const UserProfileScreen = () => {
  const { userInfo, loading } = useSelector((state) => state.user);
  const { user } = useSelector((state) => state.login);
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();
  const [fetching, setFetching] = useState(false);
  const [page, setPage] = useState(0);
  const [feeds, setFeeds] = useState([]);
  const [loadMore, setLoadMore] = useState(false);
  const [endData, setEndData] = useState(false);
  const [
    onEndReachedCalledDuringMomentum,
    setOnEndReachedCalledDuringMomentum,
  ] = useState(true);
  const dispatch = useDispatch();
  const renderLoader = () => {
    return loadMore ? (
      <View>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    ) : null;
  };
  const renderNoMore = () => {
    return endData ? (
      <View>
        <StyledText title="You have read all post, Let's post something new" />
      </View>
    ) : null;
  };
  const getFeeds = () => {
    if (fetching) {
      PostApi.getAllGroupPost(user.tokenId, page, userInfo.userWallId)
        .then((res) => {
          setFeeds(res.data.data);
          setFetching(false);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      PostApi.getAllGroupPost(user.tokenId, page, userInfo.userWallId)
        .then((res) => {
          if (res.data.data === null) {
            setLoadMore(false);
            setEndData(true);
          } else {
            setFeeds([...feeds, ...res.data.data]);
            setLoadMore(false);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  
  useEffect(() => {
    dispatch(getUserInfo(user.tokenId));
  }, []);
  useEffect(() => {
    getFeeds();
  }, [page]);

  const handleLoadMore = () => {
    if (!onEndReachedCalledDuringMomentum) {
      setLoadMore(true);
      if (endData === false) {
        setPage(page + 1);
      }
    }
  };

  const renderItem = ({ item }) => <Post data={item} />;
  const onPressOut = () => {
    setModalVisible(false);
  };
  const [avatar, setAvatar] = useState(userInfo?.avatar);
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
    } catch (error) {
      console.log(error);
    }
  };
  const handleRefesh = () => {
    setFetching(true);
    setPage(0);
    setEndData(false);
  };
  return (
    <SafeAreaView>
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
            title={userInfo.firstname + " " + userInfo.lastname}
            textStyle={styles.textStyle}
          />
        </View>
        <MaterialIcons name="mode-edit" size={24} color={colors.primary} />
      </View>
      {
        <UploadModal
          modalVisible={modalVisible}
          onPressOut={onPressOut}
          onPressCamera={() => uploadImage()}
          onPressGallery={() => uploadImage("gallery")}
        />
      }
      <View style={styles.flatlistContainer}>
        <FlatList
          ListHeaderComponent={
            <View>
              <View clasName="groupUserImage">
                <View clasName="bg-image" style={styles.bgContainer}>
                  <Image
                    source={{ uri: "https://picsum.photos/1920/1080" }}
                    style={styles.userBg}
                  />
                  <Pressable>
                    <View style={styles.cameraBg}>
                      <Entypo name="camera" size={24} color="black" />
                    </View>
                  </Pressable>
                </View>
                <View style={styles.avatarContainer}>
                  <Image source={{ uri: avatar }} style={styles.userAvatar} />
                  <Pressable onPress={() => setModalVisible(!modalVisible)}>
                    <View style={styles.cameraAvatar}>
                      <Entypo name="camera" size={24} color="black" />
                    </View>
                  </Pressable>
                </View>
              </View>
              <View style={styles.infoContainer}>
                <StyledText
                  title={userInfo.firstname + " " + userInfo.lastname}
                  textStyle={styles.nameStyle}
                />
                <View style={styles.friendContainer}>
                  <StyledText title={248} textStyle={styles.friendsAmount} />
                  <StyledText title="friends" />
                </View>
                <View>
                  <StyledText title="Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque, illum." />
                </View>
                <Pressable
                  style={({ pressed }) => [
                    {
                      backgroundColor: pressed
                        ? "rgba(46, 160, 67,0.8)"
                        : colors.primary,
                      paddingVertical: 10,
                      borderRadius: 16,
                    },
                    styles.newPost,
                  ]}
                  onPress={() => navigation.navigate("PostScreen")}
                >
                  <AntDesign name="plus" size={18} color="white" />
                  <StyledText title="New Post" textStyle={styles.newPostText} />
                </Pressable>
                <Pressable
                  onPress={() => navigation.navigate("EditUserProfileScreen")}
                  style={({ pressed }) => [
                    {
                      backgroundColor: pressed
                        ? colors.secondary
                        : colors.lightGrey,
                      paddingVertical: 10,
                      borderRadius: 16,
                    },
                    styles.edit,
                  ]}
                >
                  <MaterialIcons
                    name="mode-edit"
                    size={18}
                    color={colors.primary}
                  />
                  <StyledText
                    title="Edit user info"
                    textStyle={styles.editText}
                  />
                </Pressable>
              </View>
              <View className="Post" style={styles.postContainer}>
                <View className="user" style={styles.user}>
                  <View style={styles.userImageContainer}>
                    <Pressable
                      onPress={() => {
                        navigation.navigate("UserScreen");
                      }}
                    >
                      <Image
                        source={{ uri: userInfo?.avatar }}
                        style={styles.userImage}
                      />
                    </Pressable>
                  </View>
                  <Pressable
                    onPress={() => {
                      navigation.navigate("PostScreen");
                    }}
                    style={({ pressed }) => [
                      {
                        backgroundColor: pressed ? colors.lightGrey : "white",
                        paddingVertical: 10,
                        borderRadius: 16,
                      },
                      styles.pressArea,
                    ]}
                  >
                    <StyledText
                      title={`Let's write something...`}
                      textStyle={styles.userText}
                    />
                    {/* <Text style={styles.userText}>What's on your mind? { userInfo?.lastname}</Text> */}
                  </Pressable>

                  <MaterialCommunityIcons
                    name="image-multiple"
                    size={24}
                    color={colors.primary}
                  />
                </View>
              </View>
            </View>
          }
          data={feeds}
          keyExtractor={(item) => item.feedItem.postId}
          renderItem={renderItem}
          onRefresh={handleRefesh}
          refreshing={fetching}
          ListFooterComponent={endData ? renderNoMore : renderLoader}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0}
          onMomentumScrollBegin={() => {
            setOnEndReachedCalledDuringMomentum(false);
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default UserProfileScreen;
