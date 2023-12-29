import { StyleSheet } from "react-native";
import { colors } from "../../themes/style";

export const styles = StyleSheet.create({
  appBarContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
    flex:0,
    borderBottomWidth:1.5,
    borderBottomColor:colors.background,
    paddingBottom:8
  },
  appBarText: {
    fontSize: 24,
    color: colors.primary,
    fontFamily: "BeVietnamPro_500Medium",
  },
  postButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 8,
  },
  postButtonText: {
    fontSize: 22,
    color: colors.white,
    fontFamily: "BeVietnamPro_500Medium",
  },
  userContainer: {
    flexDirection:"row",
    alignItems:"center",
    justifyContent:"space-between",
    paddingHorizontal:15,
  },
  styleLeftContainer:{
    flexDirection: "row",
    alignItems: "center",
    flex:0,
    
    backgroundColor:colors.white,
    marginTop:10,
    paddingVertical:10
  },
  userImage: {
    width: 46,
    height: 46,
    marginRight: 10,
    borderRadius: 46 / 2,
    borderWidth: 1,
    borderColor: colors.primary,
  },
  privacy: {
    flexDirection: "row",
    alignItems: "center",
  },
  privacyText:{
    marginLeft:5,
    fontSize:14
  },
  textArea:{
    flex:1,
    paddingHorizontal: 15,
    paddingVertical: 5,
    backgroundColor:colors.white

  },
  textEditArea:{
    
    backgroundColor:colors.background,
    paddingHorizontal: 15,
    height:"35%",
    paddingTop:30,
    borderTopLeftRadius:30,
    borderTopRightRadius:30,
    position:"absolute",
    bottom:0,
    left:0,
    right:0
  },
  groupIcon:{
    flexDirection:'row',
    alignItems:"center",
    marginBottom:15
  },
  upload: {
    width: 24,
    height:24,
  },
  textIcon:{
    marginLeft:20,
    fontSize:18,
    fontFamily:"BeVietnamPro_200ExtraLight"
  },
  modalView: {
    height: "20%",
    marginTop: "auto",
    backgroundColor: "white",
    borderRadius: 20,
    paddingVertical: 35,
    paddingHorizontal:20,
    paddingTop:1,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    alignItems:"center",
    justifyContent:"center"
  },
  modalViewPivacy:{
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
  headerText: {
    fontSize: 24,
    fontFamily: "BeVietnamPro_500Medium",
    color: colors.primary,
  },
  iconContainer: {
    flexDirection: "column",
    gap:15,
    
  },
  groupIcon: {
    flexDirection:"row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.lightGrey,
    paddingVertical:5,
    paddingHorizontal:10,
    marginHorizontal:5,
    borderRadius:5,
    gap:15,
    paddingVertical:10,
    paddingHorizontal:8
  },
  privacyIcon:{
    backgroundColor:colors.secondary,
    width:40,
    height:40,
    alignItems:"center",
    justifyContent:"center",
    borderRadius:20
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
});
