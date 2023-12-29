import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from "react-native";
import React from "react";
import StyledText from "../StyledText/StyledText";
import { styles } from "./styles";
import { useNavigation } from "@react-navigation/native";

const GroupCard = ({ data }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("GroupDetailScreen", { groupId: data.groupId })
      }
    >
      <View
        style={{
          flexDirection: "row",
          marginHorizontal: 10,
          marginVertical: 5,
        }}
      >
        <View>
          {data?.bannerImgUrl ? (
            <Image
              style={{ width: 40, height: 40 }}
              source={{ uri: data?.bannerImgUrl }}
            />
          ) : (
            <Image
              style={{ width: 40, height: 40, borderRadius: 4 }}
              source={require("../../assets/img/backGroundDefault.png")}
            />
          )}
          {/* <Image
            source={{
              uri: data.avatarImgUrl
                ? data.avatarImgUrl
                : "https://picsum.photos/200",
            }}
            style={{ width: 50, height: 50, borderRadius: 15 }}
          /> */}
        </View>
        <View style={{ marginLeft: 10 }}>
          <StyledText title={data.groupName} textStyle={styles.groupName} />
          <StyledText title={data.groupDesc} textStyle={styles.groupDesc} />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default GroupCard;
