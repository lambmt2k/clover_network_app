import { StyleSheet } from "react-native";
import { colors } from "../../themes/style";

export const styles = StyleSheet.create({
  
  header: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    paddingHorizontal: 8,
    paddingBottom:10,
    paddingTop:5
  },
  headerRightCont: {
    flexDirection: "row",
    flex: 1,
    gap: 10,
    alignItems: "center",
    justifyContent: "space-between",
  },
  textStyle: {
    fontSize: 16,
    fontFamily: "BeVietnamPro_500Medium",
  },
  userBg: {
    width: "100%",
    height: 235,
    objectFit: "cover",
  },
  
  bgContainer: {
    position: "relative",
  },
  
  cameraBg: {
    position: "absolute",
    right: 10,
    bottom: 15,
    backgroundColor: colors.lightGrey,
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 40 / 2,
    borderColor: colors.secondary,
    borderWidth: 2,
  },
  cameraAvatar: {
    position: "absolute",
    right: -5,
    bottom: 5,
    backgroundColor: colors.lightGrey,
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 40 / 2,
    borderColor: colors.background,
    borderWidth: 2,
  },
  infoContainer: {
    marginTop: 15,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  nameStyle: {
    fontFamily: "BeVietnamPro_600SemiBold",
    fontSize: 24,
    marginBottom: 5,
  },
  friendsAmount: {
    fontFamily: "BeVietnamPro_600SemiBold",
    fontSize: 16,
    marginRight: 2,
  },
  friendContainer: {
    flexDirection: "row",
    alignItems: "baseline",
    marginVertical: 10,
  },
  manageGroup: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    height: 45,
    borderRadius: 10,
    marginVertical: 8,
    gap:5
  },
  manageGroupText: {
    color: colors.white,
    marginLeft: 4,
    fontSize: 16,
  },
  invite: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    alignContent: "center",
    flex: 1,
    height: 45,
    borderRadius: 10,
  },
  inviteText: {
    color: colors.black,
    marginLeft: 6,
    fontSize: 16,
  },
  flatlistContainer: {
    flex:1
  },
  postContainer: {
    backgroundColor: colors.white,
    height: 80,
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: 8,
    paddingVertical:8,
    marginBottom: 4,
    borderTopWidth:4,
    borderBottomWidth:4,
    borderTopColor:colors.background,
    borderBottomColor:colors.background,
  },
  user: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  userImageContainer: {
    borderRadius: "50%",
  },
  userImage: {
    width: 46,
    height: 46,
    marginRight: 10,
    borderRadius: 46 / 2,
  },
  pressArea: {
    flex: 1,
    marginRight: 10,
  },
  userText: {
    fontSize: 14,
    paddingLeft: 8,
    fontFamily: "BeVietnamPro_200ExtraLight_Italic",
  },
  upload: {
    width: 24,
    height: 24,
  },
  modalView: {
    height: "15%",
    marginTop: "auto",
    backgroundColor: "white",
    borderRadius: 20,
    paddingVertical: 35,
    paddingHorizontal:20,
    paddingTop:1,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    alignItems:"center",
    justifyContent:"space-between"
  },
  outside: {
    backgroundColor: "'rgba(52, 52, 52, 0.8)'",
    flex: 1,
    
  },
  modalHeader:{
    backgroundColor:colors.secondary,
    width:100,
    height:5,
    marginTop:5,
    borderRadius:5
  },
  groupLeave:{
    flexDirection:"row",
    alignItems:"center",
    gap:10
  },
  iconLeave:{
    backgroundColor:colors.secondary,
    width:40,
    height:40,
    alignItems:"center",
    justifyContent:"center",
    borderRadius:20
  },
  leaveText:{
    fontSize:16,
    fontFamily:"BeVietnamPro_500Medium"
  },
  joinGroup:{
    justifyContent:"center",
    alignItems:"center",borderRadius:5,
    marginTop:5
  },
  joinGroupText:{
    color: colors.white,
    fontSize:16
  }
});
