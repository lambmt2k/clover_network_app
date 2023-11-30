import { StyleSheet } from "react-native";
import { colors } from "../../themes/style";

export const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    marginVertical: 4,
    paddingHorizontal: 10,
    paddingTop:10,
    paddingBottom: 2,
  },
  user: {
    alignItems: "center",
    flexDirection: "row",
  },
  userImage: {
    width: 46,
    height: 46,
    marginRight: 10,
    borderRadius: 46 / 2,
    borderWidth: 2,
    borderColor: colors.primary,
  },
  userName: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 2,
  },
  userTime: {
    color: colors.secondary,
  },
  statusText: {
    fontSize: 14,
    marginTop: 5,
    marginBottom: 10,
  },
  postPicContainer: {
    width: "100%",
    height: 400,
    justifyContent: "center",
    alignItems: "center",
  },
  postPic: {
    width: "100%",
    height: "100%",
  },
  iconContainer: {
    marginTop: 8,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  emotionIcon: {
    flexDirection: "row",
    alignContent: "center",
  },
  cmtShareContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  divider: {
    marginTop: 8,
    marginBottom:2,
    borderTopWidth: 0.5,
    borderTopColor: colors.lightGrey,
  }
  ,groupIconContainer:{
    flexDirection:"row",
    alignItems:"center",
    justifyContent:"space-between",
    paddingHorizontal:10,
    height:40
  },
  groupIcon: {
    flexDirection:"row",
    alignItems:"center",
    justifyContent:"center"
  },
  groupIconText:{
    fontFamily:"BeVietnamPro_500Medium",
    marginLeft:5
  }

});
