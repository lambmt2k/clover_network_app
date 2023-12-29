import { View, Text, SafeAreaView, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { Searchbar } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../themes/style";
import { styles } from "./styles";
import { useNavigation } from "@react-navigation/native";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import SearchApi from "../../apis/SearchApi";

const SearchHeader = () => {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState("");
  const { user } = useSelector((state) => state.login);
  const onChangeSearch = (query) => setSearchQuery(query);
  // useEffect(() => {
  //   console.log(searchQuery);
  // }, [searchQuery]);
  const handleSubmit = () => {
    if (searchQuery) {
      SearchApi.search(user.tokenId, searchQuery)
        .then((res) => {
          
          navigation.navigate("SearchResultScreen", {searchQuery, result: res.data.data });
        })
        .catch((err) => {
          console.log(err);
        });
    } else return;
  };

  return (
    <View>
      <View style={styles.searchContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={28} color={colors.primary} />
        </TouchableOpacity>

        <Searchbar
          style={styles.searchBar}
          selectionColor={colors.primary}
          value={searchQuery}
          onChangeText={onChangeSearch}
          placeholder="Search clover"
          placeholderTextColor={colors.secondary}
          onIconPress={handleSubmit}
          onSubmitEditing={handleSubmit}
        />
      </View>
    </View>
  );
};

export default SearchHeader;
