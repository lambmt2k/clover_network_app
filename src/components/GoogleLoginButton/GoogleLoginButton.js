import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";

const GoogleLoginButton = () => {
  return (
    <View className="flex-row py-2 border flex gap-2 bg-slate-50 border-slate-300  rounded-lg text-slate-700  mt-4 items-center justify-center h-16">
      <Image
        source={{
          uri: "https://seeklogo.com/images/G/google-logo-28FA7991AF-seeklogo.com.png",
        }}
        className="w-6 h-6"
      />
      <TouchableOpacity>
        <Text className="font-medium text-lg">Continue with Google</Text>
      </TouchableOpacity>
    </View>
  );
};

export default GoogleLoginButton;
