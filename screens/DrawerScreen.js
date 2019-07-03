import React from 'react';
import {
	View, 
	Text,
	Image,
	ScrollView,
	Platform,
	Dimensions,
	StyleSheet,
	TouchableOpacity,
	Share,
	AsyncStorage
	
} from 'react-native';
import * as Font from 'expo-font';
//import {Font} from 'expo'
import { createStackNavigator, createAppContainer } from 'react-navigation';
import LoginScreen from './LoginScreen.js';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons'



const WIDTH = Dimensions.get('window').width 
const HEIGHT = Dimensions.get('window').height 


export default class DrawerScreen extends React.Component {
	async componentDidMount() {
		await Font.loadAsync({
		  'EnGarde': require('../assets/fonts/EnGarde.ttf'),
		});
		this.setState({ fontLoaded: true });
	  }
	
	  state = {
		fontLoaded: false,
	  };

	//function for sharing our app
	onShare = async () => {
		try {
		  const result = await Share.share({
			message:
			  'Hey!!Join ShareJoy EventPlanner App!!Download the app using the link below --> \  \ https://expo.io/artifacts/a13f98b5-b172-4c04-82aa-a76ea9d64686',
		  });
	
		  if (result.action === Share.sharedAction) {
			if (result.activityType) {
			  // shared with activity type of result.activityType
			} else {
			  // shared
			}
		  } else if (result.action === Share.dismissedAction) {
			// dismissed
		  }
		} catch (error) {
		  alert(error.message);
		}
	  };
	
_logOut=async()=>{
	//await AsyncStorage.clear()            //     used removeitem instead of clear 
	await AsyncStorage.removeItem('isLoggedIn'); //Here removed only 'isLoggedIn' bcz i don't want to clear AlreadyLoaded=1 which helps to avoid introduction screen
	await AsyncStorage.removeItem('photo');//for removing the photo which is set
	await AsyncStorage.removeItem('check'); //for removing phone number..refer  profileinfo.js file
	await AsyncStorage.removeItem('photocheck'); //for removing profileimage..refer  profileinfo.js file
	await AsyncStorage.removeItem('reload'); //for removing reload set..refer  profileinfo.js file
	await AsyncStorage.removeItem('UserDbId'); //FOR removing stored db Id of the user
	this.props.navigation.navigate('LoginScreen')
}


	render() {
	
		return(
			  
			<View style={styles.container}>
				<ScrollView style={styles.scroller}>
					<View style={styles.topLinks}>
						<View style={styles.profile}>
							<View style={styles.imgView}>
				{this.props.photo !== null?(<Image style={styles.img} source={{uri:this.props.photo}} />):(<Image style={styles.img} source={{uri:'https://cdn1.iconfinder.com/data/icons/avatar-flat-1/512/10-512.png'}} />)}
							</View>
							<View style={styles.profileText}>
								<Text style={styles.name}>{this.props.data}</Text>
							</View>
						</View>
					</View>
					
					<View style={styles.bottomLinks}>
					
					<TouchableOpacity style={{paddingVertical:20,top:-40}}  onPress={() => this.props.navigation.navigate('ProfileTab')}>
					<Icon name='account' size={24} style={styles.drawerlinks} />
					{this.state.fontLoaded ? (
	                       	<Text style={styles.link}>My Profile</Text>
					): null
					}
                 	</TouchableOpacity>

					 <TouchableOpacity style={{paddingVertical:20,top:-80}}  >
					<Icon name='beach' size={24} style={styles.drawerlinks} />
					{this.state.fontLoaded ? (
	                       	<Text style={styles.link}>My Personal Events</Text>
							   ): null
					}
                 	</TouchableOpacity>

					 <TouchableOpacity style={{paddingVertical:20,top:-120}}  onPress={() => this.props.navigation.navigate()}>
					<Icon name='settings' size={24} style={styles.drawerlinks} />
					{this.state.fontLoaded ? (
	                       	<Text style={styles.link}>Settings</Text>
							   ): null
					}
                 	</TouchableOpacity>


					 <TouchableOpacity style={{paddingVertical:20,top:-160}}  onPress={this.onShare}>
					<Icon name='account-multiple-plus' size={24} style={styles.drawerlinks} />
					{this.state.fontLoaded ? (
	                       	<Text style={styles.link}>Invite Your Friends</Text>
							   ): null
					}
                 	</TouchableOpacity>

					 <TouchableOpacity style={{paddingVertical:20,top:-200}}  onPress={() => this.props.navigation.navigate()}>
					<Icon name='help-circle' size={24} style={styles.drawerlinks} />
					{this.state.fontLoaded ? (
	                       	<Text style={styles.link}>Help and Feedback</Text>
							   ): null
					}
                 	</TouchableOpacity>

					 <TouchableOpacity style={{paddingVertical:20,top:-240}}  onPress={() => this.props.navigation.navigate()}>
					<Icon name='star' size={24} style={styles.drawerlinks} />
					{this.state.fontLoaded ? (
	                       	<Text style={styles.link}>Rate Us</Text>
							   ): null
					}
                 	</TouchableOpacity>
				
					
					
					
					</View>
				</ScrollView>
				<View style={styles.footer}>
				   <TouchableOpacity style={styles.description}  onPress={this._logOut} >
				   <Icon name='logout' size={24} style={{top:10,left:-10}} />
					<Text style={{top:-15,left:21,fontWeight:'bold',fontSize:17}} >Log Out</Text>
					</TouchableOpacity>
				
					<Text style={styles.version}>v1.0</Text>
				</View>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'lightgray',
	},
	scroller: {
		flex: 1,
	},
	profile: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		paddingTop: 25,
		borderBottomWidth: 1,
		borderBottomColor: '#777777',
	},
	profileText: {
		flex: 3,
		flexDirection: 'column',
		justifyContent: 'center',
	},
	name: {
		fontSize: 20,
		paddingBottom: 5,
		color: 'white',
		textAlign: 'left',
	},
	imgView: {
		flex: 1,
		paddingLeft: 20,
		paddingRight: 20,
	},
	img: {
		height: 70,
		width: 70,
		borderRadius: 50,
	},
	topLinks:{
		height: 160,
		backgroundColor: 'rgba(70,70,70,1)',
	},
	bottomLinks: {
		flex: 1,
		backgroundColor: 'white',
		paddingTop: 10,
		paddingBottom: 450,
	},
	link: {
		flex: 1,
		fontSize: 15,
		fontFamily:'EnGarde',
		fontWeight:'normal',
		padding: 6,
		paddingLeft: 14,
		margin: 5,
		textAlign: 'left',
		left:30
	},
	footer: {
		height: 50,
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: 'white',
		borderTopWidth: 1,
		borderTopColor: 'lightgray'
	},
	version: {
		flex: 1, 
		textAlign: 'right',
		marginRight: 20,
		color: 'gray'
	},
	description: {
		flex: 1, 
		marginLeft: 20,
		fontSize: 16,
	},

	drawerlinks:{
		left:10,
		top:37
	}
})