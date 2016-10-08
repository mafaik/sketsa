import React, { Component } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default class BackButton extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Icon name="ios-arrow-back" size={40} color="#fff" style={{marginLeft:5}} />
      </View>
      
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  backButton: {
    width: 15,
    height: 15,
  }
});
