import React, { Component, PropTypes } from 'react'; 
import { View, StyleSheet, TouchableHighlight, InteractionManager, Image, Navigator  } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';


class Close extends Component {

  constructor(props) {
    super(props);
    
  }

  onPress() {

    requestAnimationFrame( () => {
      this.props.onPress();
    });
  
  }

  render() {

    return (
      <TouchableHighlight style={styles.iconContainer} underlayColor="transparent" onPress={ () => this.onPress() }>
        <View>
          <Icon
            name="ios-close"
            color="#FFFFFF"
            size={35}
            style={styles.icon}/>
        </View>
      </TouchableHighlight>
    );
  }
}

const styles = {
  iconContainer: {
    padding: 10
  },
  icon: {
    marginLeft: 8,
  }
};



export default Close;



