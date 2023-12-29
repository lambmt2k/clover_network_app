import { View, Text, Platform } from 'react-native'
import React from 'react'



const StyledText = ({title,textStyle}) => {
    
    
  return (
    
      <Text  style={[{fontFamily:"BeVietnamPro_400Regular"},textStyle]}>{title}</Text>
      
    
  )
}

export default React.memo(StyledText)