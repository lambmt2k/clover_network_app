import { StyleSheet } from "react-native";
import { colors } from "../../themes/style";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
    
        justifyContent: "center",
        position: "relative",
      },
      header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 8,
        marginTop: 8,
        marginBottom: 8,
      },
      label: {
        marginBottom: 8,
        color: colors.secondary,
        fontSize: 14,
        fontWeight: "500",
      },
      radioGroup: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    
        borderRadius: 14,
        borderWidth: 1,
        borderColor: colors.primary,
        paddingHorizontal: 16,
        paddingVertical: 12,
      },
      radioButton: {
        flexDirection: "row",
        alignItems: "center",
      },
      radioLabel: {
        marginLeft: 4,
        fontSize: 14,
        color: colors.black,
      },
      errorText: {
        fontSize: 13,
        color: "red",
        marginBottom: 10,
      },
      updateBtn:{
        justifyContent:"center",
        alignItems:"center",
        backgroundColor:colors.primary,
        paddingHorizontal:15,
        paddingVertical:20,
        borderRadius:14,
        marginTop:10
      },
      btnText:{
        fontFamily:"BeVietnamPro_500Medium",
        fontSize:16,
        color:colors.white
      }
})