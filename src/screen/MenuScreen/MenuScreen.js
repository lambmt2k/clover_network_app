import { View, Text, SafeAreaView, Pressable, Image } from "react-native";
import React from "react";
import StyledText from "../../components/StyledText/StyledText";
import { useDispatch, useSelector } from "react-redux";
import style, { colors } from "../../themes/style";
import { styles } from "./style";
import { logout } from "../../features/Auth/LoginFeatures/LoginSlice";
import { useNavigation } from "@react-navigation/native";

const MenuScreen = () => {
  const { userInfo } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  return (
    <SafeAreaView style={[style.droidSafeArea, { flex: 1 }]}>
      <View style={{ flex: 1 }}>
        <StyledText title="Menu" textStyle={styles.menuText} />
        <Pressable
          onPress={() => {
            navigation.navigate("UserScreen");
          }}
          style={({ pressed }) => [
            {
              backgroundColor: pressed ? colors.secondary : colors.lightGrey,
            },
            styles.userContainer,
          ]}
        >
          <View>
            <Image
              source={{ uri: userInfo.avatar }}
              style={{
                width: 38,
                height: 38,
                borderRadius: 38 / 2,
                borderWidth: 1,
                borderColor: colors.primary,
                marginRight: 5,
              }}
            />
          </View>
          <StyledText title={userInfo.firstname + " " + userInfo.lastname} />
        </Pressable>
      </View>
      <View style={{ flex: 1, justifyContent: "flex-end", marginBottom: 10 }}>
        <Pressable
          style={({ pressed }) => [
            {
              backgroundColor: pressed ? colors.secondary : colors.lightGrey,
            },
            styles.btnContainer,
          ]}
        >
          <StyledText title="Change Password" />
        </Pressable>
        <Pressable
          onPress={() => {
            dispatch(logout());
          }}
          style={({ pressed }) => [
            {
              backgroundColor: pressed ? colors.secondary : colors.lightGrey,
            },
            styles.btnContainer,
          ]}
        >
          <StyledText title="Log Out" />
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default MenuScreen;
