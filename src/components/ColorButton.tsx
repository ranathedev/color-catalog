import React, { useRef } from 'react'
import { Animated, Dimensions, PanResponder, StyleSheet } from 'react-native'
import { Button, ButtonText, View } from '@gluestack-ui/themed'

interface Props {
  color: string
  handlePress: (arg: string) => void
  deleteColor: (arg: string) => void
}

const ColorButton = ({ color, handlePress, deleteColor }: Props) => {
  const btnPos = useRef(new Animated.Value(0)).current

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: (evt, gestureState) => {
      btnPos.setValue(gestureState.dx)
    },
    onPanResponderRelease: (evt, gestureState) => {
      const width = Dimensions.get('window').width
      if (Math.abs(gestureState.dx) > width * 0.4) {
        const direction = Math.sign(gestureState.dx)
        Animated.timing(btnPos, {
          toValue: direction * width,
          duration: 250,
          useNativeDriver: true,
        }).start(() => handelDelete(direction, width))
      } else {
        Animated.spring(btnPos, {
          toValue: 0,
          useNativeDriver: true,
        }).start()
      }
    },
  })

  const handelDelete = (direction: number, width: number) => {
    console.log('Delete:', color)
    Animated.spring(btnPos, {
      toValue: direction * width,
      useNativeDriver: true,
    }).start(() => deleteColor(color))
  }

  return (
    <Animated.View
      {...panResponder.panHandlers}
      style={{ transform: [{ translateX: btnPos }] }}
    >
      <Button
        w="$full"
        action="primary"
        borderWidth={2}
        borderColor={color}
        variant="outline"
        mb="$4"
        size="xl"
        style={{ gap: 5 }}
        isDisabled={false}
        onPress={() => handlePress(color)}
      >
        <ButtonText color={color} fontSize={20}>
          {color}
        </ButtonText>
        <View style={[styles.bagde, { backgroundColor: color }]} />
      </Button>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  bagde: {
    position: 'absolute',
    left: '10%',
    width: 12,
    height: 12,
    borderRadius: 6,
  },
})

export default ColorButton
