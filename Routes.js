import { StatusBar } from "expo-status-bar";
import { Image } from "react-native";
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

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const MyTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let icon;

          if (route.name === "Home") {
            icon = focused
              ? require("./assets/img/home-active.png")
              : require("./assets/img/home.png");
          } else if (route.name === "Noti") {
            icon = focused
              ? require("./assets/img/bell-active.png")
              : require("./assets/img/bell.png");
          } else if (route.name === "User") {
            icon = focused
              ? require("./assets/img/user-active.png")
              : require("./assets/img/user.png");
          }

          // You can return any component that you like here!
          return <Image style={{ width: 24, height: 24 }} source={icon} />;
        },
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          height: "7%",
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Noti" component={NotiScreen} />
      <Tab.Screen name="User" component={UserProfileScreen} />
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
  console.log(user);
  if (user)
    return (
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen
            name="MainScreen"
            component={MyTabs}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  if(user===null)
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen
          name="MainScreen"
          component={MyTabs}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default (Routes);
