import React, { useEffect, useState } from 'react'
import { ActivityIndicator, RefreshControl } from 'react-native'
import {
  Box,
  VStack,
  FlatList,
  Text,
  Center,
  ScrollView,
} from '@gluestack-ui/themed'
import AsyncStorage from '@react-native-async-storage/async-storage'
const Color = require('color')

import InputContainer from '../components/InputContainer'
import ColorButton from '../components/ColorButton'

const Home = ({ navigation }: any) => {
  const [colors, setColors] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    loadColors()
  }, [])

  useEffect(() => {
    saveColors()
  }, [colors])

  const loadColors = async () => {
    setIsLoading(true)
    const data = await AsyncStorage.getItem('colors')
    if (data) {
      const colors = JSON.parse(data)
      setColors(colors)
      console.log('Data:', data)
    } else {
      console.log('Error while getting Colors')
    }
    setIsLoading(false)
  }

  const saveColors = async () => {
    await AsyncStorage.setItem('colors', JSON.stringify(colors), err => {
      if (err) {
        console.log('Error Occured')
      }
    })
    console.log('Saved Colors in Local Storage')
  }

  const saveColor = async (val: string) => {
    setIsLoading(true)
    const words = val.split(' ')
    const color = words.join('').toLowerCase()

    await fetch(`https://color.serialif.com/${color}`)
      .then(res => res.json())
      .then(data => {
        if (data.status === 'success') {
          if (colors.includes(color)) {
            console.log('The color is already in the list')
          } else {
            setColors([color, ...colors])
          }
        } else {
          console.log('No color found with this name')
        }
      })
      .catch(err => console.log(err))
    setIsLoading(false)
  }

  const deleteColor = (val: string) => {
    const newArray = colors.filter(item => item !== val)
    setColors(newArray)
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
    }, 1000)
  }

  const handlePress = (val: string) => {
    const color = val?.charAt(0).toUpperCase() + val?.slice(1)
    navigation.navigate('Details', {
      color,
    })
  }

  if (isLoading) {
    return (
      <Center flex={1}>
        <ActivityIndicator size="large" color="dodgerblue" />
      </Center>
    )
  }

  return (
    <Box mt="$3" px="$3" flex={1}>
      <VStack flex={1} alignItems="center" gap="$5">
        <InputContainer handleSubmit={saveColor} />
        {(colors.length > 0 && (
          <FlatList
            py="$2"
            refreshControl={
              <RefreshControl
                refreshing={isLoading}
                onRefresh={loadColors}
                progressBackgroundColor="dodgerblue"
                colors={['white']}
                title="loading..."
              />
            }
            data={colors}
            w="$full"
            renderItem={({ item }) => (
              <ColorButton
                //@ts-ignore
                color={item}
                deleteColor={deleteColor}
                handlePress={handlePress}
              />
            )}
          />
        )) || (
          <Center flex={1}>
            <Text>You haven&apos;t added any Colors yet.</Text>
          </Center>
        )}
      </VStack>
    </Box>
  )
}

export default Home
