import { StatusBar } from "expo-status-bar";
import { Image, TouchableOpacity, View } from "react-native";
import LoginScreen from "./src/screen/LoginScreen/LoginScreen";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import SignUpScreen from "./src/screen/SignUpScreen/SignUpScreen";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import UserProfileScreen from "./src/screen/UserProfileScreen/UserProfileScreen";
import NotiScreen from "./src/screen/NotiScreen/NotiScreen";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";
import { useSelector } from "react-redux";
import SignUpSuccessScreen from "./src/screen/SignUpSuccessScreen/SignUpSuccessScreen";
import PostScreen from "./src/screen/PostScreen/PostScreen";
import { Entypo, Ionicons } from "@expo/vector-icons";
import { colors } from "./src/themes/style";
import FriendScreen from "./src/screen/FriendScreen/FriendScreen";
import MenuScreen from "./src/screen/MenuScreen/MenuScreen";
import Loader from "./src/components/Loader/Loader";
import HomeScreen from "./src/screen/HomeScreen/HomeScreen";
import GroupScreen from "./src/screen/GroupScreen/GroupScreen";
import EditUserProfileScreen from "./src/screen/EditUserProfileScreen/EditUserProfileScreen";
import EditUserInfoScreen from "./src/screen/EditUserInfoScreen/EditUserInfoScreen";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import GroupHomeScreen from "./src/screen/GroupHomeScreen/GroupHomeScreen";
import GroupHeader from "./src/components/GroupHeader/GroupHeader";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { ColorSchemeStore } from "nativewind/dist/style-sheet/color-scheme";
import StyledText from "./src/components/StyledText/StyledText";
import { createStackNavigator } from "@react-navigation/stack";
import CreateGroupScreen from "./src/screen/CreateGroupScreen/CreateGroupScreen";
import InvitePeople from "./src/screen/InvitePeopleScreen/InvitePeople";
import GroupDetailScreen from "./src/screen/GroupDetailScreen/GroupDetailScreen";
import SearchScreen from "./src/screen/SearchScreen/SearchScreen";
import SearchResultScreen from "./src/screen/SearchResultScreen/SearchResultScreen";
import GroupPrivateScreen from "./src/screen/GroupPrivateScreen/GroupPrivateScreen";
import FollowerScreen from "./src/screen/FollowerScreen/FollowerScreen";
import FogotPasswordScreen from "./src/screen/FotgotPasswordScreen/FogotPasswordScreen";
import ChangePasswordScreen from "./src/screen/ChangePassword/ChangePasswordScreen";
import FeedDetailScreen from "./src/screen/FeedDetailScreen/FeedDetailScreen";
import GroupMemberScreen from "./src/screen/GroupMemberScreen/GroupMemberScreen";
import ChangeNewPasswordScreen from "./src/screen/ChangNewPasswordScreen/ChangeNewPasswordScreen";
import MemberRequestScreen from "./src/screen/MembersRequest/MemberRequestScreen";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const TopTab = createMaterialTopTabNavigator();
const CustomTabButton = (props) => (
  <TouchableOpacity
    {...props}
    style={
      props.accessibilityState.selected
        ? [props.style, { borderTopColor: colors.primary, borderTopWidth: 2 }]
        : props.style
    }
  />
);
const HomeStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="HomeScreen"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="UserScreen" component={UserProfileScreen} />
      <Stack.Screen
        name="EditUserProfileScreen"
        component={EditUserProfileScreen}
      />
      <Stack.Screen name="EditUserInfoScreen" component={EditUserInfoScreen} />
      <Stack.Screen name="SearchScreen" component={SearchScreen}/>
      <Stack.Screen name="SearchResultScreen" component={SearchResultScreen}/>
      
    </Stack.Navigator>
  );
};
const GroupStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="GroupHomeScreen"
      screenOptions={{
        headerShown: false,
        
      }}
    >
      <Stack.Screen name="GroupHomeScreen" component={GroupHomeScreen} />
      <Stack.Screen name="GroupListScreen" component={GroupScreen} />
      <Stack.Screen name="GroupMemberScreen" component={GroupMemberScreen} />
      <Stack.Screen name="GroupMemberWaitingScreen" component={MemberRequestScreen} />
      <Stack.Screen name="GroupDetailScreen" component={GroupDetailScreen} />
      
      
    </Stack.Navigator>
  );
};
const FriendStack = ()=>{
  return(
    <Stack.Navigator initialRouteName="FollowingScreen" screenOptions={{headerShown:false}}>
      <Stack.Screen name="FollowingScreen" component={FriendScreen}/>
      <Stack.Screen name="FollowerScreen" component={FollowerScreen}/>
    </Stack.Navigator>
  )
}
// const GroupMainScreen = () => {
//   return (
//     <>
//       <GroupHeader />
//       <GroupTab />
//     </>
//   );
// };
// const GroupStack = () => {
//   return (
//     <Stack.Navigator
//       initialRouteName="GroupScreen"
//       screenOptions={{
//         headerShown: false,
//       }}
//     >
//       <Stack.Screen name="GroupScreen" component={GroupMainScreen} />
//       <Stack.Screen name="GroupDetailScreen" component={GroupDetailScreen} />
//     </Stack.Navigator>
//   );
// };

const MyTabs = () => {
  const { userInfo, loading } = useSelector((state) => state.user);

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.black,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={{
          tabBarIcon: ({ focused }) => {
            return focused ? (
              <Entypo name="home" size={24} color={colors.primary} />
            ) : (
              <Entypo name="home" size={24} color={colors.black} />
            );
          },
          tabBarButton: CustomTabButton,
        }}
      />
      <Tab.Screen
        name="Friends"
        component={FriendStack}
        options={{
          tabBarIcon: ({ focused }) => {
            return focused ? (
              <Ionicons name="people" size={24} color={colors.primary} />
            ) : (
              <Ionicons name="people-outline" size={24} color="black" />
            );
          },
          tabBarButton: CustomTabButton,
        }}
      />
      <Tab.Screen
        name="Groups"
        component={GroupStack}
        options={{
          tabBarIcon: ({ focused }) => {
            return focused ? (
              <Ionicons
                name="people-circle-sharp"
                size={24}
                color={colors.primary}
              />
            ) : (
              <Ionicons name="people-circle-sharp" size={24} color="black" />
            );
          },
          tabBarButton: CustomTabButton,
        }}
      />
      <Tab.Screen
        name="Notification"
        component={NotiScreen}
        options={{
          tabBarIcon: ({ focused }) => {
            return focused ? (
              <Ionicons
                name="notifications-sharp"
                size={24}
                color={colors.primary}
              />
            ) : (
              <Ionicons name="notifications-outline" size={24} color="black" />
            );
          },
          tabBarButton: CustomTabButton,
        }}
      />
      <Tab.Screen
        name="Menu"
        component={MenuScreen}
        options={{
          tabBarIcon: ({ focused }) => {
            return focused ? (
              <View>
                <Image
                  source={{ uri: userInfo?.avatar }}
                  style={{
                    width: 24,
                    height: 24,
                    borderRadius: 24 / 2,
                    borderWidth: 1,
                    borderColor: colors.primary,
                    position: "relative",
                  }}
                />
                <View
                  style={{
                    borderColor: colors.primary,
                    borderWidth: 1,
                    borderRadius: 13 / 2,
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: colors.secondary,
                    position: "absolute",
                    bottom: 0,
                    right: -5,
                  }}
                >
                  <Ionicons name="menu" size={13} color="black" />
                </View>
              </View>
            ) : (
              <View>
                <Image
                  source={{ uri: userInfo?.avatar }}
                  style={{
                    width: 24,
                    height: 24,
                    borderRadius: 24 / 2,
                    borderWidth: 1,
                    borderColor: colors.black,
                    position: "relative",
                  }}
                />
                <View
                  style={{
                    borderColor: colors.black,
                    borderWidth: 1,
                    borderRadius: 13 / 2,
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: colors.secondary,
                    position: "absolute",
                    bottom: 0,
                    right: -5,
                  }}
                >
                  <Ionicons name="menu" size={13} color="black" />
                </View>
              </View>
            );
          },
          tabBarButton: CustomTabButton,
        }}
      />
    </Tab.Navigator>
  );
};

const Routes = () => {
  // console.log(token);
  // useEffect(() => {
  //   const getData = async () => {
  //     try {
  //       const value = await AsyncStorage.getItem("token");
  //       if (value !== null) {
  //         console.log(value);
  //         setToken(value);
  //       }
  //     } catch (e) {
  //       console.log(e);
  //     }
  //   };
  //   getData();
  // }, [token]);
  const { user } = useSelector((state) => state.login);

  if (user)
    return (
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen
            name="MainScreen"
            component={MyTabs}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="PostScreen"
            component={PostScreen}
            options={{ presentation: "fullScreenModal", headerShown: false }}
          />
          <Stack.Screen name="InvitePeopleScreen" component={InvitePeople}  options={{ presentation: "fullScreenModal", headerShown: false }}/>
          <Stack.Screen
            name="CreateGroupScreen"
            component={CreateGroupScreen}
            options={{ presentation: "fullScreenModal", headerShown: false }}
          />
          
          <Stack.Screen name="FeedDetail" component={FeedDetailScreen} options={{presentation:"fullScreenModal"}}/>
          <Stack.Screen name="ChangeNewPassword" component={ChangeNewPasswordScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  if (user === null)
    return (
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="SignUpSuccess" component={SignUpSuccessScreen} />
          <Stack.Screen name="SignUp" component={SignUpScreen} />
          <Stack.Screen name="FogotPassword" component={FogotPasswordScreen} />
          <Stack.Screen name="ChangePassword" component={ChangePasswordScreen} />
          
        </Stack.Navigator>
      </NavigationContainer>
    );
};

export default Routes;
