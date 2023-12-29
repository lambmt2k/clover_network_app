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
  },
  textStyle: {
    fontSize: 18,
    fontFamily: "BeVietnamPro_500Medium",
  },
  textStyle2: {
    fontSize: 16,
    fontFamily: "BeVietnamPro_500Medium",
  },
  textEdit:{
    fontSize:16,
    textDecorationLine:"underline",
    fontFamily: "BeVietnamPro_500Medium",
    
  },
  flexRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  container: {
    marginHorizontal: 8,
  },
  avatarContainer: {
    alignItems: "center",
    justifyContent:"center",
    width:150,
    height:150,
    borderRadius:150/2,
    
  },
  avatar: {
    width:150,
    height:150,
    borderRadius:150/2,
    borderWidth:2,
    borderColor:colors.primary
  },
  divider:{
    borderBottomColor:colors.primary,
    borderBottomWidth:1,
    marginVertical:20
  },
  bgContainer:{
    width:"90%",
    height:250,
    marginTop:10
  },
  userBg:{
    width:"100%",
    height:"100%",
    borderRadius:15
  },
  groupText:{
    flexDirection:"row",
    alignItems:"center",
    gap:15,
    marginBottom:10
  },
  textWarning:{
    color:"#FFC107",
    fontFamily:"BeVietnamPro_500Medium_Italic",
    fontSize:12

  }

});
