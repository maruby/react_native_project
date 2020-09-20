
import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native'
import {  Tile } from 'react-native-elements';

const HomeScreen = ({ navigation, menu, setFetch }) => {
  
  return (
    <View>
        <Tile
            imageSrc={require('../assets/images/jay-wennington-N_Y88TWmGwA-unsplash.jpg')}
            imageContainerStyle={styles.tileImage}
            title="Customers"
            titleStyle={styles.textWithShadow}
            height={257}
            onPress={() => navigation.navigate('Customer', {menu: menu, setFetch: setFetch})}
            featured
        />
        <Tile
            imageSrc={require('../assets/images/photo-1575672401756-206fe7a54513.jpg')}
            imageContainerStyle={styles.tileImage}
            title="Chefs"
            titleStyle={styles.textWithShadow}
            height={257}
            onPress={() => navigation.navigate('Chef', {menu: menu, setFetch: setFetch})}
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