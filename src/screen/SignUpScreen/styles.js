import { StyleSheet } from "react-native";
import { colors } from "../../themes/style";

export const styles = StyleSheet.create({
  container: {
    flex: 1,

    justifyContent: "center",
    position: "relative",
  },
  label: {
    marginBottom: 8,
    color: colors.secondary,
    fontSize: 14,
    fontWeight: "500",
  },
  radioGroup: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",

    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.primary,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  radioButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  radioLabel: {
    marginLeft: 4,
    fontSize: 14,
    color: colors.black,
  },
  errorText: {
    fontSize: 13,
    color: "red",
    marginBottom: 10,
  },
});
