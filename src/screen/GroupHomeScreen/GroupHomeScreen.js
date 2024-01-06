import { View, Text, FlatList, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import style, { colors } from "../../themes/style";
import GroupHeader from "../../components/GroupHeader/GroupHeader";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import PostApi from "../../apis/Post";
import { useNavigation } from "@react-navigation/native";
import Post from "../../components/Post/Post";
import StyledText from "../../components/StyledText/StyledText";

const GroupHomeScreen = () => {
  const { user } = useSelector((state) => state.login);
  const [fetching, setFetching] = useState(false);
  const [page, setPage] = useState(0);
  const [feeds, setFeeds] = useState([]);
  const [loadMore, setLoadMore] = useState(false);
  const [endData, setEndData] = useState(false);
  const [
    onEndReachedCalledDuringMomentum,
    setOnEndReachedCalledDuringMomentum,
  ] = useState(true);
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
  const getFeeds = () => {
    if (fetching) {
      PostApi.getAllPostAllGroup(user.tokenId, page)
        .then((res) => {
          setFeeds(res.data.data);
          setFetching(false);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      PostApi.getAllPostAllGroup(user.tokenId, page)
        .then((res) => {
          if (res.data.data === null) {
            setLoadMore(false);
            setEndData(true);
          } else {
            const newFeedsData = [...feeds, ...res.data.data];
              const uniqueFeedIds = [];
              //const uniqueFeedsId = [...new Set(newFeedsData.map((it)=>it.feedItem?.postId))]
              const newFeeds = newFeedsData.filter((it) => {
                const isDuplicate = uniqueFeedIds.includes(it.feedItem.postId);
                if (!isDuplicate) {
                  uniqueFeedIds.push(it.feedItem.postId);
                  return true;
                }
                return false;
              });
              
              setFeeds(newFeeds);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  
  useEffect(() => {
    getFeeds();
  }, [page,fetching]);

  const handleLoadMore = () => {
    if (!onEndReachedCalledDuringMomentum) {
      setLoadMore(true);
      if (endData === false) {
        setPage(page + 1);
      }
    }
  };
  const navigation = useNavigation();
  const handleRefesh = () => {
    if (endData) {
      setPage(0);
      setEndData(false);
    }
    setFetching(true);
  };
  const renderItem = ({ item }) => <Post data={item} />;
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView style={{flex:1,marginBottom:Platform.OS === "ios" ? -35 : 0}}  >
      <GroupHeader screen="Foryou"/>
      <View style={{ flex: 1  }}>
        <FlatList
          data={feeds}
          keyExtractor={(item) => item.feedItem.postId}
          renderItem={renderItem}
          onRefresh={handleRefesh}
          refreshing={fetching}
          ListFooterComponent={endData ? renderNoMore : renderLoader}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0}
          onMomentumScrollBegin={() => {
            setOnEndReachedCalledDuringMomentum(false);
          }}
          contentContainerStyle={{ marginBottom: 100 }}
        />
      </View>
    </SafeAreaView>
  );
};

export default GroupHomeScreen;
