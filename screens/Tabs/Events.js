import React from 'react';
import { StyleSheet, TouchableOpacity, TouchableHighlight, Text, View, Image,ScrollView,AsyncStorage } from 'react-native';
import { Card } from 'react-native-elements';
import MapView from 'react-native-maps';
import axios from 'axios';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { createTabNavigator } from 'react-navigation';
import ActionButton from 'react-native-action-button';
import { Font } from 'expo';
import { Col, Grid, Row } from "react-native-easy-grid";


export default class Event extends React.Component {
  constructor() {
    super();
    this.state = {
      ready: false,
      error: null,
      longitude: 0,
      latitude: 0,
      events: [],
      birthdays: [],
      meetups: [],
      weddings:[],
      offices:[]
    }




  }

  state = {
    fontLoaded: false,

  };

  async componentDidMount() {

    await Font.loadAsync({
      'JosefinSans': require('../../assets/fonts/JosefinSans.ttf'),
      'Lobster': require('../../assets/fonts/Lobster.otf'),
    });

    this.setState({ fontLoaded: true });
     global.ID = await AsyncStorage.getItem('UserDbId');
     global.photoVar2=global.PhotoVar;
     if (global.photoVar2 == null){
       global.photoVar2='https://cdn1.iconfinder.com/data/icons/avatar-flat-1/512/10-512.png'
     }
     
    axios.get('http://192.168.0.102:3000/events/all/' + global.ID, {
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(response => {
      this.setState({ events: response.data.aniversaries })
      this.setState({ birthdays: response.data.birthdays })
      this.setState({ weddings: response.data.weddings })
      this.setState({ offices: response.data.offices })
      this.setState({ meetups: response.data.meetups })
     console.log(response.data);
      console.log('no error');


      // console.log(response);
    }).catch(error => {
      console.log(error);
      console.log('there is error')
    })




  }



  static navigationOptions = {
    tabBarIcon: ({ tintColor }) => (
      <Icon size={25} name="cake-variant" style={{ color: tintColor }} />
    ),
  }

  render() {
    move =(item)=>{
      console.log('mocha');
      this.props.navigation.navigate('EventsDetails',{eventname:item.title,eventaddress:item.address,eventdate:item.date.toString().substr(0,15),eventtime:item.startTimehr})
    }
    return (
      <View>
      <ScrollView>
        <View>{this.state.events.map(function (item, index) {
            state = {
              fontLoaded: true,
          
            };

            

          return (<View key={index} style={{top:-40}}>
            <View >
             <View style={{ position: 'absolute', zIndex: 5 }} >
                <Image source={require("../../images/handshold.jpg")} style={{ top: 60, left: 78, height: 80, width: 230, borderRadius: 7, }} />
              </View>
            <View style={{ zIndex: 3, alignItems: 'center' }}>
           <Card containerStyle={[styles.cardStyle, { top: 90, width: 340,height:150, justifyContent: 'center',marginBottom:50 }]}>
           <TouchableHighlight onPress={()=>this.move(item)}
                    style={[styles.profileImgContainer, { borderColor: '#424040', borderWidth: 1, top: -10, left: -16, }]}
                  >
                    <Image source={{uri:photoVar2}} style={styles.profileImg} />
                  </TouchableHighlight>

           <View style={{ left: 55 }}>
                  {this.state.fontLoaded ?(  <Text style={{fontFamily:'Lobster',fontSize:16}}>{item.title}</Text>):null}
                  {this.state.fontLoaded ?(  <Text style={{fontFamily:'JosefinSans'}}>{item.date.toString().substr(0,15)}</Text>):null}
                  {this.state.fontLoaded ?(   <Text style={{fontFamily:'JosefinSans',width:250}}>{item.address}</Text>):null}
                  </View>
                  <View style={{ alignItems: 'flex-end', top: -70 }}>
                  {this.state.fontLoaded ?( <Text style={{ color: 'red', fontSize: 11,fontFamily:'JosefinSans' }}>Wednesday</Text>):null}
                  </View>
                  </Card>
             </View>

            
             </View>

          </View>


          )
        })}</View>

<View>{this.state.birthdays.map(function (item, index) {
            state = {
              fontLoaded: true,
          
            };

          return (<View key={index} style={{top:-40}}>
            <View >
             <View style={{ position: 'absolute', zIndex: 5 }} >
                <Image source={require('../../images/Happybirthdaywallpaper.jpg')} style={{ top: 60, left: 78, height: 80, width: 230, borderRadius: 7, }} />
              </View>
            <View style={{ zIndex: 3, alignItems: 'center' }}>
           <Card containerStyle={[styles.cardStyle, { top: 90, width: 340,height:150, justifyContent: 'center',marginBottom:50 }]}>
           <TouchableHighlight 
                    style={[styles.profileImgContainer, { borderColor: '#424040', borderWidth: 1, top: -10, left: -16, }]}
                  >
                    <Image source={{uri:global.photoVar2}} style={styles.profileImg} />
                  </TouchableHighlight>

           <View style={{ left: 55 }}>
                  {this.state.fontLoaded ?(  <Text style={{fontFamily:'Lobster',fontSize:16}}>{item.name}</Text>):null}
                  {this.state.fontLoaded ?(  <Text style={{fontFamily:'JosefinSans'}}>{item.date.toString().substr(0,15)}</Text>):null}
                  {this.state.fontLoaded ?(   <Text style={{fontFamily:'JosefinSans',width:250}}>{item.address}</Text>):null}
                  </View>
                  <View style={{ alignItems: 'flex-end', top: -70 }}>
                  {this.state.fontLoaded ?( <Text style={{ color: 'red', fontSize: 11,fontFamily:'JosefinSans' }}>Wednesday</Text>):null}
                  </View>
                  </Card>
             </View>

            
             </View>

          </View>


          )
        })}</View>

<View>{this.state.weddings.map(function (item, index) {
            state = {
              fontLoaded: true,
          
            };

          return (<View key={index} style={{top:-40}}>
            <View >
             <View style={{ position: 'absolute', zIndex: 5 }} >
                <Image source={require("../../images/handshold.jpg")} style={{ top: 60, left: 78, height: 80, width: 230, borderRadius: 7, }} />
              </View>
            <View style={{ zIndex: 3, alignItems: 'center' }}>
           <Card containerStyle={[styles.cardStyle, { top: 90, width: 340,height:150, justifyContent: 'center',marginBottom:50 }]}>
           <TouchableHighlight
                    style={[styles.profileImgContainer, { borderColor: '#424040', borderWidth: 1, top: -10, left: -16, }]}
                  >
                    <Image source={{uri:global.photoVar2}} style={styles.profileImg} />
                  </TouchableHighlight>

           <View style={{ left: 55 }}>
                  {this.state.fontLoaded ?(  <Text style={{fontFamily:'Lobster',fontSize:16}}>{item.title}</Text>):null}
                  {this.state.fontLoaded ?(  <Text style={{fontFamily:'JosefinSans'}}>{item.date.toString().substr(0,15)}</Text>):null}
                  {this.state.fontLoaded ?(   <Text style={{fontFamily:'JosefinSans',width:250}}>{item.address}</Text>):null}
                  </View>
                  <View style={{ alignItems: 'flex-end', top: -70 }}>
                  {this.state.fontLoaded ?( <Text style={{ color: 'red', fontSize: 11,fontFamily:'JosefinSans' }}>Wednesday</Text>):null}
                  </View>
                  </Card>
             </View>

            
             </View>

          </View>


          )
        })}</View>

<View>{this.state.meetups.map(function (item, index) {
            state = {
              fontLoaded: true,
          
            };

          return (<View key={index} style={{top:-40}}>
            <View >
             <View style={{ position: 'absolute', zIndex: 5 }} >
                <Image source={require("../../images/handshold.jpg")} style={{ top: 60, left: 78, height: 80, width: 230, borderRadius: 7, }} />
              </View>
            <View style={{ zIndex: 3, alignItems: 'center' }}>
           <Card containerStyle={[styles.cardStyle, { top: 90, width: 340,height:150, justifyContent: 'center',marginBottom:50 }]}>
           <TouchableHighlight
                    style={[styles.profileImgContainer, { borderColor: '#424040', borderWidth: 1, top: -10, left: -16, }]}
                  >
                    <Image source={{uri:global.photoVar2}} style={styles.profileImg} />
                  </TouchableHighlight>

           <View style={{ left: 55 }}>
                  {this.state.fontLoaded ?(  <Text style={{fontFamily:'Lobster',fontSize:16}}>{item.title}</Text>):null}
                  {this.state.fontLoaded ?(  <Text style={{fontFamily:'JosefinSans'}}>{item.date.toString().substr(0,15)}</Text>):null}
                  {this.state.fontLoaded ?(   <Text style={{fontFamily:'JosefinSans',width:250}}>{item.address}</Text>):null}
                  </View>
                  <View style={{ alignItems: 'flex-end', top: -70 }}>
                  {this.state.fontLoaded ?( <Text style={{ color: 'red', fontSize: 11,fontFamily:'JosefinSans' }}>Wednesday</Text>):null}
                  </View>
                  </Card>
             </View>

            
             </View>

          </View>


          )
        })}</View>

<View>{this.state.offices.map(function (item, index) {
            state = {
              fontLoaded: true,
          
            };

          return (<View key={index} style={{top:-40}}>
            <View >
             <View style={{ position: 'absolute', zIndex: 5 }} >
                <Image source={require("../../images/handshold.jpg")} style={{ top: 60, left: 78, height: 80, width: 230, borderRadius: 7, }} />
              </View>
            <View style={{ zIndex: 3, alignItems: 'center' }}>
           <Card containerStyle={[styles.cardStyle, { top: 90, width: 340,height:150, justifyContent: 'center',marginBottom:50 }]}>
           <TouchableHighlight
                    style={[styles.profileImgContainer, { borderColor: '#424040', borderWidth: 1, top: -10, left: -16, }]}
                  >
                    <Image source={{uri:global.photoVar2}} style={styles.profileImg} />
                  </TouchableHighlight>

           <View style={{ left: 55 }}>
                  {this.state.fontLoaded ?(  <Text style={{fontFamily:'Lobster',fontSize:16}}>{item.title}</Text>):null}
                  {this.state.fontLoaded ?(  <Text style={{fontFamily:'JosefinSans'}}>{item.date.toString().substr(0,15)}</Text>):null}
                  {this.state.fontLoaded ?(   <Text style={{fontFamily:'JosefinSans',width:250}}>{item.address}</Text>):null}
                  </View>
                  <View style={{ alignItems: 'flex-end', top: -70 }}>
                  {this.state.fontLoaded ?( <Text style={{ color: 'red', fontSize: 11,fontFamily:'JosefinSans' }}>Wednesday</Text>):null}
                  </View>
                  </Card>
             </View>

            
             </View>

          </View>


          )
        })}</View>



      </ScrollView>
      <ActionButton style={{ position: 'absolute',zIndex:8}}  buttonColor="rgba(231,76,60,1)">
      <ActionButton.Item buttonColor='#9b59b6' title="Host Event" onPress={() => this.props.navigation.navigate('CreateEventScreen')}>
        <Icon size={29} name="food-fork-drink" style={styles.actionButtonIcon} />
      </ActionButton.Item>
      <ActionButton.Item buttonColor='#3498db' title="Your Contacts" onPress={() => {}}>
        <Icon name="account-box-multiple"  style={styles.actionButtonIcon} />
      </ActionButton.Item>
      <ActionButton.Item buttonColor='#1abc9c' title="Scan to receive invit" onPress={() => {}}>
        <Icon name="qrcode-scan" style={styles.actionButtonIcon} />
      </ActionButton.Item>
    </ActionButton>
    </View>
      /*  <View style={{flex:1, backgroundColor: '#f3f3f3'}}>
       
  
          <View>
           <Grid   style={{ top: 80 }} >
              
          <Row  style={styles.card}>
          <Col size={1}>
            <TouchableHighlight
              style={[styles.profileImgContainer, { borderColor: 'green', borderWidth: 1 }]}
            >
              <Image source={require("../../images/intro2.png")} style={styles.profileImg} />
            </TouchableHighlight></Col>
          <Col style={{ left: 20 }} size={2}>
  
            <Image source={require('../../images/intro2.png')} style={{ height: 75, width: "100%", bottom: 50 }} />
          <Text style={{bottom:40}}>{item.title}</Text>
         <Text style={{bottom:40}}>Start at 9 pm</Text>
        <Text style={{bottom:40}}>At Event Place Jaipur</Text> 
          </Col>
  
  
          <Col size={1}>
          <Text style={{ fontWeight: 'bold',marginTop:40, color: 'red', textAlign:'center',alignItems:'center',fontSize: 12, textAlign: 'center', flexWrap: 'wrap' }}>
               31 December
  
                </Text>
            <Text style={{ fontSize: 10, textAlign: "center" }}>Sunday</Text>
          </Col>
         
          </Row>
        </Grid>
            
            
      <Grid style={{ top: 80 }} >
        <Row style={styles.card}>
          <Col size={1}>
            <TouchableHighlight
              style={[styles.profileImgContainer, { borderColor: 'green', borderWidth: 1 }]}
            >
              <Image source={require("../../images/intro2.png")} style={styles.profileImg} />
            </TouchableHighlight></Col>
          <Col style={{ left: 20 }} size={2}>
  
            <Image source={require('../../images/intro2.png')} style={{ height: 75, width: "100%", bottom: 50 }} />
          {  this.state.fontLoaded ? (<Text style={{bottom:40,fontFamily:'PlayfairDisplay-Regular'}}>fhfhffh</Text>) : null }
          {  this.state.fontLoaded ? (  <Text style={{bottom:40,fontFamily:'PlayfairDisplay-Regular'}}>Start at 9 pm</Text>) : null }
          {  this.state.fontLoaded ? (<Text style={{bottom:40,fontFamily:'PlayfairDisplay-Regular'}}>At Event Place Jaipur</Text> ) : null }
          </Col>
  
  
          <Col size={1}>
          <Text style={{ fontWeight: 'bold',marginTop:40, color: 'red', textAlign:'center',alignItems:'center',fontSize: 12, textAlign: 'center', flexWrap: 'wrap' }}>
               31 December
  
                </Text>
            <Text style={{ fontSize: 10, textAlign: "center" }}>Sunday</Text>
          </Col>
        </Row>
        </Grid>
        <Grid style={{ top: 300 }}>
        <Row style={styles.card} >
          <Col size={1}>
            <TouchableHighlight
              style={[styles.profileImgContainer, { borderColor: 'green', borderWidth: 1 }]}
            >
              <Image source={require("../../assets/gift.png")} style={styles.profileImg} />
            </TouchableHighlight></Col>
          <Col style={{ left: 20 }} size={2}>
  
            <Image source={require('../../images/wedding.png')} style={{ height: 75, width: "100%", bottom: 50 }} />
            {  this.state.fontLoaded ? ( <Text style={{bottom:40,fontFamily:'PlayfairDisplay-Regular'}}>Anjali Birthday Party</Text>) : null }
            {  this.state.fontLoaded ? (<Text style={{bottom:40,fontFamily:'PlayfairDisplay-Regular'}}>Start at 9 pm</Text>) : null }
              {  this.state.fontLoaded ? ( <Text style={{bottom:40,fontFamily:'PlayfairDisplay-Regular'}}>At Event Place Jaipur</Text>) : null }
          </Col>
          <Col  size={1}>
            <Text style={{ fontWeight: 'bold',marginTop:40, color: 'red', textAlign:'center',alignItems:'center',fontSize: 12, textAlign: 'center', flexWrap: 'wrap' }}>
              31 December
                </Text>
            <Text style={{ fontSize: 10, textAlign: "center",justifyContent:'center' }}>Sunday</Text>
          </Col>
        </Row>
  
       
      </Grid>
       */





      /* Rest of the app comes ABOVE the action button component !
      <ActionButton buttonColor="rgba(231,76,60,1)">
        <ActionButton.Item buttonColor='#9b59b6' title="Host Event" onPress={() => this.props.navigation.navigate('CreateEventScreen')}>
          <Icon size={29} name="food-fork-drink" style={styles.actionButtonIcon} />
        </ActionButton.Item>
        <ActionButton.Item buttonColor='#3498db' title="Your Contacts" onPress={() => {}}>
          <Icon name="account-box-multiple"  style={styles.actionButtonIcon} />
        </ActionButton.Item>
        <ActionButton.Item buttonColor='#1abc9c' title="Scan to receive invit" onPress={() => {}}>
          <Icon name="qrcode-scan" style={styles.actionButtonIcon} />
        </ActionButton.Item>
      </ActionButton>
      </View>*/


    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },

  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },

  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
    zIndex:5
  },

  card:
  {
    top: 10,
    marginHorizontal: 2,
    backgroundColor: 'white',
    shadowColor: "#000000",
    marginLeft: "2%",
    width: '96%',
    height: 150,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,

    elevation: 11,
    borderRadius: 10
  },
  profileImgContainer: {
    marginLeft: 8,
    height: 42,
    width: 42,
    borderRadius: 25,
    top: 10
  },
  profileImg: {
    height: 40,
    width: 40,
    borderRadius: 25,
  },

  cardStyle:{
    
   
   
    shadowColor: "#000000",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,
    
    elevation: 9,
    borderRadius:10
  }





})