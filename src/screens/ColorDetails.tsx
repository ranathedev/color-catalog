import React from 'react'
import { StyleSheet } from 'react-native'
const Color = require('color')

import { Box, Center, Text, View } from '@gluestack-ui/themed'

const ColorDetails = ({ route }: any) => {
  const colorName = route.params.color.toLowerCase()
  const colorVal = new Color(colorName)
  const color = colorVal.negate()

  const colorProperties = [
    {
      label: 'Name',
      val: colorName.charAt(0).toUpperCase() + colorName.slice(1),
    },
    { label: 'HEX:', val: colorVal.hex() },
    { label: 'RGB', val: colorVal.rgb().toString() },
    { label: 'HSL', val: colorVal.hsl().toString() },
    { label: 'Luminosity', val: colorVal.luminosity() },
    { label: 'is Light', val: colorVal.isLight() ? 'true' : 'false' },
  ]

  return (
    <Box bg={colorName} flex={1} px="$3">
      <Center flex={1} gap={10}>
        {colorProperties.map((item, i) => (
          <View
            key={i}
            flexDirection="row"
            gap={20}
            justifyContent="space-between"
            width="$full"
          >
            <Text style={[styles.text, { color }]}>{item.label}:</Text>
            <Text style={[styles.text, styles.colorVal, { color }]}>
              {item.val}
            </Text>
          </View>
        ))}
      </Center>
    </Box>
  )
}

const styles = StyleSheet.create({
  text: {
    fontSize: 22,
    paddingVertical: 5,
  },
  colorVal: {
    textAlign: 'left',
    width: '65%',
  },
})

export default ColorDetails
