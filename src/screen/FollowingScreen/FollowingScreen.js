import {
  View,
  Text,
  TouchableOpacity,
  Pressable,
  Image,
  FlatList,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import FriendHeader from "../../components/FriendHeader/FriendHeader";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import StyledText from "../../components/StyledText/StyledText";
import { colors } from "../../themes/style";
import { styles } from "./styles";
import FriendApi from "../../apis/Friend";

const FollowingScreen = () => {
  const [listFollowing, setListFollowing] = useState([]);
  const { user } = useSelector((state) => state.login);
  const navigation = useNavigation();

  const [fetching, setFetching] = useState(false);
  const [page, setPage] = useState(0);

  const [loadMore, setLoadMore] = useState(false);
  const [endData, setEndData] = useState(false);
  const [
    onEndReachedCalledDuringMomentum,
    setOnEndReachedCalledDuringMomentum,
  ] = useState(true);
  const [firstLoad, setFirstLoad] = useState(true);

  const renderLoader = () => {
    return loadMore ? (
      <View>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    ) : null;
  };
  const renderNoMore = () => {
    return endData ? <View></View> : null;
  };
  const getFollowingList = () => {
    if (fetching) {
      FriendApi.getListFolllowing(user.tokenId, user.userId, page)
        .then((res) => {
          setListFollowing(res.data.data.userProfiles);
          setFetching(false);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      FriendApi.getListFolllowing(user.tokenId, user.userId, page)
        .then((res) => {
          if (res.data.data === null) {
            setLoadMore(false);
            setEndData(true);
          } else {
            if (firstLoad) {
              setListFollowing(res.data.data.userProfiles);
              setFirstLoad(false);
            } else {
              const newListFollowingData = [
                ...listFollowing,
                ...res.data.data.userProfiles,
              ];
              const uniqueFollowingIds = [];
              //const uniqueFeedsId = [...new Set(newFeedsData.map((it)=>it.feedItem?.postId))]
              const newListFollowing = newListFollowingData.filter((it) => {
                const isDuplicate = uniqueFollowingIds.includes(it.userId);
                if (!isDuplicate) {
                  uniqueFeedIds.push(it.userId);
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

  return (
    <SafeAreaView style={{flex:1,}}>
      <FriendHeader screen="following" />
      <Text>FollowingScreen</Text>
      <View >
        <FlatList
          data={listFollowing}
          keyExtractor={(item) => item.userId}
          renderItem={renderItem}
          onRefresh={handleRefesh}
          refreshing={fetching}
          ListFooterComponent={endData ? renderNoMore : renderLoader}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0}
          onMomentumScrollBegin={() => {
            setOnEndReachedCalledDuringMomentum(false);
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default FollowingScreen;
