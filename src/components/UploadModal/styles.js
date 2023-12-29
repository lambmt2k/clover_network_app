import { StyleSheet } from "react-native";
import { colors } from "../../themes/style";

export const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    margin: 10,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontFamily: "BeVietnamPro_500Medium",
    fontSize: 20,
  },
  iconContainer: {
    flexDirection: "row",
  },
  groupIcon: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.lightGrey,
    paddingVertical:5,
    paddingHorizontal:10,
    marginHorizontal:5,
    borderRadius:5
  },
  outsideModal: {
    backgroundColor: "'rgba(52, 52, 52, 0.8)'",
    flex: 1,
  }
});
