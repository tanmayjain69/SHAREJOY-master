
import { Icon } from 'native-base';
import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types'

import contactData from '../../assets/contact.json'

import ProfileInfo from '../ProfileInfo.js'





export default class ProfileScreen extends React.Component {

  static navigationOptions = {
    tabBarIcon: ({ tintColor }) => (
      <Icon name="ios-contact" style={{ color: tintColor }} />
    )
  }

  render() {

    return (
      <ProfileInfo  {...contactData}/>
    );
  }


}


