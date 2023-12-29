import { StyleSheet } from "react-native";
import { colors } from "../../themes/style";

export const styles = StyleSheet.create({
    header:{
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center",
        paddingHorizontal:8,
        marginTop:8,
        marginBottom:8
    },
    textStyle:{
        fontSize:16,
        fontFamily:"BeVietnamPro_500Medium"
    },
    userBg:{
        width:"100%",
        height:235,
        objectFit:"cover"
    },
    userAvatar:{
        width:150,
        height:150,
        borderRadius:150/2,
        borderColor:colors.background,
        borderWidth:4,
    },
    bgContainer:{
        position:"relative"
    },
    avatarContainer:{
        position:"absolute",
        bottom:-50,
        left:10,
        
    },
    cameraBg:{
        position:"absolute",
        right:10,
        bottom:15,
        backgroundColor:colors.lightGrey,
        width:40,
        height:40,
        alignItems:"center",
        justifyContent:"center",
        borderRadius:40/2,
        borderColor:colors.secondary,
        borderWidth:2
    },
    cameraAvatar:{
        position:"absolute",
        right:-5,
        bottom:5,
        backgroundColor:colors.lightGrey,
        width:40,
        height:40,
        alignItems:"center",
        justifyContent:"center",
        borderRadius:40/2,
        borderColor:colors.background,
        borderWidth:2
    },
    infoContainer:{
        marginTop:50,
        paddingHorizontal:10,
        marginBottom:20
    },
    nameStyle:{
        fontFamily:"BeVietnamPro_600SemiBold",
        fontSize:24
    },
    friendsAmount:{
        fontFamily:"BeVietnamPro_600SemiBold",
        fontSize:16,
        marginRight:2
    }
    ,
    friendContainer:{
        flexDirection:'row',
        alignItems:"baseline",
        marginVertical:10
    },
    newPost:{
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"center",
        alignContent:"center",
        
        height:45,
        borderRadius:10,
        marginVertical:8
    },
    newPostText:{
        color:colors.white,
        marginLeft:4,
        fontSize:16
    },
    edit:{
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"center",
        alignContent:"center",
        
        height:45,
        borderRadius:10,
    },
    editText:{
        color:colors.primary,
        marginLeft:4,
        fontSize:16
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
})