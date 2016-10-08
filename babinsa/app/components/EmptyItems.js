import React, { Component } from 'react'; 
import { View, StyleSheet, Text } from 'react-native';

class EmptyItems extends Component {
  render() {
    return (
      <View style={[styles.container, styles.centerText]}>
        <Text style={styles.text}>{this.props.text}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centerText: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    color: '#888888',
  }
});

export default EmptyItems;