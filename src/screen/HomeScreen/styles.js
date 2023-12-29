import { StyleSheet } from "react-native";
import { colors } from "../../themes/style";

export const styles = StyleSheet.create({
  
  container: {
    backgroundColor:colors.background,
    marginBottom:-35,
    flex:1
  },
  appbarContainer: {
    paddingHorizontal: 8,
    
    backgroundColor: colors.white,
    height: 50,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    
  },
  appbarLogo: {
    width: 32,
    height: 32,
  },
  appbarText: {
    fontSize: 32,
    color: colors.primary,
  },
  postContainer: {
    backgroundColor: colors.white,
    height: 60,
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: 8,
    marginBottom:4
  },
  user: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  userImageContainer:{
    borderRadius:"50%"
  },
  userImage: {
    width: 46,
    height: 46,
    marginRight: 10,
    borderRadius:46/2
  },
  pressArea: {
    flex: 1,
    marginRight:10,
    flexDirection:"row",
    alignItems:"center",
    justifyContent:"space-between"
  },
  userText: {
    
    fontSize: 16,
    paddingLeft:8,
    fontFamily:"BeVietnamPro_300Light_Italic"
    
  },
  upload: {
    width: 24,
    height:24,
  },
  flatlistContainer:{
    flex:1
  }
});
