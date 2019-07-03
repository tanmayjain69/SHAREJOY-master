import React from 'react';
import { Container, Content, Card, CardItem } from 'native-base';
import { StyleSheet, Text, View, Platform,Image,TouchableOpacity} from 'react-native';
import { Icon } from 'native-base';
import { SearchBar } from 'react-native-elements';
import { Col, Row, Grid } from "react-native-easy-grid";
import DrawerScreen from './DrawerScreen.js';
import HomeScreen from './HomeScreen.js'
import { createStackNavigator, createAppContainer, createMaterialTopTabNavigator, createDrawerNavigator, createSwitchNavigator } from 'react-navigation';
import FormNewEvent from './FormNewEvent';
import ProfileScreen from './Tabs/Profile.js';
import LoginScreen from './LoginScreen.js';
import BirthdayEvent from './Birthday.js';
import MeetupEvent from './Meetup.js';
import WeddingEvent from './Wedding.js';
import OfficeEvent from './Office.js';
export default class App extends React.Component{
render(){
    return <RootEventNavigator/>
}

}

 class CreateEvent extends React.Component {
    render() {

        return (
            <Container>
                <Content>
                    <Card style={{ height: 70, borderRadius: 10 }}>
                        <CardItem style={{ marginTop: 12 }}>
                        <Image source={require('../images/cocktail.png')} style={{width:35,height:35}}  />
                            <Text style={{ fontSize: 20 }}>
                                Create a Quick Event
                            </Text>
                        </CardItem>
                    </Card>
                    <Text style={{ textAlign: 'center',shadowColor: "#000",
shadowOffset: {
	width: 0,
	height: 10,
},
shadowOpacity: 0.51,
shadowRadius: 13.16,

elevation: 5, color: 'white', backgroundColor: 'red', fontWeight: 'bold', fontStyle: 'italic' }}>
                        Customized Event</Text>

                    <Grid style={{ marginTop: 15 }}>
                        <Row>
                                <TouchableOpacity onPress={() => this.props.navigation.navigate('FormNewEvent')}>
                                <Col  style={styles.col}>
                                <Image source={require('../images/anniversary.png')} style={{width:60,height:60}}  />
                                    <Text  style={styles.Text}>Anniversary</Text>
                                </Col>
                                </TouchableOpacity>
                                
                           <TouchableOpacity onPress={() => this.props.navigation.navigate('MeetupEvent')}>
                            <Col style={styles.col}>
                            <Image source={require('../images/group.png')} style={{width:60,height:60}}  />
                                    <Text  style={styles.Text}>Meet-ups</Text>
                            </Col>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('OfficeEvent')}>
                            <Col style={styles.col}>
                            <Image source={require('../images/officeparty.png')} style={{width:60,height:60}}  />
                                    <Text style={styles.Text}>Office Party</Text>
                                    </Col>
                            </TouchableOpacity>
                        </Row>
                        <Row style={{marginTop:20,paddingHorizontal:18,left:35}}>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('BirthdayEvent')}>
                        <Col  size={1} style={styles.col}>
                                    <Image source={require('../images/cake.png')} style={{width:60,height:60}}  />
                                    <Text style={styles.Text}>Birthday</Text>
                                </Col>
                        </TouchableOpacity>
                                
                           <TouchableOpacity  onPress={() => this.props.navigation.navigate('WeddingEvent')}>
                            <Col style={styles.col}>
                            <Image source={require('../images/wedding.png')} style={{width:60,height:60}}  />
                                    <Text style={styles.Text}>Wedding</Text>
                            </Col>
                            </TouchableOpacity>
                        </Row>
                        <Text>  </Text>
                    </Grid>

                </Content>

            </Container>
        );
    }



}


const EventNavigator=createStackNavigator({    //for navigating into different forms
    CreateEvent:CreateEvent,
    ProfileTab:ProfileScreen,
   LoginScreen: {
        screen:LoginScreen,
        navigationOptions: {              //for removing white header on top of screen
          header: null,
        }
        
      },

 
   
    FormNewEvent:{screen:FormNewEvent,
        navigationOptions:{
            header:null,
        }
    },
        BirthdayEvent:{screen:BirthdayEvent,
        navigationOptions:{
            header:null,
        }
    },
    MeetupEvent:{screen:MeetupEvent,
        navigationOptions:{
            header:null,
        }
    },
    WeddingEvent:{
        screen:WeddingEvent,
        navigationOptions:{
            header:null,
        }
    },
    OfficeEvent:{
        screen:OfficeEvent,
        navigationOptions:{
            header:null,
        }
    }


},{ 
    initialRouteName: "CreateEvent",
    defaultNavigationOptions: ({ navigation }) => {


        return {
  
  
          headerLeft: (
            <Icon onPress={() => navigation.openDrawer()} name="ios-menu" style={{ paddingLeft: 10 }} />
          ),
          headerTitle: <Text onPress={() => console.log('1st')} style={{fontWeight: 'bold',fontSize:18}}>Host a Event</Text>
        };
      }
    }

)

const EventDrawerNavigator = createDrawerNavigator({    //for sidemenu screen
    Dashboard: {
      screen: EventNavigator
    },
  
    
  
  }, {
      drawerType: 'slide',
      contentComponent: ({ navigation,demo=global.SampleVar,photourl=global.PhotoVar }) => {
        return (<DrawerScreen  photo={photourl} data={demo} navigation={navigation} />)
      }
    }
  );

const RootEventNavigator=createAppContainer(EventDrawerNavigator)

const styles=StyleSheet.create({

    col:{
        marginHorizontal: 2, 
        backgroundColor: 'white', 
        shadowColor: "#000000",
        justifyContent:'center',
        alignItems:'center',
        alignContent:'center',
        width:115,
        
shadowOffset: {
	width: 1,
	height: 5,
},
shadowOpacity: 0.54,
shadowRadius: 1.27,

elevation: 5,
       },

    Icon:{
        fontSize: 79, 
        textAlign: "center", 
        shadowColor:'black',
        shadowOpacity:3,
        
        
    },

    Text:{
        fontSize: 20, 
        textAlign: "center",
    }


})



