import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { config } from '@gluestack-ui/config'
import { GluestackUIProvider } from '@gluestack-ui/themed'

import Home from './src/screens/Home'
import ColorDetails from './src/screens/ColorDetails'

const Stack = createNativeStackNavigator()

export default function App() {
  return (
    <GluestackUIProvider config={config}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Colors"
          screenOptions={{
            headerStyle: {
              backgroundColor: 'dodgerblue',
            },
            headerTintColor: '#fff',
            headerLargeTitle: true,
          }}
        >
          <Stack.Screen name="Colors" component={Home} />
          <Stack.Screen
            name="Details"
            component={ColorDetails}
            //@ts-ignore
            options={({ route }) => ({ title: route.params?.color })}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </GluestackUIProvider>
  )
}
