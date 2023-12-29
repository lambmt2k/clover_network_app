import { StyleSheet } from "react-native";
import { colors } from "../../themes/style";

export const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 8,
    marginTop: 8,
    marginBottom: 8,
    borderBottomColor: colors.primary,
    paddingBottom: 10,
    borderBottomWidth: 1,
  },
  headerText: {
    fontSize: 24,
    fontFamily: "BeVietnamPro_500Medium",
    color: colors.primary,
  }
});
