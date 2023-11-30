import { StyleSheet } from "react-native";
import { colors } from "../../themes/style";

export const styles = StyleSheet.create({
  topSafeArea: {
    backgroundColor: colors.white,
    flex:0
  },
  container: {
    backgroundColor:colors.background
  },
  appbarContainer: {
    paddingHorizontal: 8,
    marginBottom: 1,
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
    marginRight:10
  },
  userText: {
    color:colors.black,
    fontSize: 16,
    paddingLeft:8,
    fontFamily:"BeVietnamPro_200ExtraLight_Italic"
  },
  upload: {
    width: 24,
    height:24,
  },
  flatlistContainer:{
    marginBottom:150
  }
});
