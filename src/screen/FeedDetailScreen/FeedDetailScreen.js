import {
  View,
  Text,
  TouchableOpacity,
  Pressable,
  Image,
  FlatList,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  StyleSheet,
  TextInput,
  Button,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { colors } from "../../themes/style";
import PostApi from "../../apis/Post";
import { useDispatch, useSelector } from "react-redux";
import StyledText from "../../components/StyledText/StyledText";
import { styles } from "./styles";
import { Entypo } from "@expo/vector-icons";
import FbGrid from "react-native-fb-image-grid";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import localeEn from "dayjs/locale/";
import { Feather } from "@expo/vector-icons";
import { Octicons } from "@expo/vector-icons";
import { updatePost } from "../../features/Post/PostSlice";

const FeedDetailScreen = ({ route }) => {
  const { postId } = route.params;
  const { user } = useSelector((state) => state.login);
  const { userInfo, loading } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [data, setData] = useState();
  const [totalLike, setTotalLike] = useState();
  const [currentUserLike, setCurrentUserLike] = useState();
  const [update, setUpdate] = useState(false);
  const [pageCmt, setPageCmt] = useState(0);
  const [listComment, setListComment] = useState([]);
  const [inputVisible, setInputVisible] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [commentSuccess, setCommentSuccess] = useState(false);
  const [endData, setEndData] = useState(false);
  const handelPress = () => {
    const likeData = {
      postId: data.feedItem.postId,
      reactType: "LIKE",
      status: !currentUserLike,
    };
    PostApi.likePost(user.tokenId, likeData)
      .then((res) => {
        dispatch(updatePost(postId, !currentUserLike));
        setUpdate(!update);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getPostDetail = () => {
    PostApi.getPostDetail(user.tokenId, postId)
      .then((res) => {
        setData(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getComment = () => {
    PostApi.getListPostComment(user.tokenId, postId, pageCmt)
      .then((res) => {
        if (res.data.data.length === 0) {
          setEndData(true);
        } else {
          const newComments = [...listComment, ...res.data.data];
          const uniqueCmts = [];
          //const uniqueFeedsId = [...new Set(newFeedsData.map((it)=>it.feedItem?.postId))]
          const newCmts = newComments.filter((it) => {
            const isDuplicate = uniqueCmts.includes(it.commentId);
            if (!isDuplicate) {
              uniqueCmts.push(it.commentId);
              return true;
            }
            return false;
          });
          setListComment(newCmts);
        }
      })
      .catch((err) => console.log(err));
  };
  const daysago = (postDate) => {
    dayjs.extend(relativeTime).locale(localeEn);
    let fromNowOn = dayjs(postDate).fromNow();
    return fromNowOn;
  };
  useEffect(() => {
    getPostDetail();
  }, [commentSuccess]);
  useEffect(() => {
    getComment();
  }, [pageCmt, commentSuccess]);
  useEffect(() => {
    PostApi.checkUserLike(user.tokenId, postId)
      .then((res) => {
        const likeData = res.data.data;
        setTotalLike(likeData.totalLike);
        setCurrentUserLike(likeData.currentUserLike);
      })
      .catch((err) => console.log(err));
  }, [update]);
  const renderComment = ({ item }) => {
    return (
      <View
        style={{
          paddingHorizontal: 10,
          marginTop: 8,
          flexDirection: "row",
          gap: 10,
        }}
      >
        <View>
          <Image
            source={{ uri: item?.authorProfile.avatarImgUrl }}
            style={styles.userCmtAvt}
          />
        </View>
        <View style={styles.contentCon}>
          <StyledText
            title={item?.authorProfile.displayName}
            textStyle={{ fontSize: 16, fontFamily: "BeVietnamPro_600SemiBold" }}
          />
          <StyledText title={item?.content} />
        </View>
      </View>
    );
  };
  const renderEmpty = () => {
    return (
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <StyledText title="This post don't have any comment" />
      </View>
    );
  };
  const handleComment = () => {
    const commentData = {
      postId: data.feedItem.postId,
      authorId: userInfo.userId,
      content: commentText,
      level: 0,
    };

    PostApi.commentPost(user.tokenId, commentData)
      .then((res) => {
        setCommentSuccess(!commentSuccess);
        setInputVisible(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleSeeMore = () => {
    if (!endData) {
      setPageCmt(pageCmt + 1);
    }
  };
  const renderFooter = () => {
    return (
      <View style={{ marginVertical: 4 }}>
        {endData ? null : (
          <TouchableOpacity
            onPress={handleSeeMore}
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <StyledText title="See more" />
            <Entypo name="chevron-down" size={24} color="black" />
          </TouchableOpacity>
        )}
      </View>
    );
  };
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <SafeAreaView style={{ flex: 1, backgroundColor: colors.white }}>
        <View style={{ flex: 1 }}>
          <FlatList
            data={listComment}
            ListHeaderComponent={
              <View
                style={[
                  {
                    marginVertical: 4,
                    borderBottomWidth: 1,
                    borderBottomColor: colors.background,
                  },
                ]}
              >
                <View style={styles.container}>
                  {data?.groupItem?.groupType === 2 ? (
                    <View
                      style={{
                        flexDirection: "row",
                        gap: 10,
                        marginBottom: 10,
                      }}
                    >
                      <Pressable onPress={()=>navigation.goBack()}>
                        <Ionicons
                          name="chevron-back"
                          size={24}
                          color={colors.primary}
                        />
                      </Pressable>

                      <View>
                        <View style={styles.groupAvatarCon}>
                          {data.groupItem?.bannerUrl ? (
                            <Image
                              style={[
                                styles.groupAvatar,
                                { width: 40, height: 40 },
                              ]}
                              source={{ uri: data.groupItem?.bannerUrl }}
                            />
                          ) : (
                            <Image
                              style={[
                                styles.groupAvatar,
                                { width: 40, height: 40, borderRadius: 4 },
                              ]}
                              source={require("../../assets/img/backGroundDefault.png")}
                            />
                          )}
                          {/* <Image
                  source={{
                    uri: data.groupItem?.avatarImgUrl
                      ? data.groupItem?.avatarImgUrl
                      : "https://picsum.photos/200/300",
                  }}
                  style={styles.groupAvatar}
                /> */}
                        </View>
                      </View>
                      <View>
                        <Pressable
                          onPress={() =>
                            navigation.navigate("Groups", {
                              screen: "GroupDetailScreen",
                              initial: false,
                              params: { groupId: data.groupItem.groupId },
                            })
                          }
                        >
                          <StyledText
                            title={data.groupItem?.groupName}
                            textStyle={styles.groupName}
                          />
                        </Pressable>

                        <View
                          style={{ flexDirection: "row", alignItems: "center" }}
                        >
                          <Pressable>
                            <StyledText
                              title="Clover System"
                              textStyle={styles.system}
                            />
                          </Pressable>

                          <Entypo
                            name="dot-single"
                            size={12}
                            color={colors.secondary}
                          />
                          <StyledText
                            title={daysago(data.feedItem?.updatedTime)}
                            textStyle={styles.timeAgo}
                          />
                        </View>
                      </View>
                    </View>
                  ) : (
                    <View>
                      {data?.feedItem?.postToUserWall ? (
                        <View style={{ flexDirection: "row", gap: 6 }}>
                          <View>
                            <TouchableOpacity
                              onPress={() => navigation.goBack()}
                            >
                              <View>
                                <Ionicons
                                  name="chevron-back"
                                  size={28}
                                  color={colors.primary}
                                />
                              </View>
                            </TouchableOpacity>
                          </View>
                          <View style={styles.user}>
                            <View style={styles.userImageContainer}>
                              <Image
                                source={{
                                  uri: data?.authorProfile?.avatarImgUrl,
                                }}
                                style={styles.userImage}
                              />
                            </View>
                            <View>
                              <Pressable
                                onPress={() => {
                                  navigation.navigate("UserScreen", {
                                    userId: data?.authorProfile.userId,
                                  });
                                }}
                              >
                                <StyledText
                                  title={data?.authorProfile?.displayName}
                                  textStyle={styles.userName}
                                />
                              </Pressable>

                              <Text style={styles.userTime}>
                                {daysago(data?.feedItem?.updatedTime)}
                              </Text>
                            </View>
                          </View>
                        </View>
                      ) : (
                        <View style={{ flexDirection: "row", gap: 6 }}>
                          <TouchableOpacity onPress={() => navigation.goBack()}>
                            <View>
                              <Ionicons
                                name="chevron-back"
                                size={28}
                                color={colors.primary}
                              />
                            </View>
                          </TouchableOpacity>
                          <View
                            style={{
                              flexDirection: "row",
                              gap: 10,
                              marginBottom: 10,
                            }}
                          >
                            <View>
                              <View style={styles.groupAvatarCon}>
                                {data?.groupItem?.bannerUrl ? (
                                  <Image
                                    style={[
                                      styles.groupAvatar,
                                      { width: 40, height: 40 },
                                    ]}
                                    source={{ uri: data.groupItem?.bannerUrl }}
                                  />
                                ) : (
                                  <Image
                                    style={[
                                      styles.groupAvatar,
                                      {
                                        width: 40,
                                        height: 40,
                                        borderRadius: 4,
                                      },
                                    ]}
                                    source={require("../../assets/img/backGroundDefault.png")}
                                  />
                                )}
                                {/* <Image
                  source={{
                    uri: data.groupItem?.avatarImgUrl
                      ? data.groupItem?.avatarImgUrl
                      : "https://picsum.photos/200/300",
                  }}
                  style={styles.groupAvatar}
                /> */}
                              </View>
                              <View style={styles.userAvatarCon}>
                                <Image
                                  source={{
                                    uri: data?.authorProfile?.avatarImgUrl,
                                  }}
                                  style={styles.userAvatar}
                                />
                              </View>
                            </View>
                            <View>
                              <Pressable
                                onPress={() =>
                                  navigation.navigate("Groups", {
                                    screen: "GroupDetailScreen",
                                    initial: false,
                                    params: { groupId: data.groupItem.groupId },
                                  })
                                }
                              >
                                <StyledText
                                  title={data?.groupItem?.groupName}
                                  textStyle={styles.groupName}
                                />
                              </Pressable>

                              <View
                                style={{
                                  flexDirection: "row",
                                  alignItems: "center",
                                }}
                              >
                                <Pressable
                                  onPress={() =>
                                    navigation.navigate("UserScreen", {
                                      userId: data?.authorProfile?.userId,
                                    })
                                  }
                                >
                                  <StyledText
                                    title={data?.authorProfile?.displayName}
                                    textStyle={styles.userName}
                                  />
                                </Pressable>

                                <Entypo
                                  name="dot-single"
                                  size={12}
                                  color="black"
                                />
                                <StyledText
                                  title={daysago(data?.feedItem?.updatedTime)}
                                  textStyle={styles.timeAgo}
                                />
                              </View>
                            </View>
                          </View>
                        </View>
                      )}
                    </View>
                  )}

                  <View>
                    <Text style={styles.statusText}>
                      {data?.feedItem?.content}
                    </Text>
                  </View>
                </View>
                {data?.feedItem?.feedImages && (
                  <View style={styles.postPicContainer}>
                    {/* <Image
          source={{ uri: "https://picsum.photos/200/300" }}
          style={styles.postPic}
        /> */}
                    <FbGrid
                      images={data?.feedItem?.feedImages}
                      onPress={() => console.log("press")}
                    />
                  </View>
                )}

                <View style={styles.container2}>
                  <View style={styles.iconContainer}>
                    <View style={styles.emotionIcon}>
                      <View
                        style={{
                          width: 20,
                          height: 20,
                          borderRadius: 20 / 2,
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Image
                          source={require("../../assets/img/cloverLikeActive.png")}
                          style={styles.iconLike}
                        />
                      </View>
                      <StyledText
                        title={totalLike}
                        textStyle={{ marginLeft: 5 }}
                      />
                    </View>
                    <View style={styles.cmtShareContainer}>
                      <View
                        className="commentAmount"
                        style={{ marginRight: 5 }}
                      >
                        <StyledText title={`${data?.totalComment} comments`} />
                      </View>
                      {/* <View className="shareAmmount">
              <StyledText title={`${0} shares`} />
            </View> */}
                    </View>
                  </View>
                  <View style={styles.divider}></View>
                  <View style={styles.groupIconContainer}>
                    <View className="LikeButton">
                      <Pressable
                        style={({ pressed }) => [
                          {
                            backgroundColor: pressed
                              ? colors.lightGrey
                              : "white",
                            width: 100,
                            height: "100%",
                            borderRadius: 10,
                          },
                          styles.groupIcon,
                        ]}
                        onPress={handelPress}
                      >
                        {currentUserLike ? (
                          <Image
                            source={require("../../assets/img/cloverLikeActive.png")}
                            style={styles.iconLike}
                          />
                        ) : (
                          <Image
                            source={require("../../assets/img/cloverLike.png")}
                            style={styles.iconLike}
                          />
                        )}
                        <StyledText
                          title="Like"
                          textStyle={styles.groupIconText}
                        />
                      </Pressable>
                    </View>
                    <View className="CommentButton">
                      <Pressable
                        onPress={() => setInputVisible(true)}
                        style={({ pressed }) => [
                          {
                            backgroundColor: pressed
                              ? colors.lightGrey
                              : "white",
                            width: 130,
                            height: "100%",
                            borderRadius: 10,
                          },
                          styles.groupIcon,
                        ]}
                      >
                        <Feather
                          name="message-circle"
                          size={20}
                          color="black"
                        />
                        <StyledText
                          title="Comment"
                          textStyle={styles.groupIconText}
                        />
                      </Pressable>
                    </View>
                    <View className="ShareButton">
                      <Pressable
                        style={({ pressed }) => [
                          {
                            backgroundColor: pressed
                              ? colors.lightGrey
                              : "white",
                            width: 100,
                            height: "100%",
                            borderRadius: 10,
                          },
                          styles.groupIcon,
                        ]}
                      >
                        <Ionicons
                          name="arrow-redo-outline"
                          size={20}
                          color="black"
                        />
                        <StyledText
                          title="Share"
                          textStyle={styles.groupIconText}
                        />
                      </Pressable>
                    </View>
                  </View>
                </View>
              </View>
            }
            renderItem={renderComment}
            keyExtractor={(item) => item.commentId}
            ListEmptyComponent={renderEmpty}
            ListFooterComponent={renderFooter}
          />
        </View>
        {inputVisible ? (
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            enabled={inputVisible}
          >
            {inputVisible && (
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  paddingHorizontal: 8,
                }}
              >
                <View style={{ flex: 1, justifyContent: "center" }}>
                  <TextInput
                    placeholder={`Comment name on ${
                      userInfo.firstname + " " + userInfo.lastname
                    }`}
                    multiline={true}
                    autoFocus={inputVisible}
                    onChangeText={(value) => setCommentText(value)}
                    style={{
                      paddingVertical: 25,
                      marginVertical: 4,
                      backgroundColor: colors.background,
                      marginRight: 5,
                      borderRadius: 8,
                    }}
                  />
                </View>
                <View style={{ alignItems: "flex-end", padding: 8 }}>
                  <TouchableOpacity
                    disabled={commentText ? false : true}
                    onPress={handleComment}
                  >
                    <Octicons
                      name="paper-airplane"
                      size={28}
                      color={commentText ? colors.primary : colors.secondary}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </KeyboardAvoidingView>
        ) : null}
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default FeedDetailScreen;
