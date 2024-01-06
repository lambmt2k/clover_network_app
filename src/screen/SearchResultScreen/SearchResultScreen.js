import { View, Text, TouchableOpacity, FlatList, Image, Pressable } from "react-native";
import React, { useState } from "react";
import SearchHeader from "../../components/SearchHeader/SearchHeader";
import StyledText from "../../components/StyledText/StyledText";
import { styles } from "./styles";
import style, { colors } from "../../themes/style";
import Post from "../../components/Post/Post";
import { FontAwesome } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import GroupPrivate from "../../components/GroupPrivate/GroupPrivate";
import PostSeacch from "../../components/PostSearch/PostSearch";

const SearchResultScreen = ({ route }) => {
  const { result, searchQuery } = route.params;
  const [show, setShow] = useState(1);
  const navigation = useNavigation();
  const [visible, setVisble] = useState(false);
  const [currentGroup, setCurrentGroup] = useState();

  //     <View>
  //       <View
  //         style={[
  //           { marginVertical: 4 }]}
  //       >
  //         <View style={styles.container}>
  //           {item?.postToUserWall ? (
  //             <View style={styles.user}>
  //               <View style={styles.userImageContainer}>
  //                 <Image
  //                   source={{ uri: data.authorProfile?.avatarImgUrl }}
  //                   style={styles.userImage}
  //                 />
  //               </View>
  //               <View>
  //                 <Text style={styles.userName}>
  //                   {data?.authorProfile?.displayName}
  //                 </Text>
  //                 <Text style={styles.userTime}>
  //                   {daysago(data.feedItem.updatedTime)}
  //                 </Text>
  //               </View>
  //             </View>
  //           ) : (
  //             <View style={{ flexDirection: "row", gap: 10, marginBottom: 10 }}>
  //               <View>
  //                 <View style={styles.groupAvatarCon}>
  //                   <Image
  //                     source={{
  //                       uri: data.groupItem.avatarImgUrl
  //                         ? data.groupItem.avatarImgUrl
  //                         : "https://picsum.photos/200/300",
  //                     }}
  //                     style={styles.groupAvatar}
  //                   />
  //                 </View>
  //                 <View style={styles.userAvatarCon}>
  //                   <Image
  //                     source={{ uri: data.authorProfile.avatarImgUrl }}
  //                     style={styles.userAvatar}
  //                   />
  //                 </View>
  //               </View>
  //               <View>
  //                 <Pressable
  //                   onPress={() =>
  //                     navigation.navigate("Groups", {
  //                       screen: "GroupDetailScreen",
  //                       params: { groupId: data.groupItem.groupId },
  //                     })
  //                   }
  //                 >
  //                   <StyledText
  //                     title={data.groupItem.groupName}
  //                     textStyle={styles.groupName}
  //                   />
  //                 </Pressable>

  //                 <View style={{ flexDirection: "row", alignItems: "center" }}>
  //                   <StyledText
  //                     title={data.authorProfile.displayName}
  //                     textStyle={styles.userName}
  //                   />
  //                   <Entypo name="dot-single" size={12} color="black" />
  //                   <StyledText
  //                     title={daysago(data.feedItem.updatedTime)}
  //                     textStyle={styles.timeAgo}
  //                   />
  //                 </View>
  //               </View>
  //             </View>
  //           )}
  //           <View>
  //             <Text style={styles.statusText}>{data.feedItem?.content}</Text>
  //           </View>
  //         </View>
  //         {data.feedItem?.feedImages && (
  //           <View style={styles.postPicContainer}>

  //             <FbGrid
  //               images={data.feedItem.feedImages}
  //               onPress={() => console.log("press")}
  //             />
  //           </View>
  //         )}

  //         <View style={styles.container2}>
  //           <View style={styles.iconContainer}>
  //             <View style={styles.emotionIcon}>
  //               <View
  //                 style={{
  //                   width: 20,
  //                   height: 20,
  //                   borderRadius: 20 / 2,
  //                   alignItems: "center",
  //                   justifyContent: "center",
  //                 }}
  //               >
  //                 <Image
  //                   source={require("../../assets/img/cloverLikeActive.png")}
  //                   style={styles.iconLike}
  //                 />
  //               </View>
  //               <StyledText title={totalLike} textStyle={{ marginLeft: 5 }} />
  //             </View>
  //             <View style={styles.cmtShareContainer}>
  //               <View className="commentAmount" style={{ marginRight: 5 }}>
  //                 <StyledText title={`${data.totalComment} comments`} />
  //               </View>

  //             </View>
  //           </View>
  //           <View style={styles.divider}></View>
  //           <View style={styles.groupIconContainer}>
  //             <View className="LikeButton">
  //               <Pressable
  //                 style={({ pressed }) => [
  //                   {
  //                     backgroundColor: pressed ? colors.lightGrey : "white",
  //                     width: 100,
  //                     height: "100%",
  //                     borderRadius: 10,
  //                   },
  //                   styles.groupIcon,
  //                 ]}
  //                 onPress={handelPress}
  //               >
  //                 {like ? (
  //                   <Image
  //                     source={require("../../assets/img/cloverLikeActive.png")}
  //                     style={styles.iconLike}
  //                   />
  //                 ) : (
  //                   <Image
  //                     source={require("../../assets/img/cloverLike.png")}
  //                     style={styles.iconLike}
  //                   />
  //                 )}
  //                 <StyledText title="Like" textStyle={styles.groupIconText} />
  //               </Pressable>
  //             </View>
  //             <View className="CommentButton">
  //               <Pressable
  //                 style={({ pressed }) => [
  //                   {
  //                     backgroundColor: pressed ? colors.lightGrey : "white",
  //                     width: 130,
  //                     height: "100%",
  //                     borderRadius: 10,
  //                   },
  //                   styles.groupIcon,
  //                 ]}
  //               >
  //                 <Feather name="message-circle" size={20} color="black" />
  //                 <StyledText title="Comment" textStyle={styles.groupIconText} />
  //               </Pressable>
  //             </View>
  //             <View className="ShareButton">
  //               <Pressable
  //                 style={({ pressed }) => [
  //                   {
  //                     backgroundColor: pressed ? colors.lightGrey : "white",
  //                     width: 100,
  //                     height: "100%",
  //                     borderRadius: 10,
  //                   },
  //                   styles.groupIcon,
  //                 ]}
  //               >
  //                 <Ionicons name="arrow-redo-outline" size={20} color="black" />
  //                 <StyledText title="Share" textStyle={styles.groupIconText} />
  //               </Pressable>
  //             </View>
  //           </View>
  //         </View>
  //       </View>
  //     </View>
  //   );
  const renderFeedItem = ({ item }) => <Post data={item} screen="Group" />;
  const onPrivatePress = (item) => {
    setVisble(true);
    setCurrentGroup(item);
  };
  const handlePressContainer = (item) => {
    if (
      item?.currentUserRole === null &&
      item.group.groupPrivacy === "PRIVATE"
    ) {
      onPrivatePress(item.group);
    } else {
      navigation.navigate("Groups", {
        screen: "GroupDetailScreen",
        initial: false,
        params: { groupId: item.group.groupId },
      });
    }
  };
  const renderGroupItem = ({ item }) => {
    return (
      <Pressable>
        <View style={styles.itemContainer}>
          <View>
            {item.group?.bannerUrl ? (
              <Image
                style={{ width: 80, height: 80 }}
                source={{ uri: item?.group.bannerUrl }}
              />
            ) : (
              <Image
                style={{ width: 60, height: 60, borderRadius: 4 }}
                source={require("../../assets/img/backGroundDefault.png")}
              />
            )}
          </View>
          <View style={{ flex: 1, paddingRight: 10 }}>
            <StyledText
              title={item.group?.groupName}
              textStyle={styles.groupName}
            />
            <View style={{ marginVertical: 5 }}>
              {item.group?.groupPrivacy === "PUBLIC" ? (
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
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 3,
                    }}
                  >
                    <StyledText title="9,5K" />
                    <StyledText title="members" />
                  </View>
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
                    <StyledText title={item.group?.totalMember} />
                    <StyledText title="members" />
                  </View>
                </View>
              )}
            </View>
            <View>
              <StyledText title={item.group?.groupDesc} />
            </View>
            {item.currentUserRole ? (
              item.currentUserRole.status === "WAITING_FOR_APPROVE" ? (
                <TouchableOpacity style={styles.waitingBnt} disabled>
                  <StyledText
                    title="Waiting For Approve"
                    textStyle={styles.visitText}
                  />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={styles.visitBtn}
                  onPress={() =>
                    navigation.navigate("Groups", {
                      screen: "GroupDetailScreen",
                      initial: false,
                      params: { groupId: item.group.groupId },
                    })
                  }
                >
                  <StyledText title="Visit" textStyle={styles.visitText} />
                </TouchableOpacity>
              )
            ) : item.group?.groupPrivacy === "PRIVATE" ? (
              <TouchableOpacity
                style={styles.visitBtn}
                onPress={() => onPrivatePress(item.group)}
              >
                <StyledText title="Join Group" textStyle={styles.visitText} />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={styles.visitBtn}
                onPress={() =>
                  navigation.navigate("Groups", {
                    screen: "GroupDetailScreen",
                    initial: false,
                    params: { groupId: item.group.groupId },
                  })
                }
              >
                <StyledText title="Join Group" textStyle={styles.visitText} />
              </TouchableOpacity>
            )}
          </View>
        </View>
      </Pressable>
    );
  };
  const renderUserItem = ({ item }) => {
    return (
      <View
        style={[
          styles.itemContainer,
          {
            paddingLeft: 25,
            paddingRight: 8,
            alignItems: "center",
            paddingTop: 10,
          },
        ]}
      >
        <View>
          {item?.avatar ? (
            <Image source={{ uri: item?.avatar }} style={styles.userImage} />
          ) : (
            <Image
              source={require("../../assets/img/UserDefaultAvatar.png")}
              style={styles.userImage}
            />
          )}
        </View>
        <View style={{ flex: 1 }}>
          <StyledText
            title={`${item?.firstname} ${item?.lastname}`}
            textStyle={styles.userName}
          />
          <View>
            <StyledText title={item?.groupDesc} />
          </View>
          <TouchableOpacity style={styles.visitBtn} onPress={()=>navigation.navigate("UserScreen",{userId:item.userId})}>
            <StyledText title="Visit" textStyle={styles.visitText} />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const renderEmpty = () => {
    let text = "";
    if (show === 1) text = "Posts";
    if (show === 2) text = "People";
    if (show === 3) text = "Groups";

    return (
      <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
        <StyledText
          title={`We couldn't find any ${text} to show for  `}
          textStyle={styles.notFoundText}
        />
        <StyledText
          title={`" ${searchQuery}"`}
          textStyle={styles.searchQuerryText}
        />
        <Image
          source={require("../../assets/img/notFound.jpg")}
          style={styles.notFoundImage}
        />
      </View>
    );
  };

  return (
    <SafeAreaView
      style={{
        backgroundColor: colors.white,
        flex: 1,
        marginBottom: Platform.OS === "ios" ? -35 : 0,
      }}
    >
      <SearchHeader />
      <View className="searchNav" style={styles.searchNav}>
        <TouchableOpacity onPress={() => setShow(1)}>
          <View
            style={[
              styles.navItem,
              { borderBottomColor: show === 1 ? colors.primary : colors.white },
            ]}
          >
            <StyledText title="Posts" />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setShow(2)}>
          <View
            style={[
              styles.navItem,
              { borderBottomColor: show === 2 ? colors.primary : colors.white },
            ]}
          >
            <StyledText title="People" />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setShow(3)}>
          <View
            style={[
              styles.navItem,
              { borderBottomColor: show === 3 ? colors.primary : colors.white },
            ]}
          >
            <StyledText title="Groups" />
          </View>
        </TouchableOpacity>
      </View>
      {
        <GroupPrivate
          visible={visible}
          onPressOut={() => setVisble(false)}
          data={currentGroup}
        />
      }
      <View style={[styles.resultContainer]}>
        {show === 1 && (
          <View style={[styles.flatlistCon]}>
            <FlatList
              data={result.feeds}
              keyExtractor={(item) => item.feedItem.postId}
              renderItem={renderFeedItem}
              ListEmptyComponent={renderEmpty}
              contentContainerStyle={[
                result.feeds ? styles.foundStyle : styles.notFoundStyle,
              ]}
            />
          </View>
        )}
        {show === 2 && (
          <View style={[styles.flatlistCon]}>
            <FlatList
              data={result.users}
              keyExtractor={(item) => item.userId}
              renderItem={renderUserItem}
              ListEmptyComponent={renderEmpty}
              contentContainerStyle={[
                result.users ? styles.foundStyle : styles.notFoundStyle,
              ]}
            />
          </View>
        )}
        {show === 3 && (
          <View style={[styles.flatlistCon]}>
            <FlatList
              data={result.groups}
              keyExtractor={(item) => item.group.groupId}
              renderItem={renderGroupItem}
              ListEmptyComponent={renderEmpty}
              contentContainerStyle={[
                result.groups ? styles.foundStyle : styles.notFoundStyle,
              ]}
            />
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default SearchResultScreen;
