import React from 'react';
import { View, Text, Platform,TextInput, StyleSheet,LayoutAnimation,UIManager, TouchableOpacity, Animated, ScrollView, Image, Dimensions, TouchableHighlight} from 'react-native';

import { Card, Icon,Avatar} from 'react-native-elements';
import Carousel from 'react-native-snap-carousel';
import { Col, Row, Grid } from "react-native-easy-grid";
import { Button} from 'react-native-paper';
import Gallery from 'react-native-image-gallery';
import Modal from 'react-native-modal';
import {ImagePicker, Permissions, Constants,Font, Linking} from 'expo';
import openMap from 'react-native-open-maps';
import DatePicker from 'react-native-datepicker'


export default class FirstPage extends React.Component {
    state = {
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/480px-No_image_available.svg.png',    //For image gallery section
        image2:null,
        image3:null,
        image4:null,
        image5:null,
      };
    

    constructor(props) {
        super(props);
        this.state = {
            valueArray: [],
            valueArray2:[],
            valueArray3:[],
            valueArray4:[],
            ButtonDisabled1: false,
            ButtonDisabled2: false,
            ButtonDisabled3: false,
            ButtonDisabled4: false,
            visibleModalPrimary:null,
            visibleModalReception:null,
            visibleModal:null,
            visibleModal2:null,
            visibleModal3:null,

            GroomStory:'Here goes your story ',
            BrideStory:'Here goes your story',
            textualinfo:'Information Goes Here',
            EventDate:"",
            EventWeek:'Week',
            EventTime:'',
            EventVenue:'Venue',
            EventType:'',
            status:false,
            eventsname:props.navigation.getParam('eventname'),
            eventaddress:props.navigation.getParam('eventaddress'),
            eventtime:props.navigation.getParam('eventtime'),
            eventdate:props.navigation.getParam('eventdate'),

            

          

            carouselItems: [
                {
                    title: "Item 1"
                },
                {
                    title: "Item 2"
                },
                {
                    title: "Item 3"
                },
                {
                    title: "Item 4"
                },
                {
                    title: "Item 5"
                }
            ]
        }
        this.index = 0;
        this.animatedValue = new Animated.Value(0);
        if( Platform.OS === 'android' ) {
            UIManager.setLayoutAnimationEnabledExperimental(true);
          }
    }
    



    _renderItem({ item, index }) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Image 
                    source={require('../images/topimage.jpg')}
                    
                />
                
                <Text style={{ color: '#fff' }} >{item.title}</Text>
            </View>
        )
    }



    addMore = () => {
        this.animatedValue.setValue(0);

        let newlyAddedValue = { index: this.index }

        this.setState({ ButtonDisabled1: true, valueArray: [...this.state.valueArray, newlyAddedValue] }, () => {
            Animated.timing(
                this.animatedValue,
                {
                    toValue: 1,
                    duration: 500,
                    useNativeDriver: true
                }
            ).start(() => {
                this.index = this.index + 1;
               
            });
        });
    }

    aurdaal = () => {
        this.animatedValue.setValue(0);

        let newlyAddedValue = { index: this.index }

        this.setState({ButtonDisabled2: true, valueArray2: [...this.state.valueArray2, newlyAddedValue] }, () => {
            Animated.timing(
                this.animatedValue,
                {
                    toValue: 1,
                    duration: 500,
                    useNativeDriver: true
                }
            ).start(() => {
                this.index = this.index + 1;
                
            });
        });
    }

    TextSection = () => {
        this.animatedValue.setValue(0);

        let newlyAddedValue = { index: this.index }

        this.setState({ButtonDisabled3: true, valueArray3: [...this.state.valueArray3, newlyAddedValue] }, () => {
            Animated.timing(
                this.animatedValue,
                {
                    toValue: 1,
                    duration: 500,
                    useNativeDriver: true
                }
            ).start(() => {
                this.index = this.index + 1;
                
            });
        });
    }

    GallerySection = () => {
        this.animatedValue.setValue(0);

        let newlyAddedValue = { index: this.index }

        this.setState({ButtonDisabled4: true, valueArray4: [...this.state.valueArray4, newlyAddedValue] }, () => {
            Animated.timing(
                this.animatedValue,
                {
                    toValue: 1,
                    duration: 500,
                    useNativeDriver: true
                }
            ).start(() => {
                this.index = this.index + 1;
                
            });
        });
    }

    removeItem = (id) => {
      if(id==1){
           this.setState({valueArray:[],ButtonDisabled1:false})
      }

      if (id==2){
        this.setState({valueArray2:[],ButtonDisabled2:false})
      }

      if (id==3){
        this.setState({valueArray3:[],ButtonDisabled3:false})
      }

      if (id==4){
        this.setState({valueArray4:[],ButtonDisabled4:false})
      }

      }

      renderModalPrimary = () => (                      //content inside the Modal
        <View style={styles.content}>
         <Button disabled={this.state.ButtonDisabled1} onPress={this.addMore}>Add More Event</Button>
         <Button disabled={this.state.ButtonDisabled2} onPress={this.aurdaal}>Add Story</Button>
         <Button disabled={this.state.ButtonDisabled3} onPress={this.TextSection}>Add Textual Info</Button>
        <Button disabled={this.state.ButtonDisabled4} onPress={this.GallerySection}>Add Image Gallery</Button>
        <Button onPress={() => this.setState({ visibleModalPrimary: null })}>Close</Button>
        </View>
      );

      renderModalReception = () => (                      //content inside the Modal
        <View style={styles.content}>
          <TextInput  style={{paddingVertical:8}} placeholder="Enter Event Type"  onChangeText={(EventType)=>this.setState({EventType})}/>
          <DatePicker
        style={{width: 200}}
        date={this.state.EventDate}
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
        onDateChange={(EventDate) => {this.setState({EventDate: EventDate})}}
      />
        <TextInput style={{paddingVertical:8}} placeholder="Enter week"  onChangeText={(EventWeek)=>this.setState({EventWeek})}/>
        <DatePicker
        style={{width: 200}}
        date={this.state.EventTime}
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
        onDateChange={(EventTime) => {this.setState({EventTime: EventTime})}}
      />
        <TextInput style={{paddingVertical:8}} placeholder="Enter Venue"  onChangeText={(EventVenue)=>this.setState({EventVenue})}/>
        <Button onPress={() => this.setState({ visibleModalReception: null })}>Change</Button>
        </View>
      );

      renderModalContent = () => (                      //content inside the Modal
        <View style={styles.content}>
        {this.state.fontLoaded ? (<TextInput style={styles.minitext} autoFocus={true} placeholder="Here goes his story" multiline={true}  numberOfLines = {5} onChangeText={(GroomStory)=>this.setState({GroomStory})} />):null}
        {this.state.fontLoaded ? ( <TextInput style={styles.minitext} placeholder="Here goes her story" multiline={true}  numberOfLines = {5} onChangeText={(BrideStory)=>this.setState({BrideStory})} />):null}
          <Button onPress={() => this.setState({ visibleModal: null })}>Change</Button>
        </View>
      );

      
      renderModalContentTextualInfo = () => (                      //content inside the Modal
        <View style={styles.content}>
     {this.state.fontLoaded?(<TextInput style={{fontFamily:"Sofia"}} autoFocus={true} placeholder="Enter Text Here" multiline={true}  numberOfLines = {5} onChangeText={(textualinfo)=>this.setState({textualinfo})} />):null}
          <Button onPress={() => this.setState({ visibleModal2: null })}>Change</Button>
        </View>
      );

      renderModalGallery = () => (                      //content inside the Modal
        <View style={styles.content}>
        
        <Button title="Pick an image from camera roll" onPress={()=>this._pickImage(1)}>Add Image 1</Button>
        <Button title="Pick an image from camera roll" onPress={()=>this._pickImage(2)}>Add Image 2</Button>
        <Button title="Pick an image from camera roll" onPress={()=>this._pickImage(3)}>Add Image 3</Button>
        <Button title="Pick an image from camera roll" onPress={()=>this._pickImage(4)}>Add Image 4</Button>
        <Button title="Pick an image from camera roll" onPress={()=>this._pickImage(5)}>Add Image 5</Button>
     
        </View>
      );

      handleOnScroll = event => {
        this.setState({
          scrollOffset: event.nativeEvent.contentOffset.y,
        });
      };
    
      handleScrollTo = p => {
        if (this.scrollViewRef) {
          this.scrollViewRef.scrollTo(p);
        }
      };

      async componentDidMount() {
        this.getPermissionAsync();
        await Font.loadAsync({
          'Kaushan': require('../assets/fonts/KaushanScript-Regular.otf'),
          'AlexBrush':require('../assets/fonts/AlexBrush.ttf'),
          'Pacifico':require('../assets/fonts/Oswald.ttf'),
          'Lobster':require('../assets/fonts/Lobster.otf'),
          'Sofia':require('../assets/fonts/Sofia.otf'),
        });
        this.setState({ fontLoaded: true });
        this.setState({image:"https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/480px-No_image_available.svg.png"})
        this.setState({image2:"https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/480px-No_image_available.svg.png"})
        this.setState({image3:"https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/480px-No_image_available.svg.png"})
        this.setState({image4:"https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/480px-No_image_available.svg.png"})
        this.setState({image5:"https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/480px-No_image_available.svg.png"})
       if('42be9ffa-ad0f'=='42be9ffa-ad0f'){
         this.setState({status:true});
         console.log(this.state.status)
        
       }
      }

      state = {
        fontLoaded: false,
        };
    
      getPermissionAsync = async () => {
        if (Constants.platform.ios) {
          const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
          if (status !== 'granted') {
            alert('Sorry, we need camera roll permissions to make this work!');
          }
        }
      }
    
      _pickImage = async (id) => {
        this.setState({ visibleModal3: null })
       
        
      if(id==1){
        result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          
          aspect: [4, 3],
        }); 


        if (!result.cancelled) {
          this.setState({ image: result.uri });
        }
        else{
          this.setState({image:'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/480px-No_image_available.svg.png'})
        }


      }


       
      if(id==2){
          result2 = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
        });

        if (!result2.cancelled) {
          this.setState({ image2: result2.uri });
        }
        else{
          this.setState({image2:'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/480px-No_image_available.svg.png'})
        }


      }
      if(id==3){
        result3 = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
        });
        if (!result3.cancelled) {
          this.setState({ image3: result3.uri });
        }
        else{
          this.setState({image3:'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/480px-No_image_available.svg.png'})
        }

      }
      if(id==4){
        result4 = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
        });

         
        if (!result4.cancelled) {
          this.setState({ image4: result4.uri });
        }
        else{
          this.setState({image4:'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/480px-No_image_available.svg.png'})
        }
      }
      if(id==5){  
        result5 = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
        });

        if (!result5.cancelled) {
          this.setState({ image5:result5.uri });
        }
        else{
          this.setState({image5:'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/480px-No_image_available.svg.png'})
        }


      }
       

      };

      openmap=()=> {
        const venue=this.state.EventVenue
        openMap({ end:venue});
      }

    render() {
      const venue=this.state.ReceptionVenue
        let { image,image2,image3,image4,image5 } = this.state;
        const animationValue = this.animatedValue.interpolate(
            {
                inputRange: [0, 1],
                outputRange: [-59, 0]
            });

        let newArray = this.state.valueArray.map((item, key) => {
           
                return (
                    <Animated.View key={key} style={[{ opacity: this.animatedValue, transform: [{ translateY: animationValue }] }]}>
                      <View style={styles.card}>
                      {this.state.fontLoaded ?(   <Text style={{fontFamily:'Lobster' ,fontSize: 20,textAlign:'center',top:30}}>Schedule </Text>):null}
                      <TouchableOpacity  style={{width:18,left:8,top:18}} onPress={() => this.setState({ visibleModalReception: 'fancy' })}>
                             <Icon name="create" size={20}  />
                             </TouchableOpacity>
                         <TouchableOpacity  style={{width:18,left:320,top:20}} onPress={()=>this.removeItem(1)}>
                             <Icon name="delete" size={20}/>
                             </TouchableOpacity>
                         <View style={styles.Reception}>

                            <Grid>
                                <Row size={90}>
                                    <Col style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                   {this.state.fontLoaded ? (     <Text style={{ textAlign: 'center', color: 'white', fontSize: 36,fontFamily:"Sofia" }}>
                                            {this.state.EventType}
                                        </Text>):null}
                                   {this.state.fontLoaded ? (<Text style={{ marginTop: 10, color: 'white',fontFamily:"Sofia" }}>{this.state.EventDate}</Text>):null}
                             {this.state.fontLoaded ? (           <Text style={{ color: 'white',fontFamily:"Sofia" }}>{this.state.EventWeek}</Text>):null}
                             {this.state.fontLoaded ? (         <Text style={{ color: 'white',fontFamily:"Sofia" }}>{this.state.EventTime}</Text>):null}
                                    </Col>

                                    <Col style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                               {this.state.fontLoaded ? (         <Text style={{ flexWrap: 'wrap', color: 'white', textAlign: 'center',fontFamily:"Sofia" }}>
                                           {this.state.EventVenue}
                                        </Text>):null}
                                        <Button onPress={this.openmap} style={{ backgroundColor: 'rgba(52, 52, 52, 0.8)', marginTop: 10 }}><Text style={{ color: 'white' }}>Map</Text></Button>
                                        <Button onPress={()=>Linking.openURL(`https://book.olacabs.com/?`) } style={{ backgroundColor: 'rgba(52, 52, 52, 0.8)', marginTop: 10 }}><Text style={{ color: 'white' }}>Book A Ride</Text></Button>
                                    </Col>
                                </Row>
                                <Row size={10}>
                                    <Text style={{ flex: 1, textAlign: 'center', fontWeight: 'bold', color: 'white' }}> Please bring expensive gifts with lots of blessing</Text></Row>
                            </Grid>

                        </View>
                       </View>
                    </Animated.View>
                );
           
 
        });


        let nyaArray=  this.state.valueArray2.map((item, key) => {
           
                return (
                    <Animated.View key={key} style={[{ opacity: this.animatedValue, transform: [{ translateY: animationValue }] }]}>
                           <View style={styles.card}>
                         {this.state.fontLoaded ?(   <Text style={{fontFamily:'Lobster' ,fontSize: 20,textAlign:'center',top:30}}>Our Story  </Text>):null}
                            <TouchableOpacity  style={{width:18,left:8,top:18}} onPress={() => this.setState({ visibleModal: 'fancy' })}>
                             <Icon name="create" size={20}  />
                             </TouchableOpacity>
                             <TouchableOpacity  style={{width:18,left:320,}} onPress={()=>this.removeItem(2)}>
                             <Icon name="delete" size={20}      underlayColor={'blue'}/>
                             </TouchableOpacity>

                              <View style={{ borderBottomColor: 'black', borderBottomWidth: 1,}}/>
                              <Card style={styles.story}>
                                  
                                <Grid>
                                  <Row>
                                    <Col style={{flex: 1,justifyContent: 'center',}}>
                                       <TouchableHighlight
                                      style={[styles.profileImgContainer, { borderColor: 'green', borderWidth: 1 }]}
                                    >
                                       <Image source={{uri:'https://www.w3schools.com/w3images/avatar2.png'}} style={styles.profileImg} />

                                      </TouchableHighlight>
                                      </Col>
                                    <Col style={{left:-10 }}>
                                    {this.state.fontLoaded ?(<Text style={styles.minitext}>{this.state.GroomStory}</Text>):null}
                                    </Col>
                                  </Row>
                                  <Row style={{marginTop:15,left:-3}}>
                                    <Col style={{ alignItems: 'center' }}>
                                    {this.state.fontLoaded ?(  <Text style={styles.minitext}>
                                        {this.state.BrideStory}</Text>):null}
                                        </Col>
                                    <Col style={{
                                      flex: 1,
                                      justifyContent: 'center',
                                      alignItems: 'center'
                                    }}>
                                      <TouchableHighlight
                                        style={[styles.profileImgContainer, { borderColor: 'green', borderWidth: 1 }]}
                                      >
                                        <Image source={{uri:"https://secure11.securewebexchange.com/hardsignal.com/images/img_avatar2.png"}} style={styles.profileImg} />
                                      </TouchableHighlight>
                                    </Col>
                                  </Row>
                                </Grid>
                                </Card>
                              
                    </View>
                    </Animated.View>
                );
         
    
        });

        let TextSection=  this.state.valueArray3.map((item, key) => {
           
            return (
                <Animated.View key={key} style={[{ opacity: this.animatedValue, transform: [{ translateY: animationValue }] }]}>
                    <View style={styles.card}>
                    {this.state.fontLoaded ?(    <Text style={{
                          textAlign: 'center',
                          fontSize: 20,
                          fontFamily:'Lobster',
                          top:30,
                    }}>Text Section</Text> ):null}

                           <TouchableOpacity  style={{width:18,left:8,top:18}} onPress={() => this.setState({ visibleModal2: 'fancy' })}>
                             <Icon name="create" size={20}  />
                             </TouchableOpacity>
                             <TouchableOpacity  style={{width:18,left:320,}} onPress={()=>this.removeItem(3)}>
                             <Icon name="delete" size={20}      underlayColor={'blue'}/>
                             </TouchableOpacity>
                        <View
                          style={{
                            borderBottomColor: 'black',
                            borderBottomWidth: 1,
                          }}
                        />
                        <Card style={{borderWidth:1}}>
                        {this.state.fontLoaded ?(<Text style={{ flexWrap: 'wrap',fontFamily:'Sofia'}}>
                            {this.state.textualinfo}
                                      </Text>):null}
                        </Card>
                     </View>
                </Animated.View>
            );
     

    });


    let GallerySection=  this.state.valueArray4.map((item, key) => {
           
        return (
            <Animated.View key={key} style={[{ opacity: this.animatedValue, transform: [{ translateY: animationValue }] }]}>
               <View style={styles.card}>
               {this.state.fontLoaded ?( <Text style={{
                        textAlign: 'center',
                        fontFamily:'Lobster',
                        fontSize: 20,
                        top:30
                      }}>Photo Gallery</Text>):null } 

                            <TouchableOpacity  style={{width:18,left:8,top:18}} onPress={() => this.setState({ visibleModal3: 'fancy' })}>
                             <Icon name="create" size={20}  />
                             </TouchableOpacity>
                             <TouchableOpacity  style={{width:18,left:320,}} onPress={()=>this.removeItem(4)}>
                             <Icon name="delete" size={20} />
                             </TouchableOpacity>
                      <View
                        style={{
                          borderBottomColor: 'black',
                          borderBottomWidth: 1,
                        }}
                      />
                      <Gallery
                        style={{ flex: 1, marginTop: 10,height:200}}
                      
                        images={[
                        
                        { source:{ uri: image } , dimensions: { width: 450, height:150 } },
                          { source:{ uri: image2 }, dimensions: { width: 80, height: 80 } },
                          { source:{ uri: image3 }, dimensions: { width: 80, height: 80 } },
                          { source: { uri: image4 },dimensions: { width: 80, height: 80 } },
                          { source: { uri: image5 },dimensions: { width: 180, height: 180 } },
                          
                        ]}
                      />
                   </View>
            </Animated.View>
        );
 

});



        return (
            <ScrollView>


                <View style={styles.imagebox}>
                    <Carousel
                        data={this.state.carouselItems}
                        sliderWidth={sliderWidth1}
                        itemWidth={sliderWidth1}

                        renderItem={this._renderItem}
                        style={styles.container}
                    />
                </View>
             {this.state.fontLoaded ?(   <Text style={{fontFamily:'Kaushan',fontSize:31,textAlign:"center"}}>{this.state.eventsname}</Text>):null}
             {this.state.fontLoaded ?(    <Text style={styles.time}>Saturday | {this.state.eventdate} | At {this.state.eventtime}</Text>):null}
                {this.state.fontLoaded ?( <Text  style={styles.venue}>Venue: {this.state.eventaddress}</Text>):null}
                
                {this.state.fontLoaded ?  ( <Text style={styles.message}>  Joyfully invite you to share in their happiness as they unite in marriage</Text>):null}

                <View style={{ flex: 1, padding: 4 }}>
                    {
                        newArray
                    }
                </View>

                
                <View style={{flex:1,  padding: 4 }}>
                    {
                        nyaArray
                    }
                </View>

                <View style={{ flex: 1, padding: 4 }}>
                    {
                       GallerySection
                    }
                </View>

                <View style={{ flex: 1, padding: 4}}>
                    {
                        TextSection
                    }
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
          {this.renderModalContent()}
        </Modal>

        <Modal
          isVisible={this.state.visibleModalReception === 'fancy'}
          backdropColor="#B4B3DB"
          backdropOpacity={0.8}
          animationIn="zoomInDown"
          animationOut="zoomOutUp"
          animationInTiming={600}
          animationOutTiming={600}
          backdropTransitionInTiming={600}
          backdropTransitionOutTiming={600}
        >
          {this.renderModalReception()}
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
          {this.renderModalContentTextualInfo()}
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
          {this.renderModalGallery()}
        </Modal>

        <Modal
          isVisible={this.state.visibleModalPrimary === 'bottom'}
          onSwipeComplete={() => this.setState({ visibleModalPrimary: null })}
          swipeDirection={['up', 'left', 'right', 'down']}
          style={styles.bottomModal}
        >
          {this.renderModalPrimary()}
        </Modal>

               

          <Button onPress={() => this.setState({ visibleModalPrimary: 'bottom' })}>Add More Sections </Button>
          <Button style={{marginTop:15,width:130,left:115}}  mode="contained" compact={true} onPress={() => alert('You have accepted the invitation')}>Join Event</Button>
    

            </ScrollView>
        );
    }
}
const sliderWidth1 = Dimensions.get('window').width;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#131420',
        alignItems: 'center',
        justifyContent: 'center',
    },
    imagebox:
    {

        height: 190,
        top: 5,
        margin: 5
    },
    time: {
      
        fontSize: 18,
        marginTop: 3,
        textAlign: 'center',
        fontFamily:'Pacifico'
    },
    venue: {
        flexWrap: 'wrap',
        marginTop: 5,
        textAlign: 'center',
        fontFamily:'Kaushan',
        fontSize:15
    },
    message:
    {
        flexWrap: 'wrap',
        marginTop: 5,
        textAlign: 'center',
        color: 'red',
        fontFamily:'AlexBrush',
        fontSize:16
    },

    Reception: {
        marginTop: 20,
        height: 250,
        backgroundColor: '#404040'
    },
    story: {
        marginTop: 20,
        height: 250,
        padding:10
    },
    profileImgContainer: {
        marginLeft: 8,
        height: 80,
        width: 80,
        borderRadius: 40,
    },
    profileImg: {
        height: 80,
        width: 80,
        borderRadius: 40,
    },
    container1:
    {
        flex: 1,
        backgroundColor: '#eee',
        justifyContent: 'center',
        paddingTop: (Platform.OS == 'ios') ? 20 : 0
    },

    viewHolder:
    {
        height: 55,
        backgroundColor: '#26A69A',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 4
    },

    text1:
    {
        color: 'white',
        fontSize: 25
    },

    btn:
    {
        position: 'absolute',
        right: 25,
        bottom: 25,
        borderRadius: 30,
        width: 60,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.7)',
        padding: 15
    },

    btnImage:
    {
        resizeMode: 'contain',
        width: '100%',
        tintColor: 'white'
    },
    content: {
        backgroundColor: 'white',
        padding: 22,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        borderColor: 'rgba(0, 0, 0, 0.1)',
      },
      contentTitle: {
        fontSize: 20,
        marginBottom: 12,
      },
      bottomModal: {
        justifyContent: 'flex-end',
        margin: 0,
      },

      card:{
        marginHorizontal: 2, 
        backgroundColor: 'white', 
        shadowColor: "#000000",
        padding:10,
        paddingTop:0,
        borderRadius:5,
        marginTop:10,
        
        shadowOffset: {
          width: 1,
          height: 5,
        },
        shadowOpacity: 0.54,
        shadowRadius: 1.27,

        elevation: 5,
      },

      minitext:{
        fontFamily:'Sofia'
      }

     
});