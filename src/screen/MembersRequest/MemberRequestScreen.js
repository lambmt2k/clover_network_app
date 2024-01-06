import { View, Text, FlatList, Image, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import GroupApi from "../../apis/Group";
import { Ionicons } from "@expo/vector-icons";
import StyledText from "../../components/StyledText/StyledText";
import { Entypo } from "@expo/vector-icons";
import { colors } from "../../themes/style";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const MemberRequestScreen = ({ route }) => {
  const { groupId } = route.params;

  const { user } = useSelector((state) => state.login);
  const navigation = useNavigation();
  const [listWaiting, setListWaiting] = useState();
  const getListWaitingMember = () => {
    GroupApi.getListWaitingMember(user.tokenId, groupId)
      .then((res) => {
        if (res.data.code === 208) {
          setListWaiting([]);
        } else {
          console.log(res.data);
          setListWaiting(res.data.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getListWaitingMember();
  }, []);
  const handleApprove = (userId) => {
    const data = {
      groupId,
      userId,
    };
    // console.log(data)
    GroupApi.approveMember(user.tokenId, data)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const renderItem = ({ item }) => {
    console.log(item.userId);
    return (
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
          <Image
            source={{ uri: item.avatarImgUrl }}
            style={{
              width: 60,
              height: 60,
              borderRadius: 30,
              borderColor: colors.primary,
              borderWidth: 2,
            }}
          />
          <StyledText title={item.displayName} textStyle={{ fontSize: 14 }} />
        </View>
        <TouchableOpacity
          style={{
            backgroundColor: colors.primary,
            paddingHorizontal: 20,
            paddingVertical: 10,
            borderRadius: 8,
          }}
          onPress={() => handleApprove(item.userId)}
        >
          <StyledText title="Approve" textStyle={{ color: colors.white }} />
        </TouchableOpacity>
      </View>
    );
  };
  const renderEmpty = () => {
    return (
      <View style={{justifyContent:"center",alignItems:"center"}}>
        <MaterialIcons name="article" size={60} color={colors.primary} />
        <StyledText title="No member request to review" textStyle={{fontSize:16,fontFamily:"BeVietnamPro_500Medium"}}/>
        <StyledText title="When people submit member requests to your group" textStyle={{marginVertical:10,fontSize:16}}/>
        <StyledText title="they'll appear here for you to review." textStyle={{fontSize:16}}/>
      </View>
    );
  };
  return (
    <SafeAreaView style={{flex:1}}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingHorizontal: 8,
          paddingVertical: 12,
          borderBottomWidth: 1,
          borderBottomColor: colors.primary,
          marginBottom: 15,
          
        }}
      >
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color={colors.primary} />
        </TouchableOpacity>

        <StyledText
          title="Waiting List"
          textStyle={{ fontSize: 16, color: colors.primary,fontFamily:"BeVietnamPro_600SemiBold" }}
        />
        <Entypo name="shield" size={24} color={colors.primary} />
      </View>
      <View style={{ paddingHorizontal: 8, flex: 1 }}>
        <FlatList
          data={listWaiting}
          keyExtractor={(item) => item.userId}
          renderItem={renderItem}
          ListEmptyComponent={renderEmpty}
        />
      </View>
    </SafeAreaView>
  );
};

export default MemberRequestScreen;
