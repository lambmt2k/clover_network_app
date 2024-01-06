import {
  View,
  Text,
  Pressable,
  Image,
  FlatList,
  ScrollView,
  ActivityIndicator,
  Modal,
  TouchableOpacity,
  StatusBar,
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
import GroupApi from "../../apis/Group";
import { FontAwesome } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import GroupPrivate from "../../components/GroupPrivate/GroupPrivate";

const GroupDetailScreen = ({ route }) => {
  const { groupId } = route.params;

  const { userInfo, loading } = useSelector((state) => state.user);
  const { user } = useSelector((state) => state.login);
  const [modalVisible, setModalVisible] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [page, setPage] = useState(0);
  const [feeds, setFeeds] = useState([]);
  const [loadMore, setLoadMore] = useState(false);
  const [endData, setEndData] = useState(false);
  const [groupInfo, setGroupInfo] = useState([]);
  const [userStatus, setUserStaus] = useState();
  const [visible, setVisible] = useState(false);
  const [
    onEndReachedCalledDuringMomentum,
    setOnEndReachedCalledDuringMomentum,
  ] = useState(true);
  const [firstLoad, setFirstLoad] = useState(true);
  const [background, setBackGround] = useState();
  const renderLoader = () => {
    return loadMore ? (
      <View>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    ) : null;
  };
  const renderNoMore = () => {
    return endData ? <View></View> : null;
  };
  const getFeeds = () => {
    if (fetching) {
      PostApi.getAllGroupPost(user.tokenId, page, groupId)
        .then((res) => {
          setFeeds(res.data.data);
          setFetching(false);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      PostApi.getAllGroupPost(user.tokenId, page, groupId)
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
  const getGroupInfo = () => {
    GroupApi.getGroupInfo(user.tokenId, groupId)
      .then((res) => {
        setGroupInfo(res.data.data);
        setUserStaus(res.data.data.currentUserRole);
        setBackGround(res.data.data.group.bannerUrl);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    dispatch(getUserInfo(user.tokenId));
    getGroupInfo();
  }, []);
  useEffect(() => {
    getFeeds();
  }, [page, fetching]);

  const handleLoadMore = () => {
    if (!onEndReachedCalledDuringMomentum) {
      setLoadMore(true);
      if (endData === false) {
        setPage(page + 1);
      }
    }
  };
  const navigation = useNavigation();
  const handleRefesh = () => {
    if (endData) {
      setPage(0);
      setEndData(false);
    }
    setFetching(true);
  };

  const dispatch = useDispatch();
  const renderItem = ({ item }) => <Post data={item} screen="Group" />;
  const onPressOut = () => {
    setModalVisible(false);
  };
  const [avatar, setAvatar] = useState(userInfo?.avatar);
  const handleOpenGallery = async () => {
    try {
      let res = {};

      await ImagePicker.requestMediaLibraryPermissionsAsync();
      res = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.1,
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
      sendToBackEnd(image);
    } catch (error) {
      throw error;
    }
  };

  const sendToBackEnd = async (image) => {
    try {
      const formData = new FormData();

      formData.append("bannerFile", {
        uri: image.uri,
        type: `image/${image.fileType}`,
        name: image.fileName,
      });
      formData.append("groupId", groupId);

      await GroupApi.changeGroupBanner(user.tokenId, formData)
        .then((res) => {
          setBackGround(res.data.data.group.bannerUrl);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log(error);
    }
  };
  const handleRenderEmpty = () => {
    return (
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <MaterialIcons name="article" size={60} color={colors.primary} />
        <StyledText title="This group doesn't have any post yet" />
      </View>
    );
  };
  const handleJoinGroup = () => {
    console.log("Join");
    GroupApi.joinGroup(user.tokenId, groupId)
      .then((res) => {
        getGroupInfo();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleLeaveGroup = () => {
    console.log("leave");
    GroupApi.leaveGroup(user.tokenId, groupId)
      .then((res) => {
        setModalVisible(false);
        getGroupInfo();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  if (
    groupInfo.group?.groupPrivacy === "PRIVATE" &&
    !groupInfo.currentUserRole
  ) {
    return <GroupPrivate />;
  }
  return (
    <View
      style={{
        backgroundColor: userStatus ? colors.white : colors.primary,
        flex: 1,
      }}
    >
      <View
        clasName="Header"
        style={[
          styles.header,
          {
            backgroundColor: userStatus ? colors.white : colors.primary,
            marginTop: Platform.OS === "ios" ? 44 : 44,
          },
        ]}
      >
        <Pressable
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Ionicons
            name="chevron-back"
            size={28}
            color={userStatus ? colors.primary : colors.white}
          />
        </Pressable>
        <View style={styles.headerRightCont}>
          <View style={{ flex: 1 }}>
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 10 }}
            >
              {background ? (
                <Image
                  style={{ width: 40, height: 40 }}
                  source={{ uri: background }}
                />
              ) : (
                <Image
                  style={{ width: 40, height: 40, borderRadius: 4 }}
                  source={require("../../assets/img/backGroundDefault.png")}
                />
              )}

              <Text
                numberOfLines={1}
                ellipsizeMode="tail"
                style={[
                  styles.textStyle,
                  { color: userStatus ? colors.black : colors.white },
                ]}
              >
                {groupInfo.group?.groupName}
              </Text>
            </View>
          </View>
          <View>
            {userStatus && userStatus?.roleId === "OWNER" && (
              <Entypo
                name="shield"
                size={28}
                color={userStatus ? colors.primary : colors.white}
              />
            )}
          </View>
        </View>
      </View>

      <View style={styles.flatlistContainer}>
        <FlatList
          ListHeaderComponent={
            <View>
              <View clasName="groupUserImage">
                <View clasName="bg-image" style={styles.bgContainer}>
                  {background ? (
                    <Image source={{ uri: background }} style={styles.userBg} />
                  ) : (
                    <Image
                      source={require("../../assets/img/backGroundDefault.png")}
                      style={styles.userBg}
                    />
                  )}
                  {userStatus && userStatus.roleId === "OWNER" && (
                    <Pressable onPress={handleOpenGallery}>
                      <View style={styles.cameraBg}>
                        <Entypo name="camera" size={24} color="black" />
                      </View>
                    </Pressable>
                  )}
                </View>
              </View>
              <View style={styles.infoContainer}>
                <StyledText
                  title={groupInfo.group?.groupName}
                  textStyle={styles.nameStyle}
                />
                {groupInfo.group?.groupPrivacy === "PUBLIC" ? (
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 3,
                      }}
                    >
                      <MaterialIcons name="public" size={16} color="black" />
                      <StyledText title="Public group" />
                    </View>
                    <Entypo name="dot-single" size={12} color="black" />
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate("GroupMemberScreen", { groupInfo })
                      }
                    >
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          gap: 3,
                        }}
                      >
                        <StyledText
                          title={groupInfo.group?.totalMember}
                          textStyle={{
                            color: colors.black,
                            fontFamily: "BeVietnamPro_600SemiBold",
                            fontSize: 15,
                          }}
                        />
                        <StyledText title="members" />
                      </View>
                    </TouchableOpacity>
                  </View>
                ) : (
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 3,
                      }}
                    >
                      <FontAwesome name="lock" size={16} color="black" />
                      <StyledText title="Private group" />
                    </View>
                    <Entypo name="dot-single" size={12} color="black" />
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 3,
                      }}
                    >
                      <StyledText
                        title={groupInfo.group?.totalMember}
                        textStyle={{
                          color: colors.black,
                          fontFamily: "BeVietnamPro_600SemiBold",
                          fontSize: 15,
                        }}
                      />
                      <StyledText title="members" />
                    </View>
                  </View>
                )}
                {userStatus ? (
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "center",
                      flex: 1,
                      gap: 5,
                    }}
                  >
                    {userStatus?.roleId === "OWNER" ? (
                      groupInfo?.group.groupPrivacy === "PUBLIC" ? (
                        <Pressable
                          style={({ pressed }) => [
                            {
                              backgroundColor: pressed
                                ? "rgba(46, 160, 67,0.8)"
                                : colors.primary,
                              paddingVertical: 10,
                              borderRadius: 16,
                            },
                            styles.manageGroup,
                          ]}
                        >
                          <Entypo
                            name="shield"
                            size={20}
                            color={colors.white}
                          />
                          <StyledText
                            title="Mange"
                            textStyle={styles.manageGroupText}
                          />
                        </Pressable>
                      ) : (
                        <Pressable
                          style={({ pressed }) => [
                            {
                              backgroundColor: pressed
                                ? "rgba(46, 160, 67,0.8)"
                                : colors.primary,
                              paddingVertical: 10,
                              borderRadius: 16,
                            },
                            styles.manageGroup,
                          ]}
                          onPress={() =>
                            navigation.navigate("GroupMemberWaitingScreen", {
                              groupId,
                            })
                          }
                        >
                          <Entypo
                            name="shield"
                            size={20}
                            color={colors.white}
                          />
                          <StyledText
                            title="Mange"
                            textStyle={styles.manageGroupText}
                          />
                        </Pressable>
                      )
                    ) : (
                      <Pressable
                        style={({ pressed }) => [
                          {
                            backgroundColor: pressed
                              ? "rgba(46, 160, 67,0.8)"
                              : colors.primary,
                            paddingVertical: 10,
                            borderRadius: 16,
                          },
                          styles.manageGroup,
                        ]}
                        onPress={() => setVisible(true)}
                      >
                        <View>
                          <MaterialCommunityIcons
                            name="account-group"
                            size={18}
                            color="white"
                          />
                        </View>
                        <View>
                          <StyledText
                            title="Joined"
                            textStyle={styles.manageGroupText}
                          />
                        </View>
                        <View>
                          <AntDesign
                            name="caretdown"
                            size={14}
                            color={colors.white}
                          />
                        </View>
                      </Pressable>
                    )}
                    {
                      <View style={styles.centeredView}>
                        <Modal
                          visible={visible}
                          animationType="slide"
                          transparent={true}
                        >
                          <Pressable
                            style={styles.outside}
                            onPress={() => setVisible(false)}
                          >
                            <View style={styles.modalView}>
                              <View style={styles.modalHeader}></View>
                              <TouchableOpacity
                                style={styles.groupLeave}
                                onPress={() => handleLeaveGroup("PUBLIC")}
                              >
                                <View style={styles.iconLeave}>
                                  <Entypo
                                    name="log-out"
                                    size={24}
                                    color="black"
                                  />
                                </View>
                                <View>
                                  <StyledText
                                    title="Leave group"
                                    textStyle={styles.leaveText}
                                  />
                                </View>
                              </TouchableOpacity>
                            </View>
                          </Pressable>
                        </Modal>
                      </View>
                    }
                    <Pressable
                      onPress={() =>
                        navigation.navigate("InvitePeopleScreen", {
                          groupId: groupInfo.group.groupId,
                        })
                      }
                      style={({ pressed }) => [
                        {
                          backgroundColor: pressed
                            ? colors.secondary
                            : colors.lightGrey,
                          paddingVertical: 10,
                          borderRadius: 16,
                        },
                        styles.invite,
                      ]}
                    >
                      <MaterialIcons
                        name="person-add-alt-1"
                        size={20}
                        color="black"
                      />
                      <StyledText
                        title="Invite"
                        textStyle={styles.inviteText}
                      />
                    </Pressable>
                  </View>
                ) : (
                  <Pressable
                    style={({ pressed }) => [
                      {
                        backgroundColor: pressed
                          ? "rgba(46, 160, 67,0.8)"
                          : colors.primary,
                        paddingVertical: 10,
                        borderRadius: 16,
                      },
                      styles.joinGroup,
                    ]}
                    onPress={handleJoinGroup}
                  >
                    <StyledText
                      title="Join Group"
                      textStyle={styles.joinGroupText}
                    />
                  </Pressable>
                )}
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
                      navigation.navigate("PostScreen", {
                        screen: "Group",
                        checkId: groupId,
                      });
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
          ListEmptyComponent={handleRenderEmpty}
        />
      </View>
    </View>
  );
};

export default React.memo(GroupDetailScreen);
