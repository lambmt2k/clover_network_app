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
  },
  groupInputContainer: {
    paddingVertical: 10,
    paddingHorizontal: 8,
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 14,
    flexDirection: "row",
    alignItems: "center",
  },
  inputText: {
    fontSize: 16,
    fontFamily: "BeVietnamPro_500Medium",
    marginBottom: 8,
  },
  inputTextDesc: {
    fontSize: 16,
    fontFamily: "BeVietnamPro_500Medium"
  },
  textInput: {
    paddingHorizontal: 16,
    paddingVertical: 20,
    flex: 1,
  },
  textArea: {
    paddingHorizontal: 16,
    paddingVertical: 20,
    paddingBottom: 150,
    flex: 1,
  },
  divider: {
    borderBottomColor: colors.primary,
    borderBottomWidth: 1,
    marginHorizontal: 8,
    marginVertical: 8,
  },
  privacy: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  btnCreate: {
    paddingHorizontal: 10,
    paddingVertical: 12,
    marginHorizontal: 8,
    borderRadius: 10,
    
    alignItems: "center",
  },
  btnText: {
    color: colors.white,
  },
  modal: {
    backgroundColor: "red",
    width: 10,
  },
  modalView: {
    height: "35%",
    marginTop: "auto",
    backgroundColor: "white",
    borderRadius: 20,
    paddingVertical: 35,
    paddingHorizontal:20,
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
  outside: {
    backgroundColor: "'rgba(52, 52, 52, 0.8)'",
    flex: 1,
  },
  modalHeader:{
    flexDirection:"row",
    justifyContent:"space-between",
    alignItems:"center",
    width:"100%",
    borderBottomColor:colors.primary,
    borderBottomWidth:1,
    paddingBottom:10
  },
  groupPrivacy:{
    flexDirection:"row",
    justifyContent:"space-between",
    gap:10,
   
    marginHorizontal:10,
    marginTop:8,
    paddingTop:15
  },
  groupPrivacyRight:{
    
    flex:1,
    flexDirection:"row",
    justifyContent:"space-between",
    gap:10,
    borderBottomColor:colors.primary,
    paddingBottom:8,
    borderBottomWidth:1
  },
  privacyIcon:{
    backgroundColor:colors.secondary,
    width:40,
    height:40,
    alignItems:"center",
    justifyContent:"center",
    borderRadius:20
  }
});
