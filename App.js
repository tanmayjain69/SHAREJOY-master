import React from 'react';
import { StyleSheet, Text, View,ActivityIndicator,StatusBar,AsyncStorage} from 'react-native';
import { createStackNavigator, createAppContainer,createSwitchNavigator} from 'react-navigation'
import LoginScreen from './screens/LoginScreen.js';
import HomeScreen from './screens/HomeScreen.js';
import TestScreen from './screens/TestScreen.js'
import CreateEvent from './screens/CreateEvent.js';
import FormNewEvent from './screens/FormNewEvent.js';
import DrawerScreen from './screens/DrawerScreen.js';
import ProfileTab from './screens/Tabs/Profile.js';
import SignUpPage from './screens/SignUpPage.js';
import BirthdayEvent from './screens/Birthday.js';
import MeetupEvent from './screens/Meetup.js';
import WeddingEvent from './screens/Wedding.js';
import OfficeEvent from './screens/Office.js';
import EventsDetails from './screens/EventsDetails'
//import { ActivityIndicator } from 'react-native-paper';



const RootStack = createStackNavigator({
  HomeScreen: {
    screen: HomeScreen,
    path: 'HomeScreen',
    navigationOptions: {              //for removing white header on top of screen
      header: null,
    }
    
  },

 SignUpPage: {
    screen: SignUpPage,
    navigationOptions: {              //for removing white header on top of screen
      header: null,
    }
    
  },

 /* LoginScreen: {
    screen: LoginScreen,
    navigationOptions: {              //for removing white header on top of screen
      header: null,
    } 
  },*/
  

  CreateEventScreen:{
    screen:CreateEvent
  },

  FormNewEvent:{
    screen:FormNewEvent
  },

  DrawerScreen:{
    screen:DrawerScreen
  },

  ProfileTab:{
    screen:ProfileTab
  },

  TestScreen: {
    screen: TestScreen,
    navigationOptions: {              //for removing white header on top of screen
      header: null,
    }
    
  },

  BirthdayEvent:{
    screen:BirthdayEvent,
     navigationOptions: {              //for removing white header on top of screen
      header: null,
    }
  },
  MeetupEvent:{
    screen:MeetupEvent,
     navigationOptions: {              //for removing white header on top of screen
      header: null,
    }
  },
  WeddingEvent:{
    screen:WeddingEvent,
     navigationOptions: {              //for removing white header on top of screen
      header: null,
    }
  },
  OfficeEvent: {
    screen:OfficeEvent,
    navigationOptions: {
      header:null,
    }
  },


  EventsDetails: {
    screen:EventsDetails,
    navigationOptions: {
      header:null,
    }
  },
 
  
},
  {
    //initialRouteName: "LoginScreen"
  },
)


const AuthStack=createStackNavigator({
 LoginScreen: {
    screen:LoginScreen,
    navigationOptions: {              //for removing white header on top of screen
      header: null,
    }
    
  },
  
});

//The below class will decide which screen must be displayed when app is opened

class AuthLoadingScreen extends React.Component{
  constructor(props){
    super(props);
    this._loadData();
  }

  render(){
    return(
      <View style={styles.container}>
        <ActivityIndicator />
        <StatusBar barStyle='default'/>
      </View>
    );
  }

  _loadData=async()=>{
 const isLoggedIn=await AsyncStorage.getItem('isLoggedIn'); // to check if anykind of data is stored in asyncstorage
   const AlreadyLoaded=await AsyncStorage.getItem('AlreadyLoaded') //for introductionscreen state
   const SignInState=await AsyncStorage.getItem('SignupPage')
   const value=await AsyncStorage.getItem('value');
   const photo=await AsyncStorage.getItem('photo');
   if(AlreadyLoaded !=='1'){
     this.props.navigation.navigate('TestScreen')
   }
  else{
    this.props.navigation.navigate(isLoggedIn !=='1' ? 'Auth':'HomeScreen',{text:value,photoUrl:photo,id:global.ID}); //if isLoggedin != 1 redirect to Auth(ie LoginScreen) else if isLoggdin =1 redirect to homescreen  
   }


 }
}

/*const Root = createAppContainer(RootStack);
export default class App extends React.Component {

  render() {
    return <Root />;
  }
}*/
export default createAppContainer(createSwitchNavigator(
  {
    AuthLoading:AuthLoadingScreen,
    App: RootStack,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'AuthLoading',
  }
));


const styles=StyleSheet.create({
  container:{
    flex:1,
    justifyContent:'center',
    alignItems:"center",
  }
})

