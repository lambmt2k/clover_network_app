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

const GroupHeader = ({screen}) => {
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
          <View style={[styles.tab, styles.forYouTab,{backgroundColor:screen==="Foryou" ? colors.primary:colors.secondary}]}>
            <MaterialCommunityIcons
              name="newspaper-variant-outline"
              size={24}
              color={screen==="Foryou"?colors.white:colors.black}
            />
            <StyledText title="For you" textStyle={{color:screen==="Foryou"?colors.white:colors.black}}/>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=> navigation.navigate("GroupListScreen")}>
          <View style={[styles.tab, styles.yourGroupTab,{backgroundColor:screen==="Yourgroup"?colors.primary:colors.secondary}]}>
            <MaterialIcons name="groups" size={24} color={screen==="Yourgroup"?colors.white:colors.black} />
            <StyledText title="Your group" textStyle={{color:screen==="Yourgroup"?colors.white:colors.black}}/>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default GroupHeader;
