import React, { useState } from 'react';
import { Pressable, Text, TextInput, View, Image } from 'react-native';
import { styles } from './styles';

const Input = ({ label, name, placeholder, isPassword, onChangeText,onBlur,value }) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const onEyePress = () => {
        setIsPasswordVisible(!isPasswordVisible);
    }

    return (
        <View style={styles.container}>
            <Text style={styles.label}>{label}</Text>
            <View style={styles.inputContainer}>
                <TextInput secureTextEntry={isPassword && !isPasswordVisible} placeholder={placeholder} name="name" onChangeText={onChangeText}  onBlur={onBlur} value={value} style={styles.input}/>

                {isPassword ? (
                    <Pressable onPress={onEyePress}>
                        <Image style={styles.eye} source={isPasswordVisible ? require('../../../assets/img/eye.png') : require('../../../assets/img/eye_closed.png')} />
                    </Pressable>
                ) : null}
            </View>
        </View>
    )
}

export default React.memo(Input);