import { StyleSheet } from "react-native";
import { colors } from "../../themes/style";

export const styles = StyleSheet.create({
    menuText:{
        fontSize: 30,
        fontFamily:"BeVietnamPro_700Bold",
        color:colors.primary,
        paddingLeft:5,
        flex:0
    },
    userContainer:{
        flexDirection:"row",
        alignItems:"center",
        marginTop:10,
        
        paddingHorizontal:10,
        paddingVertical:20,
        marginHorizontal:10,
        borderRadius:8,
        
    },
    btnContainer:{
        alignItems:"center",
        paddingHorizontal:10,
        paddingVertical:10,
        marginHorizontal:10,
        borderRadius:8,
        marginTop:10
    }
})