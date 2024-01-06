import {
    View,
    Text,
    Image,
    Pressable,
    TouchableWithoutFeedback,
  } from "react-native";
  import React, { useEffect, useRef, useState } from "react";
  import { styles } from "./styles";
  import { AntDesign } from "@expo/vector-icons";
  import { FontAwesome } from "@expo/vector-icons";
  import { Feather } from "@expo/vector-icons";
  import { Ionicons } from "@expo/vector-icons";
  import StyledText from "../StyledText/StyledText";
  import { colors } from "../../themes/style";
  import FbGrid from "react-native-fb-image-grid";
  import dayjs from "dayjs";
  import relativeTime from "dayjs/plugin/relativeTime";
  import localeEn from "dayjs/locale/";
  import { Entypo } from "@expo/vector-icons";
  import { useSelector } from "react-redux";
  import PostApi from "../../apis/Post";
  import { useNavigation } from "@react-navigation/native";
  
  const PostSeacch = ({ data, screen }) => {
    const [totalLike, setTotalLike] = useState();
    const [currentUserLike, setCurrentUserLike] = useState();
    const [update, setUpdate] = useState(false);
    const { user } = useSelector((state) => state.login);
    const navigation = useNavigation();
    const handelPress = () => {
      const likeData = {
        postId: data.postId,
        reactType: "LIKE",
        status: !currentUserLike,
      };
      PostApi.likePost(user.tokenId, likeData)
        .then((res) => {
          setUpdate(!update);
        })
        .catch((err) => {
          console.log(err);
        });
    };
  
    if (!data) return null;
    const daysago = (postDate) => {
      dayjs.extend(relativeTime).locale(localeEn);
      let fromNowOn = dayjs(postDate).fromNow();
      return fromNowOn;
    };
    useEffect(() => {
      PostApi.checkUserLike(user.tokenId, data.postId)
        .then((res) => {
          const likeData = res.data.data;
          setTotalLike(likeData.totalLike);
          setCurrentUserLike(likeData.currentUserLike);
        })
        .catch((err) => console.log(err));
    }, [update]);
  
    return (
      <View
        style={[
          { marginVertical: 4 }
        ]}
      >
        <View style={styles.container}>
          {data?.postToUserWall ? (
            <View style={styles.user}>
              <View style={styles.userImageContainer}>
                <Image
                  source={{ uri: data.authorProfile?.avatarImgUrl }}
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
                  {daysago(data.feedItem.updatedTime)}
                </Text>
              </View>
            </View>
          ) : (
            <View style={{ flexDirection: "row", gap: 10, marginBottom: 10 }}>
              <View>
                <View style={styles.groupAvatarCon}>
                  {data.groupItem?.bannerUrl ? (
                    <Image
                      style={[styles.groupAvatar, { width: 40, height: 40 }]}
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
                <View style={styles.userAvatarCon}>
                  <Image
                    source={{ uri: data.authorProfile?.avatarImgUrl }}
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
                    title={data.groupItem?.groupName}
                    textStyle={styles.groupName}
                  />
                </Pressable>
  
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Pressable onPress={()=>navigation.navigate("UserScreen",{userId:data.authorProfile?.userId})}>
                    <StyledText
                      title={data.authorProfile?.displayName}
                      textStyle={styles.userName}
                    />
                  </Pressable>
  
                  <Entypo name="dot-single" size={12} color="black" />
                  <StyledText
                    title={daysago(data.feedItem?.updatedTime)}
                    textStyle={styles.timeAgo}
                  />
                </View>
              </View>
            </View>
          )}
          <View>
            <Text style={styles.statusText}>{data.feedItem?.content}</Text>
          </View>
        </View>
        {data.feedItem?.feedImages && (
          <View style={styles.postPicContainer}>
            {/* <Image
            source={{ uri: "https://picsum.photos/200/300" }}
            style={styles.postPic}
          /> */}
            <FbGrid
              images={data.feedItem.feedImages}
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
              <StyledText title={totalLike} textStyle={{ marginLeft: 5 }} />
            </View>
            <View style={styles.cmtShareContainer}>
              <View className="commentAmount" style={{ marginRight: 5 }}>
                <StyledText title={`${data.totalComment} comments`} />
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
                    backgroundColor: pressed ? colors.lightGrey : "white",
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
                <StyledText title="Like" textStyle={styles.groupIconText} />
              </Pressable>
            </View>
            <View className="CommentButton">
              <Pressable
                style={({ pressed }) => [
                  {
                    backgroundColor: pressed ? colors.lightGrey : "white",
                    width: 130,
                    height: "100%",
                    borderRadius: 10,
                  },
                  styles.groupIcon,
                ]}
              >
                <Feather name="message-circle" size={20} color="black" />
                <StyledText title="Comment" textStyle={styles.groupIconText} />
              </Pressable>
            </View>
            <View className="ShareButton">
              <Pressable
                style={({ pressed }) => [
                  {
                    backgroundColor: pressed ? colors.lightGrey : "white",
                    width: 100,
                    height: "100%",
                    borderRadius: 10,
                  },
                  styles.groupIcon,
                ]}
              >
                <Ionicons name="arrow-redo-outline" size={20} color="black" />
                <StyledText title="Share" textStyle={styles.groupIconText} />
              </Pressable>
            </View>
          </View>
        </View>
      </View>
    );
  };
  
  export default PostSeacch;
  