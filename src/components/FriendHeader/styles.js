import { StyleSheet } from "react-native";
import { colors } from "../../themes/style";

export const styles = StyleSheet.create({
  headerCotainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 8,
    marginBottom: 5,
  },
  textGroup: {
    fontSize: 32,
    color: colors.primary,
  },
  navigationContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingHorizontal: 8,
    paddingBottom:8,
  },
  tab: {
    backgroundColor: colors.secondary,
    height: 44,
    flexDirection:"row",
    alignItems: "center",
    justifyContent:"center",
    borderRadius:25,
    paddingVertical:10,
    paddingHorizontal:8
  },
  forYouTab: {
    width: 120,
  },
  yourGroupTab: {
    width: 120,
  },
  recommend:{
    width:140
  }
});
