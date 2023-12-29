
import { StyleSheet, Platform, StatusBar } from 'react-native';

export default StyleSheet.create({
    droidSafeArea: {
        paddingTop: Platform.OS === 'android' ? (StatusBar.currentHeight) : 0
    },
});

export const colors = {
    primary: '#2EA043',
    secondary: '#CDCDD2',

    black: '#202124',
    white: '#FFFFFF',
    lightGrey: '#DADADA',

    background:"#f2f2f2"
}

