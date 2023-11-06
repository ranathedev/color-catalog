import { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

export const useColors = () => {
  const [colors, setColors] = useState<String[]>([])

  useEffect(() => {
    loadColors()
  }, [])

  useEffect(() => {
    saveColors()
  }, [colors])

  const loadColors = async () => {
    const data = await AsyncStorage.getItem('colors')
    if (data) {
      const colors = JSON.parse(data)
      setColors(colors)
      console.log('Data:', data)
    } else {
      console.log('Error while getting Colors')
    }
  }

  const saveColors = async () => {
    await AsyncStorage.setItem('colors', JSON.stringify(colors), err => {
      if (err) {
        console.log('Error Occured')
      }
    })
    console.log('Saved Colors in Local Storage')
  }

  const saveColor = (val: string) => {
    const color = val.toLowerCase()
    if (colors.includes(color)) {
      console.log('The color is already in the list')
    } else {
      setColors([color, ...colors])
    }
  }

  const deleteColor = (val: string) => {
    const newArray = colors.filter(item => item !== val)
    setColors(newArray)
  }

  return { colors, setColors, saveColor, deleteColor }
}
