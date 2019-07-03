import React, { Component } from 'react';
import { Container, Header, Content, Form, Item, Input, Label, View,Icon, Picker, Button, Left, Body, Right, Title } from 'native-base';
import { Image, Text, TouchableOpacity, TouchableWithoutFeedback, TextInput, StyleSheet,AsyncStorage, ImageBackground } from 'react-native';
import TimePicker from 'react-native-simple-time-picker';
import GradientButton from 'react-native-gradient-buttons';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import KeyboardShift from './KeyboardShift.js';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons'
import { createStackNavigator, createAppContainer } from 'react-navigation';
import axios from 'axios'
import DatePicker from 'react-native-datepicker'

export default class App extends React.Component {

    render() {
        return <Root />;
    }

}



class onTopAddress extends React.Component {
    state = {
        text: 'search',

    }
    render() {



        return (

            <Container>
                <Header />

                <Content>
                    <Form rounded>

                        <Item  >




                            <GooglePlacesAutocomplete

                                placeholder={this.state.text}
                                minLength={2} // minimum length of text to search
                                autoFocus={true}
                                returnKeyType={'search'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
                                listViewDisplayed='auto'    // true/false/undefined
                                fetchDetails={true}
                                renderDescription={(row) => row.description || row.vicinity}// custom description render
                                onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
                                    console.log("area is:", data, details);
                                    this.props.navigation.state.params.returnData(details.formatted_address);
                                    this.props.navigation.goBack();


                                }}

                                getDefaultValue={() => ''}

                                query={{
                                    // available options: https://developers.google.com/places/web-service/autocomplete
                                    key: 'AIzaSyCPOxFqOXVA_7iAG0ffV0-V1rghQaF0t8M',
                                    language: 'en', // language of the results
                                    // default: 'geocode'
                                }}


                                styles={{
                                    textInputContainer: {
                                        width: '100%'
                                    },
                                    description: {
                                        fontWeight: 'bold'
                                    },
                                    predefinedPlacesDescription: {
                                        color: '#1faadb'
                                    }
                                }}
                                currentLocation={true} // Will add a 'Current location' button at the top of the predefined places list
                                currentLocationLabel="Current location"
                                nearbyPlacesAPI='GooglePlacesSearch' // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
                                GoogleReverseGeocodingQuery={{
                                    // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
                                }}
                                GooglePlacesSearchQuery={{
                                    // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
                                    rankby: 'distance',
                                    type: 'cafe'
                                }}

                                GooglePlacesDetailsQuery={{
                                    // available options for GooglePlacesDetails API : https://developers.google.com/places/web-service/details
                                    fields: 'formatted_address',
                                }}

                                filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities



                                debounce={200} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.
                                renderLeftButton={() => <Image style={{ height: 10, width: 10, top: 250 }} source={require('../images/lefticon.png')} />}
                                renderRightButton={() => <Text style={{ top: 250 }}>Custom text after the input</Text>}
                            />

                        </Item>
                    </Form>
                </Content>
            </Container>

        );

    }


}


class FormNewEvent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            out1: "", 
            createdBy:global.ID,
            chosenDate:'',          //variable for chosen date
            selectedHours: '',               //variable for start time (hours)
            selectedMinutes: 12,             //variable for start time(mins)
            selectedHours2:'',               //variable for end time (hours)
            selectedMinutes2: 12,             //variable for end time (mins)
            textValue: 'Event Address', 
            text: "",                        //variable for person1 name
             text1: "",                      //variable for person1 surname
             text2: "",                      //variable for person2 name
             text3: "",                      //variable for person2 surname
             text4: ''                       //variable for event name
        };

       

    }


    change = () => {                                                          ///Form validation
        if (this.state.text.trim() === "") {
            this.setState(() => ({ nameError: "  (required)" }));
        }
        else {
            this.setState(() => ({ nameError: '' }));
         //   this.textInput1.setNativeProps({ text: '' });

        /*    this.setState({                  //for clearing textinput after login click
                text: ''
            })*/
        }



        if (this.state.text1.trim() === "") {
            this.setState(() => ({ nameError1: "  (required)" }));
        }

        else {
            this.setState(() => ({ nameError1: '' }));
        //    this.textInput2.setNativeProps({ text: '' });
          /*  this.setState({                  //for clearing textinput after login click
                text1: ''
            })*/
        }

        if (this.state.text2.trim() === "") {
            this.setState(() => ({ nameError2: "  (required)" }));
        }
        else {
            this.setState(() => ({ nameError2: '' }));
          //  this.textInput3.setNativeProps({ text: '' });
           /* this.setState({
                text2: ''
            }) */
        }

        if (this.state.text3.trim() === "") {
            this.setState(() => ({ nameError3: "  (required)" }));
        }
        else {
            this.setState(() => ({ nameError3: '' }));
         //   this.textInput4.setNativeProps({ text: '' });
           /*   this.setState({
                text3: ''
            }) */
        }

        if (this.state.text4.trim() === "") {
            this.setState(() => ({ nameError4: "  (required)" }));
        }
        else {
            this.setState(() => ({ nameError4: '', }));
      //      this.textInput5.setNativeProps({ text: '' });
          /*    this.setState({
                text4: ''
            })*/

        }

 //the below if function is for performing action when all fields are properly entered
        if(this.state.text !=='' && this.state.text1 !=='' && this.state.text2 !=='' && this.state.text3 !=='' && this.state.text4 !==''){

            axios.post('http://192.168.0.102:3000/events/aniversary/',this.state,{
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => {
            console.log(response.data);
            this.props.navigation.navigate('HomeScreen');
        }).catch(error => {
            console.log(error);
        }) 
        }
    }

  



    onPress = () => {
        this.setState({
            textValue: 'The Venue is not yet decided'
        })
    }

    onPress1 = () => {
        this.setState({
            textValue: 'Venue:'
        })
    }


    addressfieldchange = () => {
        this.props.navigation.navigate("AddressScreen", { returnData: this.returnData.bind(this) })

    }

    returnData(output) {                                   //for retrieving address from child to parentscreen
        this.setState({ output: output });
    }


    render() {
      
       
    //    const response = await AsyncStorage.getItem('response');  //response variable from loginscreen is obtained

        return (

            //keyboard doesn't hide textinput
            <Container>
                <Header>
                    <Left>
                        <Button transparent>
                            <Icon name='arrow-back' />
                        </Button>
                    </Left>
                    <Body>
                        <Text style={{color:'white',fontSize:20,fontWeight:'bold',left:-60}}>Host Anniversary Party</Text>
                    </Body>
                    
                </Header>

                <Content style={{backgroundColor:'#FCCF1B'}}>
                
                    <Form rounded>
                
                        <View style={styles.col}>
                        <View rounded style={{width: '100%', height: 154, backgroundColor: '#ffffff',marginTop:10,borderRadius:10,opacity:.9}}>
                            <View style={{ flexDirection: "row", left: 7, top: 4 }}>
                                <View style={{ flex: 1 }}>
                                    <Item floatingLabel style={{ justifyContent: 'flex-start', width: 160 }}  >
                                        <Label style={{ opacity: 0.7 }}>Name*</Label>
                                        <Input   ref={component => this.textInput1 = component}   onChangeText={text => this.setState({ text })} value={this.state.text} />
                                        {!!this.state.nameError && (<Label style={{ color: "red", fontSize: 10 }}>{this.state.nameError}</Label>)}
                                    </Item>
                                </View>

                                <View style={{ flex: 1 }}>
                                    <Item floatingLabel style={{ justifyContent: 'flex-end', width: 160 }} >
                                        <Label style={{ opacity: 0.7 }}>Surname*</Label>
                                        <Input ref={component => this.textInput2 = component}  onChangeText={text1 => this.setState({ text1 })} value={this.state.text1} />
                                        {!!this.state.nameError1 && (<Label style={{ color: "red", fontSize: 10 }}>{this.state.nameError1}</Label>)}

                                    </Item>
                                </View>

                            </View>
                            <Image source={require('../images/rings.png')} style={{width:18,height:18,left:170,top:17}}  />

                            <View style={{ flexDirection: "row", height: 71, top: 14, left: 7 }}>
                                <View style={{ flex: 1 }}>
                                    <Item floatingLabel style={{ justifyContent: 'flex-start', width: 160 }}  >
                                        <Label style={{ opacity: 0.7 }}>Partner's Name*</Label>
                                        <Input ref={component => this.textInput3 = component} onChangeText={text2 => this.setState({ text2 })} value={this.state.text2} />
                                        {!!this.state.nameError2 && (<Label style={{ color: "red", fontSize: 10 }}>{this.state.nameError2}</Label>)}
                                    </Item>
                                </View>

                                <View style={{ flex: 1 }}>

                                    <Item floatingLabel style={{ justifyContent: 'flex-end', width: 163 }} >
                                        <Label style={{ opacity: 0.7 }}>Partner's Surname*</Label>
                                        <Input ref={component => this.textInput4 = component} onChangeText={text3 => this.setState({ text3 })} value={this.state.text3} />
                                        {!!this.state.nameError3 && (<Label style={{ color: "red", fontSize: 10 }}>{this.state.nameError3}</Label>)}
                                    </Item>
                                </View>

                            </View>
                            </View>
                            
                            {/*For Event Name*/}
                            <View rounded style={{width: '100%', height: 60, backgroundColor: '#ffffff',borderRadius:10,marginTop:10,opacity:.9}}>
                            <Item floatingLabel style={{ top: -5,left:15, marginRight:30, marginTop:10}}  >
                                <Label style={{ opacity: 0.7, left: -5 }}>Event Name*</Label>
                                <Input ref={component => this.textInput5 = component} onChangeText={text4 => this.setState({ text4 })} value={this.state.text4} />
                                {!!this.state.nameError4 && (<Label style={{ color: "red", fontSize: 10 }}>{this.state.nameError4}</Label>)}
                            </Item>
                            </View>

                            {/*For Event date*/}
                            <View rounded style={{width: '100%', height: 60, backgroundColor: '#ffffff',borderRadius:10,marginTop:10,opacity:.9}}>
                            <Item style={{ width: 140, marginTop: 7 ,marginLeft:5}}>
                            <Icons style={{ fontSize: 20 ,marginLeft:3}} name="calendar" type='MaterialCommunityIcons' />
                            <DatePicker
                                style={{width: 200}}
                                date={this.state.chosenDate}
                                mode="date"
                                placeholder="select date"
                                format="MMMM Do YYYY"
                                minDate="2019-01-01"
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
                                onDateChange={(chosenDate) => {this.setState({chosenDate: chosenDate})}}
                                />
                            </Item>
                            </View>

                            {/*For Event timinig*/}
                            <View style={{ flexDirection: "row", left: 5, paddingTop: 5 ,marginRight:10}}>
                            <View rounded style={{width: '50%', height: 100, backgroundColor: '#ffffff',borderRadius:10,marginTop:10,marginRight:1,marginLeft:0,opacity:.9}}>
                                <View style={{ flex: 1 }}>
                                    <Text style={{ opacity: 0.5 ,textAlign:"center"}} >Start Time(Hr:Min)</Text>

                                    <Item style={{ justifyContent: 'flex-start', width: 170 }}>

                                    <DatePicker
                                        style={{width: 200}}
                                        date={this.state.selectedHours}
                                        mode="time"
                                        placeholder="select time"
                                        format='LT'
                                        confirmBtnText="Confirm"
                                        cancelBtnText="Cancel"
                                        showIcon={false}
                                        is24Hour={false}
                                        customStyles={{
                                        
                                        dateInput: {
                                        
                                            borderWidth:0
                                        }
                                        // ... You can check the source to find the other keys.
                                        }}
                                        onDateChange={(selectedHours) => {this.setState({selectedHours: selectedHours})}}
                                    />
                                    </Item>
                                </View>
                            </View>

                            <View rounded style={{width: '50%', height: 100, backgroundColor: '#ffffff',borderRadius:10,marginTop:10,marginLeft:1,opacity:.9}}>
                                <View style={{ flex: 1 }}>
                                    <Text style={{ opacity: 0.5,textAlign:"center" }} >End Time(Hr:Min)</Text>
                                    <Item style={{ width: 170, justifyContent: 'flex-end' }}>
                                    <DatePicker
                                        style={{width: 200}}
                                        date={this.state.selectedHours2}
                                        mode="time"
                                        placeholder="select time"
                                        format='LT'
                                        confirmBtnText="Confirm"
                                        cancelBtnText="Cancel"
                                        showIcon={false}
                                        is24Hour={false}
                                        customStyles={{
                                        
                                        dateInput: {
                                        
                                            borderWidth:0
                                        }
                                        // ... You can check the source to find the other keys.
                                        }}
                                        onDateChange={(selectedHours2) => {this.setState({selectedHours2:selectedHours2})}}
                                    />
                                    </Item>
                                </View>
                                </View>
                            </View>
 
                           {/* event address*/}
                        <View rounded style={{width: '100%', height: 60, backgroundColor: '#ffffff',borderRadius:10,marginTop:10,marginLeft:1,opacity:.9}}>
                            <Item floatingLabel style={{ top: -5 ,marginLeft:3}}  >
                                <Label style={{marginLeft:5}} >{this.state.textValue}</Label>
                                <Input onFocus={this.addressfieldchange} value={this.state.output} />
                            </Item>
                           
                        </View>

                           {/*Button to decide or not-decide event 
                          
                            <Button style={{ left: '50%' ,alignItems:"center",marginRight:'50%',width:100}} onPress={this.onPress} bordered rounded danger impact impactStyle='Dark'>
                                <Text style={{ padding: 5, fontSize: 12, justifyContent:"center",textAlign:"center" }}>Not Decided</Text>
                            </Button>

                            <Button style={{ left: 210, top: -45, width:100}} onPress={this.onPress1} bordered rounded danger>
                                <Text style={{ padding: 7, fontSize: 12 ,justifyContent:"center",textAlign:"center",marginLeft:10}}>Decided</Text>
                           </Button>*/}
                          
                    
                            <GradientButton style={{ width: 170, height: 40, fontSize: 2, left: 77 ,marginTop:10,marginBottom:10}} onPressAction={this.change} textStyle={{ fontSize: 18 }} text="Submit" width='90%' violetPink impact
                                impactStyle='Light' />
                        </View>
                    </Form>
              
                </Content>

            </Container>



        );
    }
}


const StackNavigator = createStackNavigator({
    MainScreen: {
        screen: FormNewEvent,
        navigationOptions: { header: null }
    },

    AddressScreen: {
        screen: onTopAddress,
        navigationOptions: { header: null }
    },





}, {
        initialRouteName: "MainScreen"
    })

const Root = createAppContainer(StackNavigator)

const styles = StyleSheet.create({

    col: {
        marginTop: 10,
        borderRadius: 10,
        marginHorizontal: 4,
        textAlign:'center',
        justifyContent:'center',
        display:'flex',
        backgroundColor: 'rgba(221,221,221,0.6)',
        shadowColor: "#000000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 100.36,
        shadowRadius: 6.68,

        elevation: 500000000,
    },
})
