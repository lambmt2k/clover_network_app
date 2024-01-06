import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { styles } from "./styles";
import { useNavigation } from "@react-navigation/native";
import { colors } from "../../themes/style";
import StyledText from "../../components/StyledText/StyledText";
import { SafeAreaView } from "react-native-safe-area-context";

const InvitePeople = ({route}) => {
  const {groupId} = route.params
  //console.log(groupId)
  const navigation = useNavigation();
  return (
    <SafeAreaView>
      <View>
        
        <View style={styles.header}>
        <View></View>
          <StyledText title="Invite people" textStyle={styles.headerText} />
          <View>
            <TouchableOpacity onPress={() => navigation.navigate("GroupDetailScreen",{groupId})}>
              <StyledText title="Next" textStyle={{color:colors.primary}}/>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default InvitePeople;
