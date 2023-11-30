import { View, Text } from 'react-native'
import React from 'react'



const StyledText = ({title,textStyle}) => {
    
    
  return (
    
      <Text className="font-bold" style={[{fontFamily:"BeVietnamPro_400Regular"},textStyle]}>{title}</Text>
    
  )
}

export default React.memo(StyledText)