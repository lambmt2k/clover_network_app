import { StyleSheet } from "react-native";
import { colors } from "../../themes/style";

export const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 20,
    },
    line: {
        height: 1,
        backgroundColor: colors.lightGrey,
        flex: 1,
    },
    text: {
        color: colors.secondary,
        fontWeight: '500',
        marginHorizontal: 8,
    }
})