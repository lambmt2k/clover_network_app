import {
  View,
  Text,
  SafeAreaView,
  Pressable,
  Image,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import StyledText from "../../components/StyledText/StyledText";
import { styles } from "./styles";
import { useSelector } from "react-redux";
import { AntDesign } from "@expo/vector-icons";
import { colors } from "../../themes/style";
import { FontAwesome } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
const PostScreen = () => {
  const navigation = useNavigation();
  const { userInfo } = useSelector((state) => state.user);

  return (
    <SafeAreaView
      style={[
        styles.container,
        {
          // Try setting `flexDirection` to `"row"`.
          flexDirection: "column",
          flex: 1,
          position:"relative"
        },
      ]}
    >
      <View style={styles.appBarContainer}>
        <Pressable onPress={() => navigation.goBack()}>
          <View>
            <AntDesign name="close" size={24} color={colors.primary} />
          </View>
        </Pressable>
        <StyledText title="Create Post" textStyle={styles.appBarText} />
        <Pressable style={styles.postButton}>
          <StyledText title="Post" textStyle={styles.postButtonText} />
        </Pressable>
      </View>
      <View style={styles.userContainer}>
        <Image source={{ uri: userInfo.avatarImgUrl }} style={styles.userImage} />
        <View>
          <StyledText
            title={`${userInfo.firstname} ${userInfo.lastname}`}
            textStyle={styles.username}
          />
          <View>
            <View style={styles.privacy}>
              <FontAwesome name="lock" size={14} color="#b1b4b6" />
              <StyledText title="Only me" textStyle={styles.privacyText} />
            </View>
          </View>
        </View>
      </View>
      <View style={styles.textArea}>
        <TextInput
          placeholder="What's on your mind?"
          multiline={true}
          placeholderTextColor={colors.primary}
        />
      </View>
      <View style={styles.textEditArea}>
        <View style={styles.groupIcon}>
          <Ionicons name="md-images-outline" size={32} color={colors.primary} />
          <StyledText title="Images" textStyle={styles.textIcon} />
        </View>
        <View style={styles.groupIcon}>
          <Ionicons name="ios-happy-outline" size={32} color="#f0bf3f" />
          <StyledText title="Emotion/Activity" textStyle={styles.textIcon} />
        </View>
        <View style={styles.groupIcon}>
          <MaterialIcons name="location-on" size={32} color="#e7604a" />
          <StyledText title="Check-in" textStyle={styles.textIcon} />
        </View>
        <View style={styles.groupIcon}>
          <Ionicons name="text" size={32} color="#5abba9" />
          <StyledText title="Background" textStyle={styles.textIcon} />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default PostScreen;
