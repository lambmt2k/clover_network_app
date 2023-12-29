import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  Pressable,
  FlatList,
  Platform,
  ActivityIndicator,
} from "react-native";
import React, { memo, useEffect, useState } from "react";
import style, { colors } from "../../themes/style";
import { MagnifyingGlassIcon } from "react-native-heroicons/outline";
import { ArrowLeftOnRectangleIcon } from "react-native-heroicons/outline";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../features/Auth/LoginFeatures/LoginSlice";
import { useNavigation } from "@react-navigation/native";
import { styles } from "./styles";
import StyledText from "../../components/StyledText/StyledText";
import Post from "../../components/Post/Post";
import { getUserInfo } from "../../features/Auth/UserFeature/UserSlice";
import Loader from "../../components/Loader/Loader";
import { gestureHandlerRootHOC } from "react-native-gesture-handler";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import PostApi from "../../apis/Post";
import { SafeAreaView } from "react-native-safe-area-context";

const HomeScreen = () => {
  const renderItem = ({ item }) => <Post data={item} />;

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.login);
  const { userInfo, loading } = useSelector((state) => state.user);
  const [fetching, setFetching] = useState(false);
  const [page, setPage] = useState(0);
  const [feeds, setFeeds] = useState([]);
  const [loadMore, setLoadMore] = useState(false);
  const [endData, setEndData] = useState(false);
  const [
    onEndReachedCalledDuringMomentum,
    setOnEndReachedCalledDuringMomentum,
  ] = useState(true);
  const [firstLoad, setFirstLoad] = useState(true);
  const [pageFirstLoad, setPageFirstLoad] = useState(0);
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
      PostApi.getAllPost(user.tokenId, page)
        .then((res) => {
          setFeeds(res.data.data);
          setFetching(false);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      PostApi.getAllPost(user.tokenId, page)
        .then((res) => {
          if (res.data.data === null) {
            setLoadMore(false);
            setEndData(true);
          } else {
            if (firstLoad) {
              setFeeds(res.data.data);
              setFirstLoad(false);
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
    dispatch(getUserInfo(user.tokenId));
  }, []);
  useEffect(() => {
    getFeeds();
  }, [page, fetching]);

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
    // console.log("reload");
    // setEndData(false);
    // setFetching(true);
  };
  console.log(feeds);
  if (loading) return <Loader />;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <View
        style={[
          styles.container,
          { marginBottom: Platform.OS === "ios" ? -35 : 0 },
        ]}
      >
        <View style={styles.appbarContainer}>
          <View className="flex flex-row items-center justify-between">
            <View>
              <Image
                source={require("../../../assets/img/clover.png")}
                style={styles.appbarLogo}
              />
            </View>
            <StyledText textStyle={styles.appbarText} title="Clover" />
          </View>
          <View>
            <TouchableOpacity
              onPress={() => navigation.navigate("SearchScreen")}
            >
              <MagnifyingGlassIcon color={colors.primary} size={32} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ flex: 1 }}>
          <FlatList
            ListHeaderComponent={
              <View className="Post" style={styles.postContainer}>
                <View className="user" style={styles.user}>
                  <View style={styles.userImageContainer}>
                    <Pressable
                      onPress={() => {
                        navigation.navigate("UserScreen");
                      }}
                    >
                      <Image
                        source={{ uri: userInfo?.avatar }}
                        style={styles.userImage}
                      />
                    </Pressable>
                  </View>
                  <Pressable
                    onPress={() => {
                      navigation.navigate("PostScreen");
                    }}
                    style={({ pressed }) => [
                      {
                        backgroundColor: pressed ? colors.lightGrey : "white",
                        paddingVertical: 10,
                        borderRadius: 16,
                      },
                      styles.pressArea,
                    ]}
                  >
                    <StyledText
                      title={`What's on your mind? ${userInfo?.lastname}`}
                      textStyle={styles.userText}
                    />
                    {/* <Text style={styles.userText}>What's on your mind? { userInfo?.lastname}</Text> */}
                    <MaterialCommunityIcons
                      name="image-multiple"
                      size={24}
                      color={colors.primary}
                    />
                  </Pressable>
                  <TouchableOpacity
                    onPress={() => navigation.navigate("SearchScreen")}
                  ></TouchableOpacity>
                </View>
              </View>
            }
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
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default React.memo(HomeScreen);
