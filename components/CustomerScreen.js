import React, { useState } from 'react'
import { StyleSheet ,View, Text, Image, ImageBackground, FlatList, TextInput  } from 'react-native'
import { Rating, Card } from 'react-native-elements';

const CustomerScreen = ({route}) => {
  const { menu } = route.params
  const apiUrl = 'http://localhost:3000/menu'
  const bgImage = require('../assets/images/wooden_texture.jpg')

  const [ menuCustomer, setMenuCustomer ] = useState(menu) 

  const updateRatings = (id, dish, price, rating) => {
    fetch(`${apiUrl}/${id}`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        dish: dish,
        price: price,
        rating: rating
      })
    })
  }


  return (
    <View style={styles.container}>
       <ImageBackground source={bgImage} style={styles.bgImage}>
         <FlatList 
            data={menuCustomer}
            renderItem={({item}) => (
              <Card>
                <Card.Image 
                  source={item.imageSrc} />
                <Card.Divider />
                  <Card.Title>{item.dish.toUpperCase()}</Card.Title>
                <Card.Divider />
                  <View style={styles.subtitleWrapper}>
                    <Text style={{fontSize: 20, fontWeight: "bold"}}>{item.price} PHP</Text>
                    <Rating 
                      startingValue={3}
                      ratingCount={5}
                      imageSize={20}
                      onFinishRating={(rating) => updateRatings(item.id, item.dish, item.price, rating)}
                    />
                  </View>
              </Card>
            )}
           keyExtractor={menu => menu.id}
            />
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
    fontWeight: "bold"
  },
  subtitleWrapper:{
    flexDirection: "row",
    justifyContent: "space-between"
  }
})
  export default CustomerScreen