import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { Searchbar } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../themes/style";
import { styles } from "./styles";
import { useNavigation } from "@react-navigation/native";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import SearchApi from "../../apis/SearchApi";
import SearchHeader from "../../components/SearchHeader/SearchHeader";
import { SafeAreaView } from "react-native-safe-area-context";

const SearchScreen = () => {
 
  return (
    <SafeAreaView style={{backgroundColor:colors.white,flex:1}}>
      <View>
        <SearchHeader/>
      </View>
    </SafeAreaView>
  );
};

export default SearchScreen;
