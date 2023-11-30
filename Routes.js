import { StatusBar } from "expo-status-bar";
import { Image, TouchableOpacity, View } from "react-native";
import LoginScreen from "./src/screen/LoginScreen/LoginScreen";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./src/screen/HomeScreen/HomeScreen";
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

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

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

const MyTabs = () => {
  const { userInfo } = useSelector((state) => state.user);
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
        component={HomeScreen}
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
        component={FriendScreen}
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
                  source={{ uri: userInfo.avatarImgUrl }}
                  style={{
                    width: 24,
                    height: 24,
                    borderRadius: 24 / 2,
                    borderWidth: 1,
                    borderColor: colors.primary,
                    position:"relative"
                  }}
                />
                <View
                  style={{
                    borderColor: colors.primary,
                    borderWidth: 1,
                    borderRadius:13/2,
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor:colors.secondary,
                    position:"absolute",
                    bottom:0,
                    right:-5
                  }}
                >
                  <Ionicons name="menu" size={13} color="black" />
                </View>
              </View>
            ) : (
              <View>
                <Image
                  source={{ uri: userInfo.avatarImgUrl }}
                  style={{
                    width: 24,
                    height: 24,
                    borderRadius: 24 / 2,
                    borderWidth: 1,
                    borderColor: colors.black,
                    position:"relative"
                  }}
                />
                <View
                  style={{
                    borderColor: colors.black,
                    borderWidth: 1,
                    borderRadius:13/2,
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor:colors.secondary,
                    position:"absolute",
                    bottom:0,
                    right:-5
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
        </Stack.Navigator>
      </NavigationContainer>
    );
};

export default Routes;
