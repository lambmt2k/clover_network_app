import {
  View,
  Text,
  Pressable,
  Image,
  FlatList,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
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
import GroupApi from "../../apis/Group";
import { updateFollowingList } from "../../features/Friend/FriendSlice";

const UserProfileScreen = ({ route }) => {
  const { userId } = route.params;
  const { userInfo } = useSelector((state) => state.user);
  const { user } = useSelector((state) => state.login);
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();
  const [fetching, setFetching] = useState(false);
  const [page, setPage] = useState(0);
  const [feeds, setFeeds] = useState([]);
  const [loadMore, setLoadMore] = useState(false);
  const [endData, setEndData] = useState(false);
  const [savedMode, setSavedMode] = useState("avatar");
  const [
    onEndReachedCalledDuringMomentum,
    setOnEndReachedCalledDuringMomentum,
  ] = useState(true);
  const [firstLoad, setFirstLoad] = useState(true);
  const [userProfile, setUserProfile] = useState();
  const [canPost,setCanPost] = useState()
  const dispatch = useDispatch();
  const [loading,setLoading] = useState(true)
  const [updateFollow,setUpdateFollow] = useState(false)
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
        
      </View>
    ) : null;
  };
  const getFeeds = () => {
    if (fetching) {
      PostApi.getAllGroupPost(
        user.tokenId,
        page,
        userProfile?.userInfo.userWallId
      )
        .then((res) => {
          setFeeds(res.data.data);
          setFetching(false);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      PostApi.getAllGroupPost(
        user.tokenId,
        page,
        userProfile?.userInfo.userWallId
      )
        .then((res) => {
          if (res.data.data === null) {
            setLoadMore(false);
            setEndData(true);
          } else {
            if (firstLoad) {
              setFeeds(res.data.data);
              setFirstLoad(false);
            } else {
              const newFeedsData = [...feeds, ...res.data.data];
              const uniqueFeedIds = [];
              //const uniqueFeedsId = [...new Set(newFeedsData.map((it)=>it.feedItem?.postId))]
              const newFeeds = newFeedsData.filter((it) => {
                const isDuplicate = uniqueFeedIds.includes(it.feedItem.postId);
                if (!isDuplicate) {
                  uniqueFeedIds.push(it.feedItem.postId);
                  return true;
                }
                return false;
              });

              setFeeds(newFeeds);
              setLoadMore(false);
            }
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  const checkCanPost = ()=>{
    GroupApi.canPost(user.tokenId,userProfile?.userInfo.userWallId).then(res=>{
     setCanPost(res.data)
    }).catch(err=>{
      console.log(err)
    })
  }
  const getUserProfile = () => {
    UserApi.getUserProfile(user.tokenId, userId)
      .then((res) => {
        setUserProfile(res.data.data);
        setBackGround(res.data.data.userInfo.bannerUrl);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  // const [profileData,setProfileData] = useState()
  // const [currentUserId,setCurrentUserId] = useState()
  const [isOneUser, setIsOneUser] = useState();
  const compareUser = () => {
    if (userInfo?.userId === userId) {
      setIsOneUser(true);
    } else setIsOneUser(false);
    
  };
  const follow = (userId,status) => {
    const data = {
      targetUserId: userId,
      status
    };
    UserApi.connectUser(user.tokenId, data)
      .then((res) => {
        setUpdateFollow(!updateFollow)
        dispatch(updateFollowingList())
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    dispatch(getUserInfo(user.tokenId));
    compareUser();
    
    getUserProfile();
  }, [updateFollow]);
  useEffect(() => {
    getFeeds()
    checkCanPost()
  }, [page, fetching,userProfile]);

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

  const [background, setBackGround] = useState();
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
  const handleRefesh = () => {
    if (endData) {
      setPage(0);
      setEndData(false);
    }
    setFetching(true);
  };
  const onChangeAvatarPress = () => {
    setSavedMode("avatar"), setModalVisible(true);
  };
  const onChangeBackgroundPress = () => {
    setSavedMode("background"), setModalVisible(true);
  };
  const renderEmpty = () => {
    return (
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <MaterialIcons name="article" size={60} color={colors.primary} />
        <StyledText title="This user doesn't have any post yet" />
      </View>
    );
  };
  // if(loading) return<View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
  //   <ActivityIndicator color={colors.primary} size="large"/>
  // </View>
  return (
    <SafeAreaView
      style={{ flex: 1, marginBottom: Platform.OS === "ios" ? -35 : 0 }}
    >
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
            title={
              userProfile?.userInfo.firstname +
              " " +
              userProfile?.userInfo.lastname
            }
            textStyle={styles.textStyle}
          />
        </View>
        {isOneUser ? <MaterialIcons name="mode-edit" size={24} color={colors.primary}  />:  <View></View>}
      </View>

      <View style={{ flex: 1 }}>
        <FlatList
          ListHeaderComponent={
            <View>
              <View clasName="groupUserImage">
                <View clasName="bg-image" style={styles.bgContainer}>
                  <Image
                    source={{
                      uri: isOneUser ? userInfo?.bannerUrl: background
                        ? background
                        : "https://picsum.photos/1920/1080",
                    }}
                    style={styles.userBg}
                  />
                  {isOneUser ? (
                    <Pressable onPress={onChangeBackgroundPress}>
                      <View style={styles.cameraBg}>
                        <Entypo name="camera" size={24} color="black" />
                      </View>
                    </Pressable>
                  ) : null}
                </View>
                <View style={styles.avatarContainer}>
                  <Image
                    source={{ uri: isOneUser ? userInfo.avatar : userProfile?.userInfo.avatar }}
                    style={styles.userAvatar}
                  />
                  {isOneUser ? (
                    <Pressable onPress={onChangeAvatarPress}>
                      <View style={styles.cameraAvatar}>
                        <Entypo name="camera" size={24} color="black" />
                      </View>
                    </Pressable>
                  ) : null}
                </View>
              </View>
              <View style={styles.infoContainer}>
                <StyledText
                  title={userProfile?.userInfo.firstname + " " + userProfile?.userInfo.lastname}
                  textStyle={styles.nameStyle}
                />
                <View style={styles.followContainer}>
                  <View style={styles.friendContainer}>
                    <StyledText
                      title={userProfile?.totalConnector}
                      textStyle={styles.friendsAmount}
                    />
                    <StyledText
                      title="followers"
                      textStyle={{ color: colors.secondary }}
                    />
                  </View>
                  <Entypo
                    name="dot-single"
                    size={16}
                    color={colors.secondary}
                  />
                  <View style={styles.friendContainer}>
                    <StyledText
                      title={userProfile?.totalConnect}
                      textStyle={styles.friendsAmount}
                    />
                    <StyledText
                      title="follwing"
                      textStyle={{ color: colors.secondary }}
                    />
                  </View>
                </View>

                {/* <View>
                  <StyledText title="Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque, illum." />
                </View> */}
                {isOneUser ? null : userProfile?.userInfo.connected === false ? (<View>
                  <TouchableOpacity style={styles.folowBtn} onPress={()=>follow(userProfile?.userInfo.userId,1)}>
                    <StyledText title="Follow" textStyle={{color:colors.white,fontSize:16}}/>
                  </TouchableOpacity>
                </View>):(<View>
                  <TouchableOpacity style={styles.folowBtn} onPress={()=>follow(userProfile?.userInfo.userId,0)}>
                    <StyledText title="Unfollow" textStyle={{color:colors.white,fontSize:16}}/>
                  </TouchableOpacity>
                </View>)}
                {isOneUser ? (
                  <View>
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
                      onPress={() => navigation.navigate("PostScreen",{screen:"User"})}
                    >
                      <AntDesign name="plus" size={18} color="white" />
                      <StyledText
                        title="New Post"
                        textStyle={styles.newPostText}
                      />
                    </Pressable>
                    <Pressable
                      onPress={() =>
                        navigation.navigate("EditUserProfileScreen")
                      }
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
                ) : null}
              </View>
              {canPost && <View className="Post" style={styles.postContainer}>
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
                      navigation.navigate("PostScreen",{screen: isOneUser ? "User" : "Friend",checkId:isOneUser? userInfo.userId :userProfile?.userInfo.userId,userWallId:isOneUser ? userInfo.userWallId : userProfile?.userInfo.userWallId});
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
              </View>}
              
            </View>
          }
          data={feeds}
          keyExtractor={(item) => item.feedItem.postId}
          renderItem={renderItem}
          onRefresh={handleRefesh}
          refreshing={fetching}
          ListFooterComponent={endData ? renderNoMore : renderLoader}
          onEndReached={handleLoadMore}
          ListEmptyComponent={renderEmpty}
          onEndReachedThreshold={0}
          onMomentumScrollBegin={() => {
            setOnEndReachedCalledDuringMomentum(false);
          }}
        />
      </View>
      {
        <UploadModal
          modalVisible={modalVisible}
          onPressOut={onPressOut}
          onPressCamera={() => uploadImage()}
          onPressGallery={() => uploadImage("gallery")}
        />
      }
    </SafeAreaView>
  );
};

export default UserProfileScreen;
