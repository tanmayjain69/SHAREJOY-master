import * as React from 'react';
import { Component } from 'react';
import { Text, View, StyleSheet,Linking,TouchableOpacity,Image,Switch,AsyncStorage} from 'react-native';
import { createStackNavigator, createAppContainer} from 'react-navigation';
import AppIntroSlider from 'react-native-app-intro-slider';




import CreateEvent from "./CreateEvent.js";
import LoginScreen from './LoginScreen.js';
import FormNewEvent from './FormNewEvent.js'


       

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showRealApp: false,
      //To show the main page of the app
    };
  }

  async componentDidMount() {
    
    await AsyncStorage.setItem('AlreadyLoaded','1');
  
  }

  _onDone = () => {
    // After user finished the intro slides. Show real app through
    // navigation or simply by controlling state
    this.setState({ showRealApp: true });
    this.props.navigation.navigate('LoginScreen')
  };
  _onSkip = () => {
    // After user skip the intro slides. Show real app through
    // navigation or simply by controlling state
    this.setState({ showRealApp: true });
    this.props.navigation.navigate('LoginScreen')
  };
  render() {
    //If false show the Intro Slides
    if (this.state.showRealApp) {
      //Real Application
      return (
       <LoginScreen/>
      );
    } else {
      //Intro slides
      return (
        <AppIntroSlider
          slides={slides}
          //comming from the JsonArray below
          onDone={this._onDone}
          //Handler for the done On last slide
          showSkipButton={true}
          onSkip={this._onSkip}
        />
      );
    }
  }
}
const styles = StyleSheet.create({
  image: {
    width: 200,
    height: 200,
  },
  text: {
    color: '#FFFFFF',
    fontSize: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    backgroundColor: 'transparent',
    textAlign: 'center',
    marginTop: 16,
  },
});
 
const slides = [
  {
    key: 's1',
    text: 'Swipe to know more',
    title: 'Sharejoy',
    titleStyle: styles.title,
    textStyle: styles.text,
    image:require('../images/logo.png'),
    imageStyle: styles.image,
    backgroundColor: '#08080a',
  },
  {
    key: 's2',
    title: 'Host Events',
    titleStyle: styles.title,
    text: 'Host Weddings,Birthdays and many more events',
    image: require('../images/intro1.png'),
    imageStyle: styles.image,
    backgroundColor: '#353538',
  },
  {
    key: 's3',
    title: 'Invite your friends',
    titleStyle: styles.title,
    text: 'Send invitation to your friends',
    image:require('../images/introx.png'),
    imageStyle: styles.image,
    backgroundColor: '#353538',
  },
  {
    key: 's4',
    title: 'Get Notified',
    titleStyle: styles.title,
    text: 'Recieve notfications on being invited',
    image: require('../images/intro3.png'),
    imageStyle: styles.image,
    backgroundColor: '#353538',
  },
  
];




// You can import from local files


// or any pure javascript modules available in npm




  /*  const SimpleApp = createAppContainer(createStackNavigator({
      Home: { screen: LoginScreen },
      Chat: {
        screen: CreateEvent,
        path: 'chat/:user',
      },
      FormNewEvent: {
        screen: FormNewEvent,
        path: 'FormNewEvent/:user',
      },
    }));
    const prefix = Expo.Linking.makeUrl("/");
    const MainApp = () => <SimpleApp uriPrefix={prefix} />;
    
    
     export default MainApp;  */
      

  


