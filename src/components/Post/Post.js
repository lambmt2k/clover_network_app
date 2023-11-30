import { View, Text, Image, Pressable } from "react-native";
import React from "react";
import { styles } from "./styles";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import StyledText from "../StyledText/StyledText";
import { colors } from "../../themes/style";

const Post = ({ data }) => {
  return (
    <View>
      <View style={styles.container}>
        <View style={styles.user}>
          <View style={styles.userImageContainer}>
            <Image source={{ uri: data.avatar }} style={styles.userImage} />
          </View>
          <View>
            <Text style={styles.userName}>{data.userName}</Text>
            <Text style={styles.userTime}>8h</Text>
          </View>
        </View>
        <View>
          <Text style={styles.statusText}>{data.status}</Text>
        </View>
      </View>
      <View style={styles.postPicContainer}>
        <Image source={{ uri: data.postPic }} style={styles.postPic} />
      </View>
      <View style={styles.container}>
        <View style={styles.iconContainer}>
          <View style={styles.emotionIcon}>
            <View
              style={{
                backgroundColor: "red",
                width: 20,
                height: 20,
                borderRadius: 20 / 2,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <AntDesign name="heart" size={10} color="white" />
            </View>
            <StyledText title={data.heart} textStyle={{ marginLeft: 5 }} />
          </View>
          <View style={styles.cmtShareContainer}>
            <View className="commentAmount" style={{ marginRight: 5 }}>
              <StyledText title={`${data.comment} comments`} />
            </View>
            <View className="shareAmmount">
              <StyledText title={`${data.share} shares`} />
            </View>
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
            >
              <AntDesign name="like2" size={20} color="black" />
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

export default React.memo(Post);
