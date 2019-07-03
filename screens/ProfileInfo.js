import React, { Component } from 'react'
import { Card, Icon,Button, } from 'react-native-elements';
import {
  Image,
  ImageBackground,
  Linking,
  ListView,
  Platform,
  ScrollView,
  StyleSheet,
  FlatList,
  Text,
  View,
  Alert,
  AsyncStorage,
  TouchableOpacity
} from 'react-native'
import PropTypes from 'prop-types'

import mainColor from './constants'

import Email from './Email'
import Separator from './Separator'
import Tel from './Tel'
import { TextInput } from 'react-native-gesture-handler/GestureHandler';
import { Col, Row, Grid } from "react-native-easy-grid";
import Modal from 'react-native-modal';
import DatePicker from 'react-native-datepicker'
import {Font,ImagePicker, Permissions, Constants} from 'expo'
import axios from 'axios';



export default class Contact extends React.Component {
constructor(){
  super();

    this.state={
      name: 'Enter Name',
      email: 'emailid',
      password: 'password',
      phoneNo : 'Enter Phone Number',
      gender: 'Enter gender',
      dob: 'dob',


      // phoneNo:'Add phone no.',
      // email:'Add email info',
      // gender:"Add gender Info",
      // dob:"Add Date of Birth",
      // address:"Add Adderss",
      visibleModal:null,
      visibleModal2:null,
      visibleModal3:null,
      visibleModal4:null,
       image:'https://cdn1.iconfinder.com/data/icons/avatar-flat-1/512/10-512.png',

    }

  }



  static propTypes = {
    avatar: PropTypes.string.isRequired,
    avatarBackground: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    address: PropTypes.shape({
      city: PropTypes.string.isRequired,
      country: PropTypes.string.isRequired,
    }).isRequired,
    emails: PropTypes.arrayOf(
      PropTypes.shape({
        email: PropTypes.string.isRequired,
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
      })
    ).isRequired,
    tels: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        number: PropTypes.string.isRequired,
      })
    ).isRequired,
  }

  /*state = {
    telDS: new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
    }).cloneWithRows(this.props.tels),
    emailDS: new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
    }).cloneWithRows(this.props.emails),
  }*/

  //for updating the records in the MongoDb if the user updates his profile
onP =async()=>{

//this.setState({ visibleModal3: null });

const userid = await AsyncStorage.getItem('UserDbId');

  axios.patch('http://192.168.1.124:3000/users/'+userid,this.state, {
    headers: {
        'Content-Type': 'application/json'
    }
}).then(response => {
    console.log(response.data);

}).catch(error => {
    console.log(error);
})

}

  onPressPlace = () => {
    Alert.alert("A-6 Namaskar Apartments, Vakola, Santacruz East")
  }

  onPressTel = number => {
    Linking.openURL(`tel://${number}`).catch(err => console.log('Error:', err))
  }

  onPressSms = () => {
    console.log('sms')
  }

  onPressEmail = email => {
    Linking.openURL(`mailto:${email}?subject=subject&body=body`).catch(err =>
      console.log('Error:', err)
    )
  }

async componentDidMount(){

  await Font.loadAsync({
   'ChunkFive':require('../assets/fonts/Chunkfive.otf'),
   'Lora':require('../assets/fonts/Lora.ttf'),

  });
  this.setState({ fontLoaded: true });
  const number=await AsyncStorage.getItem('number');    //for getting status phone.no from signup page
  const check=await AsyncStorage.getItem('check');
  const profileDp=await AsyncStorage.getItem('photo'); //for getting profileimage set in loginscreen
  const photocheck=await AsyncStorage.getItem('photocheck');
  const reload=await AsyncStorage.getItem('reload')

  if(check !=='1'){
    this.setState({phoneNo:number})

  }

  if(photocheck !=='1'){
    this.setState({image:profileDp})
  }

 if(photocheck=='1' && reload=='1'){
   this.setState({image:profileDp})
 }

  this.getPermissionAsync();
}

state = {
  fontLoaded: false,
  };

  renderHeader = () => {
    const {
      avatar,
      avatarBackground,
      name,
      address: { city, country },
    } = this.props





    return (
      <View style={styles.headerContainer}>
        <ImageBackground
          style={styles.headerBackgroundImage}
          blurRadius={10}
          source={{
            uri: "https://orig00.deviantart.net/dcd7/f/2014/027/2/0/mountain_background_by_pukahuna-d73zlo5.png",
          }}
        >
          <View style={styles.headerColumn}>
            <Image
              style={styles.userImage}
              source={{
             //  uri:global.PhotoVar,
                  uri:this.state.image
              }}
            />
            <TouchableOpacity style={{top:-23}} onPress={()=>this._pickImage()}>
            <Icon  type='Ionicons' name='camera-alt'/>
            </TouchableOpacity>
       <Text style={styles.userNameText}>{global.SampleVar}</Text>
            <View style={styles.userAddressRow}>
              <View>
                <Icon
                  name="place"
                  underlayColor="transparent"
                  iconStyle={styles.placeIcon}
                  onPress={this.onPressPlace}
                />
              </View>
              <View style={styles.userCityRow}>
                <Text style={styles.userCityText}>
                  {city}, {country}
                </Text>
              </View>
            </View>
          </View>
        </ImageBackground>
   <Grid>
     <Row>
       <Col>
        <View>
      {this.state.fontLoaded ? (    <Text style={styles.label}>Phone.No:</Text>):null}
      {this.state.fontLoaded ? (     <Text  style={styles.label}>Email-id</Text>):null}
       {this.state.fontLoaded ? (    <Text style={styles.label}>gender</Text>):null}
        {this.state.fontLoaded ? (   <Text  style={styles.label}>DOB</Text>):null}

        </View>
        </Col>

       <Col style={{width:150,left:20}}>
         <View>
         {this.state.fontLoaded ? (   <Text style={styles.input} >{this.state.phoneNo}</Text>):null}
      {this.state.fontLoaded ? (      <Text style={styles.input} >{this.state.email}</Text>):null}
        {this.state.fontLoaded ? (    <Text style={styles.input} >{this.state.gender}</Text>):null}
          {this.state.fontLoaded ? (  <Text style={styles.input} >{this.state.dob}</Text>):null}
        </View>
        </Col>
          <Col style={{left:30}}>
         <Icon iconStyle={styles.editIcons} color="#afadac" size={20} onPress={() => this.setState({ visibleModal: 'fancy' })}  type="Ionicons" name="create"/>
         <Icon  iconStyle={styles.editIcons} color="#afadac" size={20} onPress={() => this.setState({ visibleModal2: 'fancy' })}  type="Ionicons" name="create"/>
         <Icon  iconStyle={styles.editIcons} color="#afadac" size={20} onPress={() => this.setState({ visibleModal3: 'fancy' })}  type="Ionicons" name="create"/>
         <Icon  iconStyle={styles.editIcons} color="#afadac" size={20} onPress={() => this.setState({ visibleModal4: 'fancy' })}  type="Ionicons" name="create"/>
          </Col>
        </Row>
    </Grid>


      </View>
    )
  }

  /*renderTel = () => (
    <ListView
      contentContainerStyle={styles.telContainer}
      dataSource={this.state.telDS}
      renderRow={({ id, name, number }, _, k) => {
        return (
          <Tel
            key={`tel-${id}`}
            index={k}
            name={name}
            number={number}
            onPressSms={this.onPressSms}
            onPressTel={this.onPressTel}
          />
        )
      }}
    />
  )*/

 /* renderEmail = () => (
    <ListView
      contentContainerStyle={styles.emailContainer}
      dataSource={this.state.emailDS}
      renderRow={({ email, id, name }, _, k) => {
        return (
          <Email
            key={`email-${id}`}
            index={k}
            name={name}
            email={email}
            onPressEmail={this.onPressEmail}
          />
        )
      }}
    />
  )*/

  renderModalPhone = () => (                      //content inside the Modal
    <View style={styles.content}>
    <TextInput keyboardType='numeric' textContentType='telephoneNumber' style={{paddingBottom:10}} autoFocus={true} placeholder="Enter New number"  onChangeText={(phoneNo)=>this.setState({phoneNo})} />

      <Button type='solid' title="Change" raised={true} onPress={this.phoneNoChanged}/>
    </View>
  );

  phoneNoChanged=async()=>{                       //created a new function for handling asyncstorage
    this.setState({visibleModal:null});

    await AsyncStorage.setItem('check','1');     //for removing the phoneno. set during signup..after this refer to componentdidmount in this page
  }

  renderModalEmail = () => (                      //content inside the Modal
    <View style={styles.content}>
    <TextInput keyboardType='email-address' style={{paddingBottom:10}} autoFocus={true} placeholder="Enter Email"  onChangeText={(email)=>this.setState({email})} />

      <Button type='solid' title="Change" raised={true} onPress={() => this.setState({ visibleModal2: null })}/>
    </View>
  );

  renderModalgender = () => (                      //content inside the Modal
    <View style={styles.content}>
    <TextInput style={{paddingBottom:10}} autoFocus={true} placeholder="Enter gender"  onChangeText={(gender)=>this.setState({gender})} />

      <Button type='solid' title="Change" raised={true} onPress={() => this.setState({ visibleModal3: null })}/>
    </View>
  );


  getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    }
  }

  _pickImage = async () => {
    //await AsyncStorage.setItem('photocheck','1')   //for removing image set by social login(Fb,gmail)
    await AsyncStorage.setItem('reload','1')          //for maintaining profile image after changing Proimage and after reloading the screen when logged in via normal mode
    result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,

      aspect: [4, 3],
    });


    if (!result.cancelled) {
      this.setState({ image: result.uri });
    //  global.PhotoVar=this.state.image
      await AsyncStorage.setItem('photo',result.uri) //storing newly selected image in photovar


    }
    else{
     // this.setState({image:'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/480px-No_image_available.svg.png'})
    }
  }


  renderModaldob= () => (                      //content inside the Modal
    <View style={styles.content}>
      <DatePicker
        style={{width: 200}}
        date=""
        mode="date"
        placeholder="select date"
        format="MMMM Do YYYY"
        minDate="1998-01-01"
        maxDate="2025-06-01"
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        showIcon={false}
        customStyles={{

          dateInput: {

            borderWidth:0
          }
          // ... You can check the source to find the other keys.
        }}
        onDateChange={(dob) => {this.setState({dob: dob})}}
      />

      <Button type='solid' title="Change" raised={true} onPress={() => this.setState({ visibleModal4: null })}/>
    </View>
  );

  render() {
    return (
      <ScrollView style={styles.scroll}>
        <View style={styles.container}>
          <Card containerStyle={styles.cardContainer}>
            {this.renderHeader()}

            {Separator()}

          </Card>

        </View>

        <Modal
          isVisible={this.state.visibleModal === 'fancy'}
          backdropColor="#B4B3DB"
          backdropOpacity={0.8}
          animationIn="zoomInDown"
          animationOut="zoomOutUp"
          animationInTiming={600}
          animationOutTiming={600}
          backdropTransitionInTiming={600}
          backdropTransitionOutTiming={600}
        >
          {this.renderModalPhone()}
        </Modal>

        <Modal
          isVisible={this.state.visibleModal2 === 'fancy'}
          backdropColor="#B4B3DB"
          backdropOpacity={0.8}
          animationIn="zoomInDown"
          animationOut="zoomOutUp"
          animationInTiming={600}
          animationOutTiming={600}
          backdropTransitionInTiming={600}
          backdropTransitionOutTiming={600}
        >
          {this.renderModalEmail()}
        </Modal>

        <Modal
          isVisible={this.state.visibleModal3 === 'fancy'}
          backdropColor="#B4B3DB"
          backdropOpacity={0.8}
          animationIn="zoomInDown"
          animationOut="zoomOutUp"
          animationInTiming={600}
          animationOutTiming={600}
          backdropTransitionInTiming={600}
          backdropTransitionOutTiming={600}
        >
          {this.renderModalgender()}
        </Modal>

        <Modal
          isVisible={this.state.visibleModal4 === 'fancy'}
          backdropColor="#B4B3DB"
          backdropOpacity={0.8}
          animationIn="zoomInDown"
          animationOut="zoomOutUp"
          animationInTiming={600}
          animationOutTiming={600}
          backdropTransitionInTiming={600}
          backdropTransitionOutTiming={600}
        >
          {this.renderModaldob()}
        </Modal>

        <View>

          <Button type='solid' title="Change" raised={true} onPress={this.onP}/>
        </View>
      </ScrollView>


    )
  }
}

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#FFF',
    borderWidth: 0,
    flex: 1,
    margin: 0,
    padding: 0,
  },
  container: {
    flex: 1,
  },
  emailContainer: {
    backgroundColor: '#FFF',
    flex: 1,
    paddingTop: 30,
  },
  headerBackgroundImage: {
    paddingBottom: 20,
    paddingTop: 35,
  },
  headerContainer: {},
  headerColumn: {
    height:245,
    backgroundColor: 'transparent',
    ...Platform.select({
      ios: {
        alignItems: 'center',
        elevation: 1,
        marginTop: -1,
      },
      android: {
        alignItems: 'center',
      },
    }),
  },
  placeIcon: {
    color: 'white',
    fontSize: 26,
  },
  scroll: {
    backgroundColor: '#FFF',
  },
  telContainer: {
    backgroundColor: '#FFF',
    flex: 1,
    paddingTop: 30,
  },
  userAddressRow: {
    alignItems: 'center',
    flexDirection: 'row',
    top:-12
  },
  userCityRow: {
    backgroundColor: 'transparent',
  },
  userCityText: {
    color: '#A5A5A5',
    fontSize: 15,
    fontWeight: '600',
    textAlign: 'center',
  },
  userImage: {
    borderColor: mainColor,
    borderRadius: 85,
    borderWidth: 3,
    height: 170,
    marginBottom: 15,
    width: 170,
  },
  userNameText: {
    color: '#FFF',
    fontSize: 22,
    fontWeight: 'bold',
    paddingBottom: 8,
    textAlign: 'center',
    top:-12,
  },

  label:{
    marginVertical:15,
    paddingLeft:18,
    fontSize:17,
    fontFamily:"ChunkFive"
  },

  input:{
    marginVertical:15,
    fontSize:16,
    fontFamily:"Lora"
  },

 editIcons: {
  marginVertical:16,
  },

  content: {
    backgroundColor: 'white',
    padding: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
})
