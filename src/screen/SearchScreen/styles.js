import { StyleSheet } from "react-native";
import { colors } from "../../themes/style";

export const styles = StyleSheet.create({
  
  searchContainer:{
    flexDirection: 'row',
    alignItems:"center",
    paddingHorizontal:8,
    justifyContent:"SP"
  },
  searchBar:{
    flex:1,
    backgroundColor:colors.white,
    borderColor:colors.primary,
    borderWidth:0.5
  }
});
