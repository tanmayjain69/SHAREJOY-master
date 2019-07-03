import React from 'react';
import { StyleSheet, Text, View,Image } from 'react-native';
import { Icon } from 'native-base';
import ActionButton from 'react-native-action-button';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons'


export default class Notification extends React.Component {


  static navigationOptions = {
    tabBarIcon: ({ tintColor }) => (
      <Icon name="ios-notifications" style={{ color: tintColor }} />
    ),

   
  }

  render() {



    return (
      <View style={{flex:1, backgroundColor: '#f3f3f3'}}>
         
        {/* Rest of the app comes ABOVE the action button component !*/}
        <ActionButton buttonColor="rgba(231,76,60,1)">
          <ActionButton.Item buttonColor='#9b59b6' title="Host Event" onPress={() => this.props.navigation.navigate('CreateEventScreen')}>
            <Icons size={29} name="food-fork-drink" style={styles.actionButtonIcon} />
          </ActionButton.Item>
          <ActionButton.Item buttonColor='#3498db' title="Your Contacts" onPress={() => {}}>
            <Icons name="account-box-multiple" style={styles.actionButtonIcon} />
          </ActionButton.Item>
          <ActionButton.Item buttonColor='#1abc9c' title="Scan to receive invitation" onPress={() => {}}>
            <Icons name="qrcode-scan" style={styles.actionButtonIcon} />
          </ActionButton.Item>
        </ActionButton>
      </View>
    );
  }
} 

const styles = StyleSheet.create({
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },
});