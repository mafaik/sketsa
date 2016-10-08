import React, { Component, PropTypes } from 'react'; 
import { InteractionManager, View, Text} from 'react-native';

import * as config from '../constants/config';


class Page extends Component {

  constructor(props) {
    super(props);
    
  }

  
  render() {

    return (
      <View style={styles.container}>
      	<Text style={config.styles.center}>PAGE</Text>
      </View>
    );
  }

}

const styles = {
  container: {
  	flex: 1
  }

};



export default Page;

