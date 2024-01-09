import { View, Text, TouchableOpacity, FlatList, Image, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import { styles } from "./styles";
import { useNavigation } from "@react-navigation/native";
import { colors } from "../../themes/style";
import StyledText from "../../components/StyledText/StyledText";
import { SafeAreaView } from "react-native-safe-area-context";
import FriendApi from "../../apis/Friend";
import { useSelector } from "react-redux";

const InvitePeople = ({route}) => {
  const {groupId} = route.params
  const { user } = useSelector((state) => state.login);
  const [randomList, setRandomList] = useState([]);
  const navigation = useNavigation();
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
  }, []);
  const renderItem = ({ item }) => {
    return (
      <Pressable
        
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
              
              style={{
                paddingHorizontal: 22,
                paddingVertical: 12,
                backgroundColor: colors.primary,
                borderRadius: 8,
              }}
            >
              <StyledText title="Invite" textStyle={{ color: colors.white }} />
            </TouchableOpacity>
          </View>
        </View>
      </Pressable>
    );
  };
  return (
    <SafeAreaView style={{flex:1}}>
      <View>
        
        <View style={styles.header}>
        <View></View>
          <StyledText title="Invite people" textStyle={styles.headerText} />
          <View>
            <TouchableOpacity onPress={() => navigation.navigate("GroupDetailScreen",{groupId})}>
              <StyledText title="Next" textStyle={{color:colors.primary}}/>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={{ flex: 1 }}>
        <FlatList
          data={randomList}
          keyExtractor={(item) => item.userId}
          renderItem={renderItem}
        />
      </View>
    </SafeAreaView>
  );
};

export default InvitePeople;
