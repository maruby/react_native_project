import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Button, FlatList, TouchableOpacity } from 'react-native';

export default function App() {
   
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

  return (
    <View style={styles.container}>
      <Text style={styles.title}>ToDo List</Text>
          <FlatList 
            data={todoList}
            renderItem={({item, index}) => (
                <View style={styles.items}>
                  <Button 
                  title="-"
                  onPress={() => deleteTask(item.id)}
                  />
                  <TouchableOpacity onPress={() => updateTask(item.id, item.task, item.done)}>
                    <Text
                    style={item.done ? styles.strikeThrough : styles.itemText}
                    >{item.task}</Text>
                  </TouchableOpacity>
               </View>
            )}
            />
          <View style={styles.input}>     
            <TextInput
            style={styles.inputText}
            autoCapitalize="sentences"
            defaultValue="Add task here"
            onChangeText={text => setTask(text)}
            value={task} />
            <Button
            title="+"
            onPress={addTask}
          />
          </View>  
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 3, 
    padding: 20
  },
  items: {
    height: 10,
    width: 200,
    marginBottom: 30,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  title: {
    margin: 3,
    padding: 5,
    fontSize: 50,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  
  input:{
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  inputText: {
    height: 40, 
    borderColor: 'gray', 
    borderWidth: 1,
  },
  itemText: {
    marginLeft: 10,
    fontSize: 20,
  },
  strikeThrough: {
    marginLeft: 10,
    fontSize: 20,
    textDecorationLine: 'line-through'
  }
});
