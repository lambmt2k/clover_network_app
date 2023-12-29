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
    paddingBottom:8
  },
  tab: {
    backgroundColor: colors.secondary,
    height: 40,
    flexDirection:"row",
    alignItems: "flex-end",
    borderRadius:25,
    paddingVertical:10,
    paddingHorizontal:8
  },
  forYouTab: {
    width: 90,
  },
  yourGroupTab: {
    width: 120,
  },
});
