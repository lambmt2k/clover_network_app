import {
  View,
  Text,
  SafeAreaView,
  Image,
  TextInput,
  TouchableOpacity,
  Pressable,
  FlatList,
  Platform,
} from "react-native";
import React, { useEffect } from "react";
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

const HomeScreen = () => {
  const data = [
    {
      userID: "809c7309-1c6a-4601-99c5-06d05617ebcc",
      userName: "xscouler0",
      first_name: "Ximenes",
      last_name: "Scouler",
      gender: "Male",
      avatar:
        "https://robohash.org/occaecatilaboriosamlaborum.png?size=50x50&set=set1",
      comment: 82,
      heart: 16,
      share: 84,
      postPic: "http://dummyimage.com/221x201.png/5fa2dd/ffffff",
      status:
        "In quis justo. Maecenas rhoncus aliquam lacus. Morbi quis tortor id nulla ultrices aliquet.\n\nMaecenas leo odio, condimentum id, luctus nec, molestie sed, justo. Pellentesque viverra pede ac diam. Cras pellentesque volutpat dui.",
    },
    {
      userID: "8a30af12-a1b8-4f45-bbba-6b6e0a149c47",
      userName: "pbucktrout1",
      first_name: "Pansie",
      last_name: "Bucktrout",
      gender: "Female",
      avatar: "https://robohash.org/magnamoptiosaepe.png?size=50x50&set=set1",
      comment: 1,
      heart: 85,
      share: 35,
      postPic: "http://dummyimage.com/135x121.png/dddddd/000000",
      status:
        "Proin eu mi. Nulla ac enim. In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem.\n\nDuis aliquam convallis nunc. Proin at turpis a pede posuere nonummy. Integer non velit.",
    },
    {
      userID: "0e5e0f4e-70a1-4dfb-b8b7-c422046635ea",
      userName: "klandsbury2",
      first_name: "Kelsey",
      last_name: "Landsbury",
      gender: "Male",
      avatar: "https://robohash.org/doloreipsamhic.png?size=50x50&set=set1",
      comment: 32,
      heart: 79,
      share: 12,
      postPic: "http://dummyimage.com/138x205.png/ff4444/ffffff",
      status:
        "Morbi porttitor lorem id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem.\n\nFusce consequat. Nulla nisl. Nunc nisl.",
    },
    {
      userID: "cac010ae-aeb4-4551-9511-75be9cc53302",
      userName: "llage3",
      first_name: "Lyndsay",
      last_name: "Lage",
      gender: "Female",
      avatar:
        "https://robohash.org/expeditaarchitectoofficiis.png?size=50x50&set=set1",
      comment: 91,
      heart: 52,
      share: 15,
      postPic: "http://dummyimage.com/147x218.png/5fa2dd/ffffff",
      status:
        "Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.\n\nProin interdum mauris non ligula pellentesque ultrices. Phasellus id sapien in sapien iaculis congue. Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl.\n\nAenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum.",
    },
    {
      userID: "0dfe28d0-4d38-4d8b-b3e0-18487baeb78e",
      userName: "alicciardi4",
      first_name: "Art",
      last_name: "Licciardi",
      gender: "Male",
      avatar: "https://robohash.org/quoexpeditaimpedit.png?size=50x50&set=set1",
      comment: 41,
      heart: 56,
      share: 37,
      postPic: "http://dummyimage.com/160x172.png/ff4444/ffffff",
      status:
        "Curabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est.",
    },
    {
      userID: "7baed633-9b6c-47bc-93b0-920f61fc3855",
      userName: "jgouldstone5",
      first_name: "Joelie",
      last_name: "Gouldstone",
      gender: "Female",
      avatar:
        "https://robohash.org/molestiaeasperioresnatus.png?size=50x50&set=set1",
      comment: 77,
      heart: 34,
      share: 7,
      postPic: "http://dummyimage.com/244x230.png/dddddd/000000",
      status:
        "Maecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti.",
    },
    {
      userID: "15e9874b-5ecf-4850-83bb-f78925110ff3",
      userName: "szute6",
      first_name: "Sharl",
      last_name: "Zute",
      gender: "Female",
      avatar: "https://robohash.org/quiitaquefugiat.png?size=50x50&set=set1",
      comment: 69,
      heart: 6,
      share: 70,
      postPic: "http://dummyimage.com/181x177.png/dddddd/000000",
      status:
        "Proin leo odio, porttitor id, consequat in, consequat ut, nulla. Sed accumsan felis. Ut at dolor quis odio consequat varius.\n\nInteger ac leo. Pellentesque ultrices mattis odio. Donec vitae nisi.\n\nNam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla. Sed vel enim sit amet nunc viverra dapibus. Nulla suscipit ligula in lacus.",
    },
    {
      userID: "3ef58e11-e9d3-4e2a-a546-3cc41632ed6f",
      userName: "ttanswill7",
      first_name: "Tammi",
      last_name: "Tanswill",
      gender: "Female",
      avatar: "https://robohash.org/eiusautblanditiis.png?size=50x50&set=set1",
      comment: 95,
      heart: 44,
      share: 19,
      postPic: "http://dummyimage.com/247x145.png/dddddd/000000",
      status:
        "Donec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi. Integer ac neque.",
    },
    {
      userID: "73f11f8e-0a0b-4e47-82d6-ab83aee44d91",
      userName: "wplampeyn8",
      first_name: "Willa",
      last_name: "Plampeyn",
      gender: "Female",
      avatar: "https://robohash.org/molestiaeerrorhic.png?size=50x50&set=set1",
      comment: 11,
      heart: 12,
      share: 61,
      postPic: "http://dummyimage.com/144x134.png/ff4444/ffffff",
      status:
        "Duis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa. Donec dapibus. Duis at velit eu est congue elementum.",
    },
    {
      userID: "77cae303-3106-4a45-bb56-18c9e8a0f865",
      userName: "lhames9",
      first_name: "Lindsy",
      last_name: "Hames",
      gender: "Female",
      avatar:
        "https://robohash.org/laboriosamiustoexplicabo.png?size=50x50&set=set1",
      comment: 38,
      heart: 44,
      share: 60,
      postPic: "http://dummyimage.com/214x221.png/ff4444/ffffff",
      status:
        "Quisque id justo sit amet sapien dignissim vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est. Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros.",
    },
    {
      userID: "dce1bd8f-9b70-40f0-81db-0ffbbf06394c",
      userName: "jhardakera",
      first_name: "Jerrylee",
      last_name: "Hardaker",
      gender: "Female",
      avatar:
        "https://robohash.org/molestiaeveritatisaut.png?size=50x50&set=set1",
      comment: 58,
      heart: 61,
      share: 48,
      postPic: "http://dummyimage.com/131x162.png/5fa2dd/ffffff",
      status:
        "In quis justo. Maecenas rhoncus aliquam lacus. Morbi quis tortor id nulla ultrices aliquet.",
    },
    {
      userID: "ce3b0a00-ce21-4c9c-9b6a-84b857ed49ac",
      userName: "hthiesb",
      first_name: "Haskell",
      last_name: "Thies",
      gender: "Male",
      avatar: "https://robohash.org/officiaetodio.png?size=50x50&set=set1",
      comment: 47,
      heart: 2,
      share: 7,
      postPic: "http://dummyimage.com/183x250.png/dddddd/000000",
      status:
        "Curabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est.",
    },
    {
      userID: "193a6a7a-957f-4817-8264-bed7065e3646",
      userName: "ksaggersc",
      first_name: "Kalie",
      last_name: "Saggers",
      gender: "Female",
      avatar: "https://robohash.org/oditenimreiciendis.png?size=50x50&set=set1",
      comment: 1,
      heart: 28,
      share: 35,
      postPic: "http://dummyimage.com/205x122.png/dddddd/000000",
      status:
        "Proin eu mi. Nulla ac enim. In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem.\n\nDuis aliquam convallis nunc. Proin at turpis a pede posuere nonummy. Integer non velit.\n\nDonec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi. Integer ac neque.",
    },
    {
      userID: "c4b8fc37-f772-4644-a57a-f4405ddf876b",
      userName: "dmceloryd",
      first_name: "Darcey",
      last_name: "McElory",
      gender: "Bigender",
      avatar:
        "https://robohash.org/magniveritatisreprehenderit.png?size=50x50&set=set1",
      comment: 61,
      heart: 32,
      share: 77,
      postPic: "http://dummyimage.com/238x170.png/5fa2dd/ffffff",
      status:
        "Integer ac leo. Pellentesque ultrices mattis odio. Donec vitae nisi.",
    },
    {
      userID: "e73b2bb7-010d-40b7-8c92-eb89bc31208c",
      userName: "tjakubowicze",
      first_name: "Tait",
      last_name: "Jakubowicz",
      gender: "Male",
      avatar: "https://robohash.org/iustoquiomnis.png?size=50x50&set=set1",
      comment: 43,
      heart: 15,
      share: 53,
      postPic: "http://dummyimage.com/182x150.png/5fa2dd/ffffff",
      status:
        "Aliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis.\n\nSed ante. Vivamus tortor. Duis mattis egestas metus.\n\nAenean fermentum. Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh.",
    },
    {
      userID: "7423830c-3951-4da0-9f90-72f6932c0000",
      userName: "rmadinef",
      first_name: "Rubi",
      last_name: "Madine",
      gender: "Female",
      avatar: "https://robohash.org/quisametsunt.png?size=50x50&set=set1",
      comment: 65,
      heart: 21,
      share: 57,
      postPic: "http://dummyimage.com/197x184.png/cc0000/ffffff",
      status:
        "In hac habitasse platea dictumst. Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo.",
    },
    {
      userID: "6faf7729-0ae0-43bf-bf08-ea1f788b9fc2",
      userName: "ecarlowg",
      first_name: "Eb",
      last_name: "Carlow",
      gender: "Male",
      avatar: "https://robohash.org/placeatquoet.png?size=50x50&set=set1",
      comment: 99,
      heart: 69,
      share: 16,
      postPic: "http://dummyimage.com/216x152.png/dddddd/000000",
      status:
        "Duis bibendum. Morbi non quam nec dui luctus rutrum. Nulla tellus.",
    },
    {
      userID: "fff929ce-6a69-4edd-84cd-e697e409851f",
      userName: "syarmouthh",
      first_name: "Sibylle",
      last_name: "Yarmouth",
      gender: "Female",
      avatar: "https://robohash.org/etquiconsectetur.png?size=50x50&set=set1",
      comment: 73,
      heart: 1,
      share: 33,
      postPic: "http://dummyimage.com/237x215.png/ff4444/ffffff",
      status:
        "Curabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est.\n\nPhasellus sit amet erat. Nulla tempus. Vivamus in felis eu sapien cursus vestibulum.\n\nProin eu mi. Nulla ac enim. In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem.",
    },
    {
      userID: "f46b57c9-92a5-4448-bff4-a6f189a77351",
      userName: "bleckyi",
      first_name: "Blondie",
      last_name: "Lecky",
      gender: "Female",
      avatar: "https://robohash.org/istecorruptiid.png?size=50x50&set=set1",
      comment: 8,
      heart: 32,
      share: 55,
      postPic: "http://dummyimage.com/186x185.png/5fa2dd/ffffff",
      status:
        "Curabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est.\n\nPhasellus sit amet erat. Nulla tempus. Vivamus in felis eu sapien cursus vestibulum.\n\nProin eu mi. Nulla ac enim. In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem.",
    },
    {
      userID: "d8c6bc62-62ba-45ae-a571-e5d47184246d",
      userName: "gtoffettoj",
      first_name: "Grete",
      last_name: "Toffetto",
      gender: "Female",
      avatar:
        "https://robohash.org/estofficiaquibusdam.png?size=50x50&set=set1",
      comment: 25,
      heart: 15,
      share: 1,
      postPic: "http://dummyimage.com/150x139.png/dddddd/000000",
      status:
        "Pellentesque at nulla. Suspendisse potenti. Cras in purus eu magna vulputate luctus.\n\nCum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.\n\nEtiam vel augue. Vestibulum rutrum rutrum neque. Aenean auctor gravida sem.",
    },
  ];
  const renderItem = ({ item }) => <Post data={item} />;
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.login);
  const { userInfo, loading } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getUserInfo(user.tokenId));
  }, []);
  const navigation = useNavigation();
  // if(Platform.OS  === 'android'){
  //   console.log(userInfo)
  // }

  // if(loading) {console.log("loaing")}
  return (
    <SafeAreaView style={[style.droidSafeArea, styles.topSafeArea]}>
      <View style={styles.container}>
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
            <TouchableOpacity>
              <MagnifyingGlassIcon color={colors.primary} size={32} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.flatlistContainer}>
          <FlatList
            ListHeaderComponent={
              <View className="Post" style={styles.postContainer}>
                <View className="user" style={styles.user}>
                  <View style={styles.userImageContainer}>
                    <Image
                      source={{ uri: userInfo?.avatarImgUrl }}
                      style={styles.userImage}
                    />
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
                  </Pressable>

                  <Image
                    source={require("../../assets/img/addImage.png")}
                    style={styles.upload}
                  />
                </View>
              </View>
            }
            data={data}
            renderItem={renderItem}
            keyExtractor={(item) => item.userID}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

// ListHeaderComponent={
//   <View className="Post" style={styles.postContainer}>
//     <View className="user" style={styles.user}>
//       <View style={styles.userImageContainer}>
//         <Image
//           source={{ uri: userInfo.avatarImgUrl }}
//           style={styles.userImage}
//         />
//       </View>
//       <Pressable
//         onPress={() => {
//           navigation.navigate("PostScreen");
//         }}
//         style={({ pressed }) => [
//           {
//             backgroundColor: pressed ? colors.lightGrey : "white",
//             paddingVertical: 10,
//             borderRadius: 16,
//           },
//           styles.pressArea,
//         ]}
//       >
//         <StyledText
//           title={`What's on your mind? ${userInfo?.lastname}`}
//           textStyle={styles.userText}
//         />
//       </Pressable>

//       <Image
//         source={require("../../assets/img/addImage.png")}
//         style={styles.upload}
//       />
//     </View>
//   </View>
// }
