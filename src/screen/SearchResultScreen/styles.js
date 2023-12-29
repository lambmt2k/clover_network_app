import { StyleSheet } from "react-native";
import { colors } from "../../themes/style";

export const styles = StyleSheet.create({
  searchNav: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
    gap: 2,
  },
  navItem: {
    width: 80,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: 2,
    paddingBottom: 5,
  },
  itemContainer: {
    paddingHorizontal: 10,
    flexDirection: "row",
    gap: 10,
    marginBottom: 10,

    borderBottomColor: colors.background,
    borderBottomWidth: 6,
    paddingBottom: 20,
  },
  groupName: {
    fontSize: 16,
    fontFamily: "BeVietnamPro_600SemiBold",
  },
  flatlistCon: {
    paddingVertical: 8,
    flex: 1,
  },
  visitBtn: {
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
    marginTop: 5,
    borderRadius: 10,
  },
  visitText: {
    color: colors.white,
    fontSize: 16,
    fontFamily: "BeVietnamPro_500Medium",
  },
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
    width: 100,
    height: 100,
    marginRight: 10,
    borderRadius: 100 / 2,
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
  resultContainer: {
    flex: 1,
  },
  notFoundStyle: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  foundStyle: {
    justifyContent: "center",
  },
  notFoundImage: {
    width: 400,
    height: 400,
  },
  notFoundText: {
    fontSize: 18,
    fontFamily: "BeVietnamPro_500Medium",
    paddingHorizontal:16,
    marginBottom:6
  },
  searchQuerryText: {
    fontSize: 20,
    color:colors.secondary,
    fontFamily:"BeVietnamPro_600SemiBold"
  },
});
