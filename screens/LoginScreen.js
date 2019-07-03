
import React from 'react';
import {Toast} from "native-base";
import axios from 'axios';

import {connect} from "react-redux";
import {bindActionCreators} from "redux";
//import { addUser } from "../actions/userActions";         //this file is missing add it from your folder

import { Alert,ActivityIndicator,StyleSheet, Text, View, Button, TouchableHighlight, TextInput, Dimensions, TouchableOpacity, ImageBackground, Switch, Image,AsyncStorage } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import bgImg from "../images/bgd.jpg";
import logo from "../images/logo.png";
import { LinearGradient } from "expo-linear-gradient";
//import { LinearGradient } from 'expo';
//import * as Expo from "expo";
import * as Facebook from 'expo-facebook';
//import { Facebook } from 'expo';
import {Google} from 'expo';
import * as Font from 'expo-font';
//import {Font} from 'expo'




export default class LoginScreen extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
          email: '',
          error: '',


          showPass: true,
  		  press: false,
  		  switchvalue: false,
          signedIn: false,
          name: "",
          photoUrl: "",
          userName:"vijay",
          FacebookInfo:null,
          username:'',           //this is for username
          password:'' ,           //this if for password
          otp:''
        };
    }


   async componentDidMount() {                             //Function which is called first,when this page is loaded or mounted
    await Font.loadAsync({
      'EnGarde': require('../assets/fonts/EnGarde.ttf'),
    });
    this.setState({ fontLoaded: true });
  }

  state = {
    fontLoaded: false,
  };



  showPass = () => {                                     //function for hide and display password
    if (this.state.press == false) {
      this.setState({ showPass: false, press: true })
    }
    else {
      this.setState({ showPass: true, press: false })
    }
  }



    login = async () => {                   //function for logging
      let authToken = '';
      let user = {};
      let id;
      const baseURL = 'http://192.168.1.124:3000/users/signin';
      this._textInput.setNativeProps({ text: '' });  //       for clearing the username field after login button is pressed
      this.textInput1.setNativeProps({ text: '' });  //       for clearing the password field after login button is pressed

      //this.props.navigation.navigate('HomeScreen',{text:this.state.username})    //on navigating to homescreen,text variable stores value of username entered so that it can be used in Homescreen page
      try {
        const response = await axios.post(baseURL, {
                  // email: this.state.email,
              username:this.state.username,
              password: this.state.password,

        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        console.log(response);
        authToken = response.data;


          await AsyncStorage.setItem('isLoggedIn','1');                 //to maintain the state of logged in(ie. user cannot go back to login screen after entering homescreen)
          await AsyncStorage.setItem('value',this.state.username);      //stored the value of username entered so that i can access it in other pages
          /*await AsyncStorage.setItem('response',response);*/  //response stored in async
          await AsyncStorage.setItem('photocheck','1');        //for removing image set by social login(Fb,gmail) refer profileinfo,js
          await AsyncStorage.setItem('UserDbId',authToken._id) //user id from database stored into userdbud which will be used in events.js file
          this.props.navigation.navigate('HomeScreen',{text:authToken.name,id:authToken._id})    //on navigating to homescreen,text variable stores value of username entered so that it can be used in Homescreen page
    } catch(error) {
        console.log("Error");
        alert('Invalid Username or Password');
        console.log(error);
    }
  };



   /*  onLongPressButton() {
    Alert.alert("This is the login page")
  }*/

  onSwitchChange(value) {                          //function for switch button
    this.setState({
      switchvalue: value
    });
  }



  signIn = async () => {                                              //function for google sign in
    try {
      const result = await Google.logInAsync({
      //  androidClientId:"824063198164-fhrsj11sk9654rahjk028bmdtdtno5hc.apps.googleusercontent.com"  ,
        androidStandaloneAppClientId:"824063198164-fqv5humvslt77eaaogb5julh04la68rh.apps.googleusercontent.com",

        scopes: ["profile", "email"]
      })

      if (result.type === "success") {
        <ActivityIndicator size="large" color="blue" />
        this.setState({
          signedIn: true,
          name: result.user.name,
          photoUrl: result.user.photoUrl
        })
        await AsyncStorage.setItem('isLoggedIn','1');
        await AsyncStorage.setItem('value',this.state.name);
        await AsyncStorage.setItem('photo',this.state.photoUrl);
        this.props.navigation.navigate('HomeScreen',{text:this.state.name,photoUrl:this.state.photoUrl})
      } else {
        console.log("cancelled")
      }
    } catch (e) {
      console.log("error", e)
    }
  }

 LogInFb = async () => {                                         //function for fb signin
    try {
      const {
        type,
        token,
      } = await Facebook.logInWithReadPermissionsAsync('1048642325331666', {
        permissions: ['public_profile'],
      });
      if (type === 'success') {
        // Get the user's name using Facebook's Graph API
        const response = await fetch(`https://graph.facebook.com/me?access_token=${token}&fields=id,name,birthday,picture.type(large)`);
        const FacebookInfo = await response.json();
        this.setState({FacebookInfo});
        //Alert.alert('Logged in!', `Hi ${(await response.json()).name}!`);
        Alert.alert('Logged in!', `Hi ${this.state.FacebookInfo.name}!`);
        await AsyncStorage.setItem('isLoggedIn','1');
        await AsyncStorage.setItem('value',this.state.FacebookInfo.name);
        await AsyncStorage.setItem('photo',this.state.FacebookInfo.picture.data.url);
        this.props.navigation.navigate('HomeScreen',{text:this.state.FacebookInfo.name,photoUrl:this.state.FacebookInfo.picture.data.url})

      } else {
        // type === 'cancel'
      }
    } catch ({ message }) {
      alert(`Facebook Login Error: ${message}`);
    }
  }



    render() {
        return (
          <ImageBackground source={bgImg} style={styles.backimg}>


        <View>
          <Image source={logo} style={styles.logo} />
          <Text style={{ color: 'white', left: -95, fontSize: 16, marginBottom: 3 }}>Welcome Back,</Text>
          <Text style={{ color: 'white', left: -95, fontSize: 13, opacity: 0.5, marginBottom: 3 }}>Sign in to continue,</Text>
        </View>
        <View>
          <Icon name={'ios-person'} size={28}
            style={styles.inputIcons} />
          <TextInput
            ref={component => this.textInput1 = component}  //for clearing textinput
            placeholder={'Username'}
            placeholderTextColor={'rgba(255,255,255,0.4)'}
            style={styles.input}
            underlineColorAndroid={'transparent'}
            onChangeText={(username)=>this.setState({username})}
            value={this.state.username}
          />
        </View>

        <View>
        {this.state.switchvalue ? (  <Icon name='ios-information-circle' size={28}
            style={styles.inputIcons} />):(<Icon name={'ios-lock'} size={28}
            style={styles.inputIcons} />)}
      {this.state.switchvalue ? (     <TextInput

            placeholder={'Enter Otp'}
            placeholderTextColor={'rgba(255,255,255,0.4)'}
            underlineColorAndroid={'transparent'}
            style={styles.input}
            onChangeText={(otp)=>this.setState({otp})}
            value={this.state.otp}
          />):(<TextInput
            ref={component => this._textInput = component}  //for clearing textinput
            placeholder={'password'}
            placeholderTextColor={'rgba(255,255,255,0.4)'}
            underlineColorAndroid={'transparent'}
            style={styles.input}
            secureTextEntry={this.state.showPass}
            onChangeText={(password)=>this.setState({password})}
            value={this.state.password}
          />)}

          <Switch
            value={this.state.switchvalue}
            onValueChange={(value) => this.onSwitchChange(value)}
            style={{ left: -30.001 }}
          />
          <Text style={{ left: 249, top: -25, color: 'white', opacity: 0.5 }}>OTP</Text>
          <TouchableOpacity >
            <Text style={{ color: 'white', top: -43, left: 17, opacity: 0.5 }}>Forgot Password?</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.btneye} onPress={this.showPass.bind(this)}>
            <Icon name={this.state.press == false ? 'ios-eye' : "ios-eye-off"} size={24} color={'rgba(153,255,0,0.8)'} />
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={this.login}>
          <LinearGradient start={[0, 0.5]}
            end={[1, 0.5]}
            colors={['#dc2424', '#4a569d']}
            style={{ borderRadius: 5 }}>
            <View style={styles.circleGradient}>
              <Text style={styles.visit}>Login</Text>
            </View>
          </LinearGradient>
        </TouchableOpacity>


        <View>
          {
            this.state.fontLoaded ? (
              <Text style={{ fontFamily: 'EnGarde', color: 'white', fontSize: 15, top: 20, justifyContent: "center" }}>OR</Text>
            ) : null
          }


        </View>

        <Text style={{ justifyContent: "center", fontSize: 13, color: 'rgba(255,255,255,0.5)', top: 40 }}> Sign in with:</Text>

        <View>
          <TouchableOpacity onPress={this.signIn} style={styles.googlesignin}>
            <Icon name={'logo-google'} size={28} style={styles.authIconGoogle} />
            <Text style={styles.text}>  Sign in with Google   </Text>
          </TouchableOpacity>

          <TouchableOpacity  onPress={this.LogInFb} style={styles.facebksignin}>
            <Icon name={'logo-facebook'} size={28} style={styles.authIconfacebook} />
            <Text style={styles.textF}> Facebook   </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.trueclsignin}>
            <Icon name={'ios-call'} size={28} style={styles.authIcontruecaller} />
            <Text style={styles.textT}> TrueCaller  </Text>
          </TouchableOpacity>



        </View>

        <Text style={{ fontSize: 13, top: 30, color: 'white', left: -22 }}>
          Don't have an account?
          </Text>


         <View>
          <TouchableOpacity style={{left:90}} onPress={()=>this.props.navigation.navigate('SignUpPage')}>
          <LinearGradient start={[0, 0.5]}
            end={[1, 0.5]}
            colors={['#e02a39', '#fce8e9']}
            style={{ borderRadius: 5}}>
            <View style={styles.circleGradient2}>
              <Text style={styles.visit2}>Sign Up</Text>
            </View>
          </LinearGradient>
          </TouchableOpacity>
          </View>




        {this.state.signedIn ? (
          <LoggedInPage name={this.state.name} photoUrl={this.state.photoUrl} />
        ) : (
            console.log("do nothing")
          )}

      </ImageBackground>
        );
      }
}


const { width: WIDTH, width: WIDTH1 } = Dimensions.get('window')
const styles = StyleSheet.create({




  input: {
    width: WIDTH - 55,
    height: 45,
    borderRadius: 25,
    fontSize: 16,
    paddingLeft: 45,
    backgroundColor: 'rgba(204,204,204,0.2)',
    color: 'rgba(255,255,255,0.7)',
    marginHorizontal: 25,
    marginBottom: 20
  },

  inputIcons: {
    position: 'absolute',
    top: 6,
    left: 37,
    color: 'rgba(238,238,238,0.8)'

  },


  btneye: {
    position: 'absolute',
    top: 9,
    right: 37

  },

  backimg: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: null,
    height: null
  },

  circleGradient: {
    margin: 2,
    backgroundColor: "rgba(49, 46, 49,1)",
    borderRadius: 7,
    width: 95,
    height: 30
  },

  circleGradient2: {
    margin: 2,
    backgroundColor: "rgba(49, 46, 49,1)",
    borderRadius: 7,
    width: 55,
    height: 30
  },



  visit: {
    margin: 4,
    paddingHorizontal: 2,
    textAlign: "center",
    backgroundColor: "rgba(49, 46, 49,1)",
    color: '#ef0606',
    fontSize: 16,
    fontWeight: 'bold'

  },

  visit2: {
    margin: 4,
    paddingHorizontal: 2,
    textAlign: "center",
    backgroundColor: "rgba(49, 46, 49,1)",
    color: '#ef0606',
    fontSize: 12,
    fontWeight: 'bold'

  },

  signupbutton: {
    backgroundColor: ('rgba(255,255,255,0.01)'),
    padding: 3, borderRadius: 5,
    borderColor: 'white', borderWidth: 2,
    left: 85, top: 8, textDecorationLine: 'underline', fontStyle: 'italic',
    color: 'white', margin: 2, fontWeight: 'bold'
  },




  googlesignin: {
    width: WIDTH1 - 95,
    height: 45,
    borderRadius: 25,
    fontSize: 16,
    backgroundColor: '#ce2f0c',
    justifyContent: 'center',
    margin: 20,
    top: 50
  },

  facebksignin: {
    width: WIDTH - 215,
    height: 45,
    borderRadius: 25,
    fontSize: 16,
    backgroundColor: '#ffffff',
    top: 55,
    left: 0.5,

  },

  trueclsignin: {
    width: WIDTH - 215,
    height: 45,
    borderRadius: 25,
    fontSize: 16,
    backgroundColor: '#0880d1',
    top: 8,
    left: 160,

  },



  text: {
    textAlign: 'center',
    fontSize: 15,
    fontWeight: 'bold',
    color: "#ffffff"
  },

  textF: {
    textAlign: 'center',
    fontSize: 15,
    fontWeight: 'bold',

    color: "#000000",
    top: 10,
    left: 4
  },
  textT: {
    textAlign: 'center',
    fontSize: 15,
    fontWeight: 'bold',
    color: "#ffffff",
    top: 10,
    left: 4
  },

  authIconGoogle: {
    position: 'absolute',
    top: 6,
    left: 12,
    color: 'rgba(255, 255, 255,1)'
  },

  authIconfacebook: {
    position: 'absolute',
    top: 6,
    left: 12,
    color: 'blue'
  },

  authIcontruecaller: {
    position: 'absolute',
    top: 6,
    left: 12,
    color: 'white'
  },

  logo: {
    width: 90,
    height: 90,
    justifyContent: 'center'
  },

  header: {
    fontSize: 25
  },
  image: {
    marginTop: 15,
    width: 150,
    height: 150,
    borderColor: "rgba(0,0,0,0.2)",
    borderWidth: 3,
    borderRadius: 150
  }

});


/*const mapStateToProps = state => {
    const { user } = state;
    return user;
};

const mapDispatchToProps = dispatch => (
    bindActionCreators({
        addUser
    }, dispatch)
);

 connect(mapStateToProps, mapDispatchToProps)(LoginScreen)*/
