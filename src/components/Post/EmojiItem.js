import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

const EmojiItem = ({data,...rest}) => {
  return (
    <View style={styles.root}>
      {data.emoji}
    </View>
  )
}

export default EmojiItem

const styles = StyleSheet.create({
  root: {
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  titleBox: {
    position: "absolute",
    backgroundColor: "rgba(0,0,0,0.24)",
    top: -50,
    width: 60,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 16,
  },
  title: {
    textTransform: "capitalize",
    fontSize: 16,
    color: "#fff",
    textAlign: "center",
  },
});