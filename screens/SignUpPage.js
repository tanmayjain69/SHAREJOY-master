import React from 'react';
import { StyleSheet, Text, View,BackHandler } from 'react-native';
import { NavigationActions } from 'react-navigation'
import { Alert,ActivityIndicator, Button, TouchableHighlight, TextInput, Dimensions, TouchableOpacity, ImageBackground, Switch, Image,AsyncStorage, Keyboard } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import bgImg from "../images/bgd.jpg";
import logo from "../images/logo.png";
import { LinearGradient } from "expo-linear-gradient";
import KeyboardShift from './KeyboardShift.js';
import axios from 'axios';




export default class signup extends React.Component{

  constructor(){
    super();
    this.state={
      username:'',
      usernameError:'',
      phoneno:'',
      phonenoError:'',
      emailid:'',
      emailidError:'',
      password:'',
      passwordError:'',
      switchvalue:'',
      loginstate:false,
      showPass: true,
      press: false,
    }

  }

  componentDidMount() {
    BackHandler.addEventListener("hardwareBackPress", this.onBackPress)              //block hardware back button
  }

  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.onBackPress)         //block hardware back button
  }

  onBackPress = () => {                                                            //block hardware back button
    const { dispatch, nav } = this.props
    if (0 === 0) {
      return true;
    }
    dispatch(NavigationActions.back())
    return true;
  };

  showPass = () => {
    if (this.state.press == false) {
      this.setState({ showPass: false, press: true })
    }
    else {
      this.setState({ showPass: true, press: false })
    }
  }



  onPressLearnMore=async()=>{


    //const {username,phoneno,emailid,password} = this.state;
    if(this.state.username == ""){
      this.setState({usernameError:"Please enter Username"})

    }else{
      this.setState({usernameError:''});
      alpha=/^[a-zA-Z]+$/;
      if(alpha.test(this.state.username)){
         // console.warn('name is correct');
         this.setState({loginstate:true});

      }
      else{
       // console.warn('name is not correct');
        this.setState({usernameError:"Name Should be alphabetic"})


      }

    }

  if (this.state.phoneno == ""){
     this.setState({phonenoError:"Please enter Phone-No."});
     this.setState({loginstate:false});
    }else{
      this.setState({phonenoError:""});
      nos=/^\d{10}$/;
      if(this.state.phoneno.match(nos)){
         // console.warn('correct phone no');
          this.setState({phonenoError:''})
          this.setState({loginstate:true});

      }else{
       // console.warn('wrong phoneno');
        this.setState({phonenoError:'Not a valid phone no.\(Must be 10 digits\) '})
        this.setState({loginstate:false});

      }
    }

    if (this.state.emailid == ""){
      this.setState({emailidError:'Please enter Email-Id'})
      this.setState({loginstate:false})
    }else{
      this.setState({emailidError:""});

      reg =/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      if(reg.test(this.state.emailid) === false){
       // console.warn('wrong emailid');
       this.setState({emailidError:"Email-id invalid"});

      }else{
     //   console.warn('right emailid');
     this.setState({loginstate:true});

      }
    }

     if (this.state.password == ""){
     this.setState({passwordError:'Please enter password'})
     this.setState({loginstate:false})
    }else{
     this.setState({passwordError:""});
       pass= /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
       if(this.state.password.match(pass)){
      //   console.warn('password is correct');
      this.setState({loginstate:true});

       }else{
      //    console.warn('password wrong');
          this.setState({passwordError:'INVALID:Must contain atleast 6 digits including alphabet,special case and number'})
          this.setState({loginstate:false})

       }

    }






    if(this.state.loginstate==true){

        console.log('new page entered');
        axios.post('http://192.168.1.124:3000/users/',this.state, {
          headers: {
              'Content-Type': 'application/json'
          }
      }).then(response => {
          console.log(response.data);
          alert("Account Created")
          this.props.navigation.navigate('LoginScreen');

      }).catch(error => {
          console.log(error);
      })
        this.props.navigation.navigate('LoginScreen');
        await AsyncStorage.setItem('number',this.state.phoneno);


    }


  }
    render() {

       return(
           <KeyboardShift>
                {() => (
        <ImageBackground source={bgImg} style={styles.backimg}>
        <Icon name="ios-arrow-back" color='white' size={28} style={{left:-162}} onPress={() => this.props.navigation.navigate('LoginScreen')}/>
        <View>
            <Image source={logo} style={styles.logo} />
            <Text style={{ color: 'white', left: -95, fontSize: 16, marginBottom: 3 }}>Register</Text>
            <Text style={{ color: 'white', left: -95, fontSize: 13, opacity: 0.5, marginBottom: 3 }}>Sign up to continue,</Text>
        </View>

        <Text style={{color:'red', textAlign:'center',top:-20}}>
            {this.state.formError}
        </Text>

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
            value1={this.state.username}
          />
          <Text style={{color:'red', textAlign:'center',top:-20}}>
            {this.state.usernameError}
          </Text>
        </View>

        <View>
          <Icon name={'ios-call'} size={28}
            style={styles.inputIcons} />
          <TextInput
            ref={component => this.textInput2 = component}  //for clearing textinput
            keyboardType="phone-pad"
            placeholder={'Phone no'}
            placeholderTextColor={'rgba(255,255,255,0.4)'}
            style={styles.input}
            underlineColorAndroid={'transparent'}
            onChangeText={(phoneno)=>this.setState({phoneno})}
            value2={this.state.phoneno}
          />
          <Text style={{color:'red', textAlign:'center',top:-20}}>
            {this.state.phonenoError}
          </Text>
        </View>

        <View>
          <Icon name={'ios-mail'} size={28}
            style={styles.inputIcons} />
          <TextInput
            ref={component => this.textInput3 = component}  //for clearing textinput
            placeholder={'Email-id '}
            placeholderTextColor={'rgba(255,255,255,0.4)'}
            style={styles.input}
            underlineColorAndroid={'transparent'}
            onChangeText={(emailid)=>this.setState({emailid})}
            value={this.state.emailid}
          />
          <Text style={{color:'red', textAlign:'center',top:-20}}>
            {this.state.emailidError}
          </Text>
        </View>

        <View>
          <Icon name={'ios-lock'} size={28}
            style={styles.inputIcons} />
          <TextInput
            ref={component => this._textInput = component}  //for clearing textinput
            placeholder={'password'}
            placeholderTextColor={'rgba(255,255,255,0.4)'}
            underlineColorAndroid={'transparent'}
            style={styles.input}
            secureTextEntry={this.state.showPass}
            onChangeText={(password)=>this.setState({password})}
            value={this.state.password}
          />
          <Text style={{color:'red', textAlign:'center',top:-20}}>
            {this.state.passwordError}
          </Text>


          <TouchableOpacity style={styles.btneye} onPress={this.showPass.bind(this)}>
            <Icon name={this.state.press == false ? 'ios-eye' : "ios-eye-off"} size={24} color={'rgba(153,255,0,0.8)'} />
          </TouchableOpacity>

        </View>

        <TouchableOpacity onPress={this.onPressLearnMore}>
          <LinearGradient start={[0, 0.5]}
            end={[1, 0.5]}
            colors={['#dc2424', '#4a569d']}
            style={{ borderRadius: 5 }}>
            <View style={styles.circleGradient}>
              <Text style={styles.visit}>Register</Text>
            </View>
          </LinearGradient>
        </TouchableOpacity>



        </ImageBackground>
         )}
        </KeyboardShift>

       )
    }
}



const LoggedInPage = props => {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Welcome:{props.name}</Text>
        <Image style={styles.image} source={{ uri: props.photoUrl }} />
      </View>
    )
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



    visit: {
      margin: 4,
      paddingHorizontal: 2,
      textAlign: "center",
      backgroundColor: "rgba(49, 46, 49,1)",
      color: '#ef0606',
      fontSize: 16,
      fontWeight: 'bold'

    },

    signupbutton: {
      backgroundColor: ('rgba(255,255,255,0.01)'),
      padding: 4, borderRadius: 5,
      borderColor: 'white', borderWidth: 2,
      left: 85, top: 8, textDecorationLine: 'underline', fontStyle: 'italic',
      color: 'white', margin: 2, fontWeight: 'bold'
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
