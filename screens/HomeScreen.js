import * as React from 'react';
import { StyleSheet, Text, View, Platform } from 'react-native';
import { Icon } from 'native-base';
import { SearchBar } from 'react-native-elements';
import { createStackNavigator, createAppContainer, createMaterialTopTabNavigator, createDrawerNavigator, createSwitchNavigator } from 'react-navigation';
import EventTab from './Tabs/Events.js'
import NotificationTab from './Tabs/Notification.js'
import ProfileTab from './Tabs/Profile.js'
import LoginScreen from './LoginScreen.js';
import DrawerScreen from './DrawerScreen.js';
import DrawerLayout from 'react-native-gesture-handler/DrawerLayout';
import CreateEvent from './CreateEvent.js';
import axios from 'axios';
import EventsDetails from './EventsDetails.js'

export default class App extends React.Component {

 constructor(props){
   super(props);
   loginData=props.navigation.getParam('text', 'nothing'),
   loginId = props.navigation.getParam('id','nothing'),
   photoData=props.navigation.getParam('photoUrl','https://cdn1.iconfinder.com/data/icons/avatar-flat-1/512/10-512.png'),
   global.SampleVar = loginData;
   global.PhotoVar=photoData;
   global.ID = loginId;
   axios.get('http://192.168.0.102:3000/users/'+global.ID,{  
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => {
            console.log(response.data);
            user1=response.date;
            global.user = user1;
        }).catch(error => {
            console.log(error);
        })
  console.log(global.user); 
  console.log('loginID:'+ loginId);
   
 }
  render() {
   
    return (<Root />)
  }
}

var example = global.SampleVar

const AppTabNavigator = createMaterialTopTabNavigator({
  NotificationTab: NotificationTab,
  EventTab: EventTab,
  ProfileTab: ProfileTab
}, {
    initialRouteName:"EventTab",
    animationEnabled: true,
    swipeEnabled: true,
    tabBarPosition: "bottom",
    tabBarOptions: {
      style: {
        ...Platform.select({
          android: {
            backgroundColor: 'white'
          }
        })
      },
      activeTintColor: '#000000',
      inactiveTintColor: "#d1cece",
      showLabel: false,
      showIcon: true,
      tabBarIcon: ""
    },
  })

const DashboardStackNavigator = createStackNavigator(

  {
    DashboardTabNavigator: AppTabNavigator,
    CreateEventScreen: {
      screen: CreateEvent,
      navigationOptions: {
        header: null,
      }
    },

    EventsDetails: {
      screen:EventsDetails,
      navigationOptions: {
        header: null,
      }
    },

    HomeScreen: {
      screen:App,
      navigationOptions: {
        header: null,
      }
    },

    ProfileTab:{
      screen:ProfileTab
    },
   


  },
  {

    defaultNavigationOptions: ({ navigation }) => {


      return {


        headerLeft: (
          <Icon onPress={() => navigation.openDrawer()} name="ios-menu" style={{ paddingLeft: 10 }} />
        ),
        headerTitle: (<SearchBar inputContainerStyle={{ backgroundColor: 'rgba(221,221,221,0.4)' }} style={{ margin: 170 }} containerStyle={{ height: '100%', width: '85%', backgroundColor: 'white', borderRadius: 5 }} round lightTheme

          placeholder=""
        />)
      };
    }
  }
);



const AppDrawerNavigator = createDrawerNavigator({
 
  Dashboard: {
    screen: DashboardStackNavigator
  },
 
  LoginScreen: LoginScreen,
  ProfileTab: ProfileTab,




}, {
    drawerType: 'slide',

    contentComponent: ({ navigation, demo=global.SampleVar,photourl=global.PhotoVar}) => {


      return (<DrawerScreen photo={photourl} data={demo} navigation={navigation}/>)
    }
  }
);






const Root = createAppContainer(AppDrawerNavigator);










const styles = StyleSheet.create({
  container: {
    flex: 1,

  },
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },
});