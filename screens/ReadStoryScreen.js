import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View , TextInput ,TouchableOpacity,ScrollView ,FlatList} from 'react-native';
import { Header , SearchBar} from 'react-native-elements';
import * as firebase from 'firebase';
import db from '../config';
import {SafeAreaProvider} from 'react-native-safe-area-context';

export default class ReadStoryScreen extends React.Component {
  constructor(props){
    super(props);
    this.state={
      allStories:[],
      search : '',
      lastVisibleStory:'',
      searchedStories :[]
    } 
}
  componentDidMount=async()=>{
    const query = await db.collection('Stories').get();
    //console.log(query);
    query.docs.map((doc)=>{
      this.setState({
        allStories : [...this.state.allStories,doc.data()],
        searchedStories : []
      })
    })
  }
  searchStory=async(text)=>{
    
      const story =await db.collection('Stories').where("title","==",text).get()
      story.docs.map((doc)=>{
        this.setState({
          searchedStories : [...this.state.searchedStories,doc.data()]
        })
      })
    
  }
  render (){
    if(this.state.search === ''){
      return (
        <SafeAreaProvider>
        <View style={{backgroundColor:"pink",flex:1}}>
        <Header backgroundColor = "black"
          centerComponent={{ text: 'Story Hub', style: { color: 'white' } }} />
          <View style = {styles.searchBar}>
            <TextInput style={styles.bar}
            placeholder = "Enter Story Title"
            onChangeText = {(text)=>{
              this.setState({
                search : text
              })
            }}/>
            <TouchableOpacity style ={styles.searchButton} onPress={()=>{
              this.searchStory(this.state.search)
            }}>
              <Text> Search </Text>
            </TouchableOpacity>
          </View>
          <FlatList
          data = {this.state.allStories}
          renderItem = {({item})=>(
              <View style={{borderBottomWidth:2}}>
                <Text style={{color:"red"}}>{"Title : "+item.title}</Text>
              <Text style={{color:"white"}}>{"Author : "+item.author}</Text>
              </View>)
          }
          keyExtractor = {
            (item,index)=>{
              index.toString()
            }
          }
      />
        </View>
        </SafeAreaProvider>
        
      );
    }else {
      return (
        <SafeAreaProvider>
        <View style={{backgroundColor:"pink",flex:1}}>
        <Header backgroundColor = "black"
          centerComponent={{ text: 'Story Hub', style: { color: 'white' } }} />
          <View style = {styles.searchBar}>
            <TextInput style={styles.bar}
            placeholder = "Enter Story Title"
            onChangeText = {(text)=>{
              this.setState({
                search : text
              })
            }}/>
            <TouchableOpacity style ={styles.searchButton} onPress={()=>{
              this.searchStory(this.state.search)
            }}>
              <Text> Search </Text>
            </TouchableOpacity>
          </View>
          <FlatList
          data = {this.state.searchedStories}
          renderItem = {({item})=>(
              <View style={{borderBottomWidth:2}}>
                <Text style={{color:"red"}}>{"Title : "+item.title}</Text>
              <Text style={{color:"white"}}>{"Author : "+item.author}</Text>
              </View>)
          }
          keyExtractor = {
            (item,index)=>{
              index.toString()
            }
          }
      />
        </View>
        </SafeAreaProvider>
        
      );
    }
  }
}
const styles = StyleSheet.create({
  container:{
    flex:1,
    marginTop : 20
  },
  searchBar:{
    flexDirection : 'row',
    height:40,
    width:'auto',
    borderWidth:0.5,
    alignItems : 'center',
    backgroundColor : "green"
  },
  searchButton:{
    borderWidth : 1,
    height:30,
    width: 50,
    alignItems : 'center',
    justifyContent: 'center',
    backgroundColor:"grey"
  },
  bar:{
    borderWidth:2,
    height:30,
    width:300,
    paddingLeft:10
  }
})