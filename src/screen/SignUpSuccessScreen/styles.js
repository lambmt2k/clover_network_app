import { StyleSheet } from "react-native";
import { colors } from "../../themes/style";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  congate: { color: colors.primary, fontSize: 30, fontWeight: "800",marginBottom:100 },
  text: {
    fontSize: 20,
    fontWeight: "500",
    color: colors.primary,
  },
  btnBack:{
    paddingHorizontal:30,
    paddingVertical:15,
    backgroundColor:colors.primary,
    borderRadius:8
  }
});
