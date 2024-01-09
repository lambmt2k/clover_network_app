import {
  View,
  Text,
  FlatList,
  Pressable,
  TouchableOpacity,
  Image,
  Platform,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import FriendHeader from "../../components/FriendHeader/FriendHeader";
import FriendApi from "../../apis/Friend";
import { useSelector } from "react-redux";
import StyledText from "../../components/StyledText/StyledText";
import { styles } from "./styles";
import { colors } from "../../themes/style";
import { FontAwesome } from "@expo/vector-icons";
import { SimpleLineIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const RandomUserScreen = () => {
  const { user } = useSelector((state) => state.login);
  const [randomList, setRandomList] = useState([]);
  const navigation = useNavigation();
  const [gacha, setGacha] = useState(false);
  const getRandomUser = () => {
    FriendApi.getRandomFriend(user.tokenId)
      .then((res) => {
        setRandomList(res.data.data.userProfiles);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getRandomUser();
  }, [gacha]);
  const renderItem = ({ item }) => {
    return (
      <Pressable
        onPress={() =>
          navigation.navigate("UserScreen", { userId: item.userId })
        }
      >
        <View
          style={{
            marginVertical: 4,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingHorizontal: 8,
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
            <Image source={{ uri: item.avatarImgUrl }} style={styles.avatar} />
            <StyledText title={item.displayName} />
          </View>
          <View>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("UserScreen", { userId: item.userId })
              }
              style={{
                paddingHorizontal: 22,
                paddingVertical: 12,
                backgroundColor: colors.primary,
                borderRadius: 8,
              }}
            >
              <StyledText title="Visit" textStyle={{ color: colors.white }} />
            </TouchableOpacity>
          </View>
        </View>
      </Pressable>
    );
  };
  const renderHeader = () => {
    return (
      <View style={{ paddingHorizontal: 8 }}>
        <TouchableOpacity
          onPress={() => setGacha(!gacha)}
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: 5,
            backgroundColor: colors.primary,
            width: 100,
            marginVertical: 10,
            paddingHorizontal: 20,
            paddingVertical: 10,
            borderRadius: 8,
          }}
        >
          <SimpleLineIcons name="magic-wand" size={24} color={colors.white} />
          <StyledText title="Gacha" textStyle={{ color: colors.white }} />
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <SafeAreaView
      style={{ flex: 1, marginBottom: Platform.OS === "ios" ? -35 : 0 }}
    >
      <FriendHeader screen="recommend" />
      <View style={{ flex: 1 }}>
        <FlatList
          data={randomList}
          ListHeaderComponent={renderHeader}
          keyExtractor={(item) => item.userId}
          renderItem={renderItem}
        />
      </View>
    </SafeAreaView>
  );
};

export default RandomUserScreen;
