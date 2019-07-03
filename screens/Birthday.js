import React, { Component } from 'react';
import { Container, Header, Content, Form, Item, Input, Label, View, Icon, Picker, Button, Left, Body, Right, Title, Toast } from 'native-base';
import { Image, Text, TouchableOpacity, TouchableWithoutFeedback, TextInput, StyleSheet } from 'react-native';
import TimePicker from 'react-native-simple-time-picker';
import GradientButton from 'react-native-gradient-buttons';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import KeyboardShift from './KeyboardShift.js';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons'
import { createStackNavigator, createAppContainer } from 'react-navigation';
import axios from 'axios';
import DatePicker from 'react-native-datepicker';


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


class BirthdayEvent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            createdBy:global.ID,
            output: "",
            chosenDate:'',selectedHours:'',
            selectedMinutes: 12, selectedHours2 :'' , selectedMinutes2:12, textValue: 'Event Address', text: "", text1: "", text2: "", text3: "", text4: '', textValue1: ''
        };

       

    }



    change = () => {                                                          ///Form validation
        if (this.state.text.trim() === "") {
            this.setState(() => ({ nameError: "  (required)" }));
        }
        else {
            this.setState(() => ({ nameError: '' }));
        }



        if (this.state.textValue1.trim() === "") {
            this.setState(() => ({ nameError1: "  (required)" }));
        }

        else {
            this.setState(() => ({ nameError1: '' }));
          
        }

        console.log(this.state);
        if(this.state.text !=='' && this.state.textValue1 !=='' ){

            axios.post('http://192.168.0.102:3000/events/birthday/',this.state,{
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => {
            console.log(response.data);
            alert('Event Created Successfuly');
            this.props.navigation.goBack();
           
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
                    <Text style={{color:'white',fontSize:20,fontWeight:'bold',left:-60}}>Host Birthday Event</Text>
                </Body>
                
            </Header>

            <Content style={{backgroundColor:'#FCCF1B'}}>
            <Form rounded>

                    {/*Birhday person name field */}
                <View style={styles.col}>
                    <View rounded style={{width: '100%', height: 60, backgroundColor: '#ffffff',marginTop:10,borderRadius:10,opacity:.9}}>
                        <View style={{ flexDirection: "row", left: 7, top: 4 }}>
                            <View style={{ flex: 1 }}>
                                <Item floatingLabel style={{ justifyContent: 'flex-start', width: 180 }}  >
                                    <Label style={{ opacity: 0.7 }}>Who's birthday is it*</Label>
                                    <Input onChangeText={text => this.setState({ text })} value={this.state.text} />
                                    {!!this.state.nameError && (<Label style={{ color: "red", fontSize: 10 }}>{this.state.nameError}</Label>)}
                                </Item>
                            </View>
                        </View>
                    </View>
                        


                    {/*Birhday date field */}
                    <View rounded style={{width: '100%', height: 60, backgroundColor: '#ffffff',borderRadius:10,marginTop:10,opacity:.9}}>                    
                    <Item style={{ width: 140, marginTop: 7,  }}>
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

                    {/*Birthday event timing*/}
                        <View style={{ flexDirection: "row", left: 5, paddingTop: 5 ,marginRight:10}}>
                            <View rounded style={{width: '50%', height: 100, backgroundColor: '#ffffff',borderRadius:10,marginTop:10,marginRight:1,marginLeft:0,opacity:.9}}>
                                <View style={{ flex: 1 }}>
                                    <Text style={{ opacity: 0.5,textAlign:"center" }} >Start Time(Hr:Min)</Text>

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
                                    <Text style={{ opacity: 0.5 ,textAlign:"center"}} >End Time(Hr:Min)</Text>
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
                                        onDateChange={(selectedHours2) => {this.setState({selectedHours2: selectedHours2})}}
                                    />
                                    </Item>
                                </View>
                            </View>
                        </View>

                    {/*Birthday event address*/}
                        <View rounded style={{width: '100%', height: 60, backgroundColor: '#ffffff',borderRadius:10,marginTop:10,marginLeft:1,opacity:.9}}>
                            <Item floatingLabel style={{ top: -10 }}  >
                                <Label style={{marginLeft:5,opacity:.7}} >{this.state.textValue}</Label>
                                <Input onFocus={this.addressfieldchange} value={this.state.output} />
                            </Item>
                        </View>

                    {/*Birthday description */}
                    <View rounded style={{width: '100%', height: 60, backgroundColor: '#ffffff',borderRadius:10,marginTop:10,marginLeft:1,opacity:.9}}>
                            <Item floatingLabel style={{ top: -5, left: 7, marginTop:5,padding:2 }}  >
                                <Label style={{marginLeft:5,opacity:.7}}>Add Description*</Label>
                                <Input onChangeText={textValue1 => this.setState({ textValue1 })} value={this.state.textValue1} />
                                {!!this.state.nameError1 && (<Label style={{ color: "red", fontSize: 10 }}>{this.state.nameError1}</Label>)}
                            </Item>
                        </View>
                        
                    {/*submit form button*/}
                        <GradientButton style={{ width: 170, height: 40, fontSize: 2, left: 77 ,marginTop:10,marginBottom:10 }} onPressAction={this.change} textStyle={{ fontSize: 18 }} text="Submit" width='90%' violetPink impact
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
        screen: BirthdayEvent,
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
        marginTop: 5,
        borderRadius: 10,
        marginHorizontal: 4,
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
