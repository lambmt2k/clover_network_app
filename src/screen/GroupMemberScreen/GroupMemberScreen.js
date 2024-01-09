import { View, Text, TouchableOpacity, FlatList, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import StyledText from "../../components/StyledText/StyledText";
import { useNavigation } from "@react-navigation/native";
import { colors } from "../../themes/style";
import GroupApi from "../../apis/Group";
import { useSelector } from "react-redux";

const GroupMemberScreen = ({ route }) => {
  const { groupInfo } = route.params;
  const navigation = useNavigation();
  const { user } = useSelector((state) => state.login);

  const [listMember, setListMember] = useState([]);
  const [listAdmin, setListAdmin] = useState([]);
  const getListMember = () => {
    GroupApi.getListGroupMember(
      user.tokenId,
      groupInfo.group.groupId,
      "MEMBER",
      0
    )
      .then((res) => {
        setListMember([...listMember, ...res.data.data.members]);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getListAdmin = () => {
    GroupApi.getListGroupMember(
      user.tokenId,
      groupInfo.group.groupId,
      "OWNER",
      0
    )
      .then((res) => {
        setListAdmin([...listAdmin, ...res.data.data.members]);
        
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getListMember();
    getListAdmin();
  }, []);
  const renderMembers = ({ item }) => {
    return (
      <View
        style={{
          marginVertical: 4,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
          <View>
            <Image
              source={{ uri: item.avatarImgUrl }}
              style={{ width: 50, height: 50, borderRadius: 25 }}
            />
          </View>
          <StyledText title={item.displayName} />
        </View>
        {item.connected && (
          <TouchableOpacity
            style={{
              backgroundColor: colors.primary,
              paddingHorizontal: 20,
              paddingVertical: 10,
              borderRadius: 8,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <StyledText
              title="Follow"
              textStyle={{ color: colors.white, fontSize: 16 }}
            />
          </TouchableOpacity>
        )}
      </View>
    );
  };
  const renderEmpty = ()=>{
    return (<View>
      <StyledText title="This group don't have any member yet"/>
    </View>)
  }

  return (
    <SafeAreaView>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottomWidth: 1,
          borderBottomColor: colors.primary,
          paddingBottom: 10,
        }}
      >
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color={colors.primary} />
        </TouchableOpacity>
        <StyledText
          title={groupInfo.group?.groupName}
          textStyle={{ fontSize: 18, fontFamily: "BeVietnamPro_600SemiBold" }}
        />
        <View></View>
      </View>
      <View style={{ paddingHorizontal: 10, marginTop: 10 }}>
        <StyledText
          title="List Admin"
          textStyle={{ fontSize: 16, fontFamily: "BeVietnamPro_500Medium" }}
        />
      </View>
      <FlatList
        data={listAdmin}
        keyExtractor={(item) => item.userId}
        renderItem={renderMembers}
      />
      <View style={{ paddingHorizontal: 10, marginTop: 10 }}>
        <StyledText
          title="List Members"
          textStyle={{ fontSize: 16, fontFamily: "BeVietnamPro_500Medium" }}
        />
      </View>
      <View style={{ paddingHorizontal: 10 }}>
        <FlatList
          data={listMember}
          keyExtractor={(item) => item.userId}
          renderItem={renderMembers}
          ListEmptyComponent={renderEmpty}
        />
      </View>
    </SafeAreaView>
  );
};

export default GroupMemberScreen;
