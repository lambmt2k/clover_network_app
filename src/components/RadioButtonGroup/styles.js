import { StyleSheet } from "react-native";
import { colors } from "../../themes/style";

export const styles = StyleSheet.create({ 
    container: { 
        flex: 1, 
        backgroundColor: '#F5F5F5', 
        justifyContent: 'center', 
        alignItems: 'center',
        position:"relative" 
    },
    label: {
        marginBottom: 8,
        color: colors.secondary,
        fontSize: 14,
        fontWeight: '500'
    },
    radioGroup: { 
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'space-around', 
        
        borderRadius: 8, 
        borderWidth:1,
        borderColor:colors.primary,
        padding: 16, 
        elevation: 4, 
        shadowColor: '#000', 
        shadowOffset: { 
            width: 0, 
            height: 2, 
        }, 
        shadowOpacity: 0.25, 
        shadowRadius: 3.84, 
    }, 
    radioButton: { 
        flexDirection: 'row', 
        alignItems: 'center', 
    }, 
    radioLabel: { 
        marginLeft: 4, 
        fontSize: 14, 
        color: colors.black, 
    }, 
});