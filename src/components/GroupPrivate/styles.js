import { StyleSheet } from "react-native";
import { colors } from "../../themes/style";

export const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
  },
  modalView: {
    marginTop: "auto",
    height: "85%",
    width: "100%",
    backgroundColor: "white",
    borderTopRightRadius:20,
    borderTopLeftRadius:20,
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
  
  bgImage: {
    width: "100%",
    height: 200,
    borderTopRightRadius:20,
    borderTopLeftRadius:20
  },
  groupIcon: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.lightGrey,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginHorizontal: 5,
    borderRadius: 5,
  },
  outsideModal: {
    backgroundColor: "'rgba(52, 52, 52, 0.8)'",
    flex: 1,
  },
  groupInfo:{
    paddingHorizontal:20,
    paddingVertical:10
  },
  groupName:{
    fontSize:20,
    fontFamily:"BeVietnamPro_600SemiBold"
  },
  groupDesc:{
    fontSize:16,
    fontFamily:"BeVietnamPro_600SemiBold",
    marginBottom:8
  },
  joinGroup:{
    backgroundColor:colors.primary,
    alignItems:"center",
    paddingVertical:10,
    borderRadius:8
  },
  joinGroupText:{
    color:colors.white,
    fontSize:18
  }
});
