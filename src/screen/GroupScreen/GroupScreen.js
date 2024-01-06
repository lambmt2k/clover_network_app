import { View, Text, ScrollView, FlatList } from "react-native";
import React, { useEffect } from "react";
import GroupApi from "../../apis/Group";
import { useSelector } from "react-redux";
import { useState } from "react";
import GroupCard from "../../components/GroupCard/GroupCard";
import StyledText from "../../components/StyledText/StyledText";
import style, { colors } from "../../themes/style";
import GroupHeader from "../../components/GroupHeader/GroupHeader";
import { SafeAreaView } from "react-native-safe-area-context";

const GroupScreen = () => {
  const { user } = useSelector((state) => state.login);
  const { userInfo, loading } = useSelector((state) => state.user);
  const [groupData, setGroupData] = useState();
  const [fetching, setFetching] = useState(false);
  const renderItem = ({ item }) => <GroupCard data={item} />;
  const handleRefesh = () => {
    setFetching(true);
  };
  const getAllUserGroup = () => {
    GroupApi.getAllUserGroup(user.tokenId)
      .then((res) => {
        setGroupData(res.data.data);
        setFetching(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getAllUserGroup();
  }, [fetching]);
  return (
    <SafeAreaView
      style={{ flex: 1, marginBottom: Platform.OS === "ios" ? -35 : 0 }}
    >
      <GroupHeader screen="Yourgroup"/>
      <View style={{ marginHorizontal: 10, marginVertical: 5 }}>
        <StyledText
          title="Your Group"
          textStyle={{ fontSize: 20, fontFamily: "BeVietnamPro_700Bold" }}
        />
      </View>
      {/* <ScrollView>
        {groupData?.map((item, index) => {
          return <GroupCard data={item} key={index} />;
        })}
      </ScrollView> */}
      <View style={{ flex: 1 }}>
        <FlatList
          data={groupData}
          onRefresh={handleRefesh}
          refreshing={fetching}
          renderItem={renderItem}
          keyExtractor={(item) => item.groupId}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      </View>
    </SafeAreaView>
  );
};

export default GroupScreen;
