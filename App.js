import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from './components/HomeScreen';
import CustomerScreen from './components/CustomerScreen';
import ChefScreen from './components/ChefScreen';

const Stack = createStackNavigator();
export default function App() {
  const apiUrl = 'http://localhost:3000/menu'
  const [fetchMenu, setFetch] = useState(false)
  const [menu, setMenu] = useState()

  useEffect(()=>{
    setFetch(true)
  }, [])

  useEffect(() => {
      if(fetchMenu){
        fetch(apiUrl)
        .then((response) => response.json())
        .then((json) => {
          setMenu(json);
          setFetch(false)
          console.log("Fetched in App JS")
        })
        .catch((error) => {
          console.error(error);
      });
      }
    }
  )
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: '#48484C',
            height: '44px'
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen name="Home">
          {props => <HomeScreen {...props} menu={menu} setFetch={setFetch}/>}
        </Stack.Screen>
        <Stack.Screen name="Customer" component={CustomerScreen}>
        </Stack.Screen>
        <Stack.Screen name="Chef" component={ChefScreen}>
        </Stack.Screen>
      </Stack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
    
  );
}
