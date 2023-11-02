import {
  View,
  Text,
  SafeAreaView,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React from "react";
import style, { colors } from "../../themes/style";
import { BellIcon } from "react-native-heroicons/outline";
import { ArrowLeftOnRectangleIcon } from "react-native-heroicons/outline";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";
import { logout } from "../../features/Auth/LoginFeatures/LoginSlice";
import { useNavigation } from "@react-navigation/native";


const HomeScreen = () => {
  const dispatch = useDispatch();
  const handleLogout =  () => {
    dispatch(logout())
  };
  return (
    <SafeAreaView style={style.droidSafeArea}>
      <View className="flex flex-row items-center">
        <View className="flex flex-row items-center" style={{ flex: 1 }}>
          <View className=" rounded-full border-2 p-2 border-[#2EA043] mr-2">
            <Image
              source={require("../../../assets/img/clover.png")}
              className="w-4 h-4 "
            />
          </View>
          <Text style={{ color: colors.primary }} className="font-bold">
            Clover
          </Text>
        </View>
        <View>
          <TouchableOpacity onPress={() => dispatch(logout())}  style={{ flex: 1, textAlign: "right" }}>
            
              <ArrowLeftOnRectangleIcon color={colors.primary} size={232} />
            
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
