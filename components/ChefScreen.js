import React, { useState, useEffect } from 'react'
import { StyleSheet ,View, ImageBackground, FlatList, TextInput, ScrollView } from 'react-native'
import {  Card, Button } from 'react-native-elements';


const ChefScreen = ({ route }) => {
  const { menu, setFetch } = route.params;
  const apiUrl = 'http://localhost:3000/menu'
  const bgImage = require('../assets/images/wooden_texture.jpg')

  const [menuChef, setMenuChef] = useState(menu) 
  const [newDishName, setNewDishName] = useState("")
  const [newPriceValue, setNewPriceValue] = useState()
  const [newDish, setNewDish] = useState("")
  const [newPrice, setNewPrice] = useState()

  const fetchMenu = () => {
    fetch(apiUrl)
    .then((response) => response.json())
    .then((json) => {
      setMenuChef(json);
      setFetch(true)
    })
    .catch((error) => {
      console.error(error);
    });
  }

  const addDish = () => {
    fetch(apiUrl, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        dish: newDish,
        price: newPrice,
        rating: ""
      })
    })
    setNewDish("")
    setNewPrice()
    fetchMenu()
  }

  const updateDish = (id, rating) => {
    fetch(`${apiUrl}/${id}`,{
      method: 'PUT', 
      headers: {
       'Content-type': 'application/json'
      },
      body: JSON.stringify({
        dish: newDishName,
        price: newPriceValue,
        rating: rating
      }) 
      }
    )
    fetchMenu()
   }

  const deleteDish = (id) => {
    fetch(`${apiUrl}/${id}`, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
    })
    fetchMenu()
  }

  return (
    <View style={styles.container}>
       <ImageBackground source={bgImage} style={styles.bgImage}>
         <ScrollView>
          <FlatList 
              data={menuChef}
              renderItem={({item}) => { 
                setNewDishName(item.dish)
                setNewPriceValue(item.price)
                return (
                <Card>
                  <Card.Image 
                    source={item.imageSrc} />
                  <Card.Divider />
                    <TextInput
                    style={styles.textInput}
                    defaultValue={item.dish.toUpperCase()}
                    onChangeText={text => setNewDishName(text)}
                    />
                    <TextInput
                    style={styles.textInput}
                    defaultValue={item.price}
                    onChangeText={value => setNewPriceValue(value)}
                    />
                  <Card.Divider />
                    <View style={styles.buttonWrapper}>
                      <Button
                      buttonStyle={styles.button}
                      type="clear"
                      title='OK' 
                      onPress={() => updateDish(item.id, item.rating)}
                      />
                      <Button
                      buttonStyle={styles.button}
                      type="clear"
                      title='Delete' 
                      onPress={() => deleteDish(item.id)}
                      />
                    </View>
                </Card>
              )}
            }
            keyExtractor={menu => menu.id}
              />
          </ScrollView>
            <View style={{height: 40}}>
            <TextInput
            style={styles.textInput2}
            defaultValue="New Dish"
            onChangeText={text => setNewDish(text)}
            />
            <TextInput
            style={styles.textInput2}
            defaultValue="Dish Price"
            onChangeText={value => setNewPrice(value)}
            />
            <Button
            buttonStyle={{padding: 10}}
            title='Add Dish' 
            onPress={() => addDish()}
            />
          </View>
      </ImageBackground>
  </View>
  )
}

const styles = StyleSheet.create({
  container: {    
    flex: 1,
    flexDirection: "column"
  },
  bgImage:{
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    backgroundColor: 'rgba(0,0,0,0.5)'
  }, 
  textInput: {
    fontWeight: "bold",
    textAlign: "center"
  },
  textInput2: {
    fontWeight: "bold", 
    backgroundColor: "#fff",
    borderColor: "gray",
    textAlign: "center"
  },
  buttonWrapper:{
    flexDirection: "row",
    justifyContent: "space-between"
  },
  button:{
    height: 10,
    fontSize: 9
  }
})

const Overlay = (visible) => {
  const toggleOverlay = () => {
    setVisible(!visible);
  };
  return (
    <View>

      <Button title="Add Dish" onPress={toggleOverlay} />
      <Overlay isVisible={visible} onBackdropPress={toggleOverlay}>
        <Text>Hello from Overlay!</Text>
      </Overlay>
    </View>
  );
};
export default ChefScreen