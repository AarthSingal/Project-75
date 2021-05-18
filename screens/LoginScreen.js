import * as firebase from 'firebase';
import React from 'react';
import { StyleSheet, Text, View, FlatList ,TextInput , TouchableOpacity ,Image, KeyboardAvoidingView} from 'react-native';

export default class LoginScreen extends React.Component {
    constructor(){
        super();
        this.state={
            emailId : '',
            password :''
        }
    }
    login=async(email,password)=>{
        if(email && password){
            try{
                const response = await firebase.auth().signInWithEmailAndPassword(email,password)
                if(response){
                    this.props.navigation.navigate('WriteStory')
                }
            }
            catch(error){
                switch(error.code){
                    case 'auth/user-not-found':
                        alert("User doesn't exist")
                        break;
                    case 'auth/invalid-email':
                        alert("Incorrect Email or Password")
                        break;
                }
            }
        }else{
            alert("Enter Email and Password")
        }
    }
    render(){
        return(
            <KeyboardAvoidingView style= {{alignItems:"center",marginTop:20,flex:1}}>
                <View>
                    <Image source={require('../assets/Logo.png')} style={{width:200,height:200}}/>
                    <Text style={{textAlign:"center",fontSize:30}}>Story Hub</Text>
                </View>
                <View>
                    <TextInput placeholder="abc@example.com" 
                    onChangeText={(text)=>{
                        this.setState({
                            emailId:text
                        })
                    }} 
                    keyboardType = 'email-address'
                    style={styles.loginBox}/>
                    <TextInput style={styles.loginBox}
                    secureTextEntry={true}
                    placeholder="Enter Password"
                    onChangeText={(text)=>{
                        this.setState({
                            password:text
                        })
                    }}/>
                </View>
                <View>
                    <TouchableOpacity style={{height:30,width:90,borderWidth:1,marginTop:20,paddingTop:5,borderRadius:5}}
                    onPress={()=>{
                        this.login(this.state.emailId,this.state.password)
                    }}>
                        <Text> Login</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        );

    }
}
const styles=StyleSheet.create({
    loginBox:{
        width:300,
        height:40,
        borderWidth:1.5,
        fontSize:20,
        margin:10,
        paddingLeft:10
    }
})