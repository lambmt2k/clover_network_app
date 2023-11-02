import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({ 
    container: { 
        flex: 1, 
        backgroundColor: '#F5F5F5', 
        justifyContent: 'center', 
        alignItems: 'center',
        position:"relative" 
    }, 
    radioGroup: { 
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'space-around', 
        marginTop: 20, 
        borderRadius: 8, 
        backgroundColor: 'white', 
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
        marginLeft: 8, 
        fontSize: 16, 
        color: '#000', 
    }, 
});