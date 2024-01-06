import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../themes/style";
import StyledText from "../../components/StyledText/StyledText";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import { useNavigation } from "@react-navigation/native";
import AuthApi from "../../apis/Auth";

const FogotPasswordScreen = () => {
    const navigation = useNavigation();
    const [text,setText] = useState("")
    const [error,setError] = useState(false)
    const handleFindAccount = ()=>{
        AuthApi.findAccount(text).then(res=>{
            console.log(res.data)
            if(res.data.code === 101){
                setError(true)
            }
            if(res.data.code === 100){
                setError(false)
                navigation.navigate("ChangePassword",{email:text})
            }
        }).catch(err=>console.log(err))
        
    }
  return (
    <SafeAreaView style={{paddingHorizontal:10,flex:1}}>
      <View>
      <TouchableOpacity onPress={()=> navigation.goBack()}>
      <Ionicons name="chevron-back" size={24} color={colors.primary} />
      </TouchableOpacity>
        
      </View>
      <View style={{paddingHorizontal:10,marginTop:4}}>
        <StyledText title="Find your account" textStyle={{fontSize:24,fontFamily:"BeVietnamPro_600SemiBold"}}/>
        <StyledText title="Input your email below" textStyle={{fontSize:16,fontFamily:"BeVietnamPro_300Light",marginTop:8}}/>
        <Input onChangeText={(value)=>setText(value)}/>
        <TouchableOpacity onPress={handleFindAccount} style={{backgroundColor:colors.primary,alignItems:"center",paddingVertical:16,borderRadius:40,marginTop:8}}>
            <StyledText title="Find account" textStyle={{color:colors.white,fontSize:14}}/>
        </TouchableOpacity>
        <View style={{alignItems:"center",marginTop:10}}>
        { error && <StyledText title="Can not find your account!" textStyle={{color:"red"}}/>}
        
      </View>
      </View>
      
    </SafeAreaView>
  );
};

export default FogotPasswordScreen;
