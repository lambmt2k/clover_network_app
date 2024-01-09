import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import StyledText from "../StyledText/StyledText";
import { AntDesign } from "@expo/vector-icons";
import { colors } from "../../themes/style";
import { styles } from "./styles";
import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import { FontAwesome } from '@expo/vector-icons';
import { useSelector } from "react-redux";

const FriendHeader = ({ screen }) => {
  const navigation = useNavigation();
  const { update } = useSelector((state) => state.friend);

  

  return (
    <View style={{ borderBottomColor: colors.primary, borderBottomWidth: 1 }}>
      <View style={styles.headerCotainer}>
        <View>
          <StyledText title="Friends" textStyle={styles.textGroup} />
        </View>
        <View></View>
      </View>
      <View style={styles.navigationContainer}>
        <TouchableOpacity
          onPress={()=>navigation.navigate("RecommendScreen")}
        >
          <View
            style={[
              styles.tab,
              styles.recommend,
              {
                backgroundColor:
                  screen === "recommend" ? colors.primary : colors.secondary,
              },
            ]}
          >
            <AntDesign name="staro" size={24} color={screen === "recommend" ? colors.white : colors.black} />
            <StyledText
              title="Recommend"
              textStyle={{
                color: screen === "recommend" ? colors.white : colors.black,
              }}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={()=>navigation.navigate("FollowingScreen")}
        >
          <View
            style={[
              styles.tab,
              styles.forYouTab,
              {
                backgroundColor:
                  screen === "following" ? colors.primary : colors.secondary,
              },
            ]}
          >
            <Feather
              name="user"
              size={24}
              color={screen === "following" ? colors.white : colors.black}
            />
            <StyledText
              title="Following"
              textStyle={{
                color: screen === "following" ? colors.white : colors.black,
              }}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("FollowerScreen")}>
          <View
            style={[
              styles.tab,
              styles.yourGroupTab,
              {
                backgroundColor:
                  screen === "follower" ? colors.primary : colors.secondary,
              },
            ]}
          >
            <Feather
              name="users"
              size={24}
              color={screen === "follower" ? colors.white : colors.black}
            />
            <StyledText
              title="Follower"
              textStyle={{
                color: screen === "follower" ? colors.white : colors.black,
              }}
            />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default FriendHeader;
