import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import StyledText from "../StyledText/StyledText";
import { AntDesign } from "@expo/vector-icons";
import { colors } from "../../themes/style";
import { styles } from "./styles";
import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

const GroupHeader = () => {
  const navigation = useNavigation();
  const handleCreateGroup = () => {
    navigation.navigate("CreateGroupScreen");
  };
  return (
    <View style={{borderBottomColor:colors.primary,borderBottomWidth:1}}>
      <View style={styles.headerCotainer}>
        <View>
          <StyledText title="Groups" textStyle={styles.textGroup} />
        </View>
        <View>
          <TouchableOpacity onPress={handleCreateGroup}>
            <AntDesign name="pluscircle" size={32} color={colors.primary} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.navigationContainer}>
        <TouchableOpacity  onPress={()=> navigation.navigate("GroupHomeScreen")}>
          <View style={[styles.tab, styles.forYouTab]}>
            <MaterialCommunityIcons
              name="newspaper-variant-outline"
              size={24}
              color="black"
            />
            <StyledText title="For you" />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=> navigation.navigate("GroupListScreen")}>
          <View style={[styles.tab, styles.yourGroupTab]}>
            <MaterialIcons name="groups" size={24} color="black" />
            <StyledText title="Your group" />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default GroupHeader;
