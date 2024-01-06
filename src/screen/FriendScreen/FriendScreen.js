import {
  View,
  Text,
  ActivityIndicator,
  FlatList,
  Image,
  TouchableOpacity,
  Pressable,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import FriendHeader from "../../components/FriendHeader/FriendHeader";
import { useSelector } from "react-redux";
import FriendApi from "../../apis/Friend";
import { useNavigation } from "@react-navigation/native";
import StyledText from "../../components/StyledText/StyledText";
import { styles } from "./styles";
import { colors } from "../../themes/style";

const FriendScreen = () => {
  const { user } = useSelector((state) => state.login);
  const navigation = useNavigation();
  const [page, setPage] = useState(0);
  const [listFollowing, setListFollowing] = useState([]);
  const [fetching, setFetching] = useState(false);
  const [loadMore, setLoadMore] = useState(false);
  const [endData, setEndData] = useState(false);
  const [
    onEndReachedCalledDuringMomentum,
    setOnEndReachedCalledDuringMomentum,
  ] = useState(true);
  const [firstLoad, setFirstLoad] = useState(true);
  const getFollowingList = () => {
    if (fetching) {
      FriendApi.getListFolllowing(user.tokenId, user.userId, page)
        .then((res) => {
          setListFollowing(res.data.data?.userProfiles);
          setFetching(false);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      FriendApi.getListFolllowing(user.tokenId, user.userId, page)
        .then((res) => {
          if (res.data.data?.userProfiles === null) {
            setLoadMore(false);
            setEndData(true);
          } else {
            if (firstLoad) {
              setListFollowing(res.data.data?.userProfiles);
              setFirstLoad(false);
            } else {
              const newListFollowingData = [
                ...listFollowing,
                ...res.data.data?.userProfiles,
              ];
              const uniqueFollowingIds = [];
              //const uniqueFeedsId = [...new Set(newFeedsData.map((it)=>it.feedItem?.postId))]
              const newListFollowing = newListFollowingData.filter((it) => {
                const isDuplicate = uniqueFollowingIds.includes(it.userId);
                if (!isDuplicate) {
                  uniqueFollowingIds.push(it.userId);
                  return true;
                }
                return false;
              });

              setListFollowing(newListFollowing);
              setLoadMore(false);
            }
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  const renderLoader = () => {
    return loadMore ? (
      <View>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    ) : null;
  };
  const renderNoMore = () => {
    return endData ? (
      <View>
        <StyledText title="You have read all post, Let's post something new" />
      </View>
    ) : null;
  };
  useEffect(() => {
    getFollowingList();
  }, [page, fetching]);
  const handleLoadMore = () => {
    if (!onEndReachedCalledDuringMomentum) {
      setLoadMore(true);
      if (endData === false) {
        setPage(page + 1);
      }
    }
  };

  const handleRefesh = () => {
    if (endData) {
      setPage(0);
      setEndData(false);
    }
    setFetching(true);
    // console.log("reload");
    // setEndData(false);
    // setFetching(true);
  };
  const renderItem = ({ item }) => {
    return (
      <Pressable onPress={()=>navigation.navigate("UserScreen",{userId:item.userId})}>
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
              <StyledText
                title="Unfollow"
                textStyle={{ color: colors.white }}
              />
            </TouchableOpacity>
          </View>
        
      </View>
      </Pressable>
    );
  };
  const renderEmpty = () => {
    return (
      <View>
        <StyledText title="Try to make some friends" />
      </View>
    );
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FriendHeader screen="following" />
      <View style={{ flex: 1, marginTop: 10, paddingHorizontal: 8 }}>
        <FlatList
          data={listFollowing}
          keyExtractor={(item) => item.userId}
          renderItem={renderItem}
          onRefresh={handleRefesh}
          refreshing={fetching}
          ListFooterComponent={endData ? renderNoMore : renderLoader}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0}
          ListEmptyComponent={renderEmpty}
          onMomentumScrollBegin={() => {
            setOnEndReachedCalledDuringMomentum(false);
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default FriendScreen;
