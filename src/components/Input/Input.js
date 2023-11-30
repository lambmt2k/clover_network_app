import React, { useState } from 'react';
import { Pressable, Text, TextInput, View, Image } from 'react-native';
import { styles } from './styles';
import {CalendarIcon} from "react-native-heroicons/solid";
import { colors } from '../../themes/style';

const Input = ({ label, name, placeholder, isPassword, isDate, editable,  onChangeText,onBlur,onPressIn,value }) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const onEyePress = () => {
        setIsPasswordVisible(!isPasswordVisible);
    }

    return (
        <View style={styles.container}>
            <Text style={styles.label}>{label}</Text>
            <View style={styles.inputContainer}>
                <TextInput secureTextEntry={isPassword && !isPasswordVisible} placeholder={placeholder} name={name}  onChangeText={onChangeText}  onBlur={onBlur} value={value} style={styles.input} editable={editable} onPressIn={onPressIn}/>

                {isPassword ? (
                    <Pressable onPress={onEyePress}>
                        <Image style={styles.eye} source={isPasswordVisible ? require('../../../assets/img/eye.png') : require('../../../assets/img/eye_closed.png')} />
                    </Pressable>
                ) : null}
                {
                    isDate && (
                        <CalendarIcon style={styles.calendar} color={colors.primary}/>
                    )
                }
            </View>
        </View>
    )
}

export default React.memo(Input);