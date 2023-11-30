import { StyleSheet } from "react-native";
import { colors } from "../../themes/style";

export const styles = StyleSheet.create({
  appBarContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
    flex:0
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
    flexDirection: "row",
    alignItems: "center",
    flex:0,
    paddingHorizontal:15,
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
  }
});
