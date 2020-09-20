
import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native'
import { Header, Tile } from 'react-native-elements';

// import { useFonts, Courgette_400Regular } from '@expo-google-fonts/inter';

const HomeScreen = ({ navigation }) => {
  // let [fontsLoaded] = useFonts({
  //   Courgette_400Regular,
  // });

  const apiUrl = 'http://localhost:3000/todolist'
  const [task, setTask] = useState('')
  const [todoList, setTodoList] = useState()

   useEffect(() => {
      fetch(apiUrl)
      .then((response) => response.json())
      .then((json) => {
        setTodoList(json);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [todoList])

  const addTask = () => {
    fetch(apiUrl, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        task: task,
        done: false
      })
    })
    setTask("")
  }

  const updateTask = (id, task, done) => {
    fetch(`${apiUrl}/${id}`,{
      method: 'PUT', 
      headers: {
       'Content-type': 'application/json'
      },
      body: JSON.stringify({
        task: task,
        done: !done
      }) 
      }
    )
   }

  const deleteTask = (id) => {
      fetch(`${apiUrl}/${id}`, {
        method: 'DELETE',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
      })
  }

  // if (!fontsLoaded) {
  //   return <AppLoading />;
  // }

  return (
    <View>
        <Tile
            imageSrc={require('../assets/images/jay-wennington-N_Y88TWmGwA-unsplash.jpg')}
            imageContainerStyle={styles.tileImage}
            title="Costumers"
            titleStyle={styles.textWithShadow}
            height={257}
            onPress={() => navigation.navigate('Costumer')}
            featured
        />
        <Tile
            imageSrc={require('../assets/images/photo-1575672401756-206fe7a54513.jpg')}
            imageContainerStyle={styles.tileImage}
            title="Chefs"
            titleStyle={styles.textWithShadow}
            height={257}
            onPress={() => navigation.navigate('Chef')}
            featured
        />
        <StatusBar style="auto" />
    </View>
  );
}
const styles = StyleSheet.create({
  textWithShadow:{
    height: 40,
    width: 120,
    borderWidth: 2,
    borderColor: "#FFFFFF",
    borderRadius: 6,
    color: "#FFFFFF",
    textAlign: "center",
    fontSize: 30,
  },
  tileImage:{
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderColor: "#FFFFFF",
    borderRadius: 6,
    borderWidth: 2,
    borderColor: "#FFFFFF",
  }
});

export default HomeScreen