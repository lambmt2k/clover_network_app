import { StyleSheet } from "react-native";
import { colors } from "../../themes/style";

export const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,

    paddingHorizontal: 10,
    paddingTop: 10,
    paddingBottom: 2,
  },
  container2: {
    backgroundColor: colors.white,
    paddingHorizontal: 10,
    paddingTop: 10,
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
    marginBottom: 2,
    borderTopWidth: 0.5,
    borderTopColor: colors.lightGrey,
  },
  groupIconContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    height: 40,
    position: "relative",
  },
  groupIcon: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  groupIconText: {
    fontFamily: "BeVietnamPro_500Medium",
    marginLeft: 5,
  },
  emojiBox: {
    position: "absolute",
    top: -85,
    left: 10,
    right: 5,
    height: 50,
    width: 50,
    justifyContent: "center",
    width: "100%",
    alignItems: "center",
    borderRadius: 33,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.24,
    shadowRadius: 1,
    elevation: 3,
  },
  iconLike: {
    width: 16,
    height: 16,
  },
  groupAvatar: {
    width: 45,
    height: 45,
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 15,
  },
  groupAvatarCon: {
    position: "relative",
  },
  userAvatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },
  userAvatarCon: {
    position: "absolute",
    bottom: -5,
    left: 20,
  },
  groupName: {
    fontSize: 16,
    fontFamily: "BeVietnamPro_600SemiBold",
    marginBottom: 2,
  },
  userName: {
    fontSize: 13,
    fontFamily: "BeVietnamPro_500Medium",
  },
  timeAgo: {
    fontSize: 13,
    color:colors.secondary,
    fontFamily:"BeVietnamPro_300Light"
  },
  system:{
    fontSize:13,
    color:colors.secondary
  },
  showMore:{
    fontFamily:"BeVietnamPro_500Medium_Italic",
    color:colors.secondary
  }
});
