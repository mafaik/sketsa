import React, { Component, PropTypes } from 'react'; 
import { InteractionManager, TouchableHighlight, Navigator, BackAndroid,ScrollView, View, Text, Image, Platform, ActivityIndicator, ActivityIndicatorIOS } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import * as config from '../constants/config';
//import {bindActionCreators} from 'redux';
//import * as simankaActions from '../actions/simankaActions';
//import { connect } from 'react-redux'

import Page from './Page';



const propTypes = {
  toRoute: PropTypes.func.isRequired,
  data: PropTypes.object
};



class LeftNav extends Component {


    constructor(props) {
        super(props);

        this.changeScene = this.changeScene.bind(this);
        
        
    }

    componentWillReceiveProps(nextProps) {
        
        
    }

    quit() {
        BackAndroid.exitApp();
    }

    logout() {
        requestAnimationFrame(() => {
            this.props.actions.logout();
        });
    }

    goToLogin() {
        this.props.resetToRoute({
            name: 'Login',
            component: Login,
            sceneConfig: Navigator.SceneConfigs.FadeAndroid,
            hideNavigationBar: {true}
        });
    }


    changeScene(component, name) {

        requestAnimationFrame(() => {

            var props = {};

            var route = {
              name: name,
              component: component,
              passProps: props,
            };
            

            this.props.toRoute(route);
            
        });
        

    };


    render() {


        return (

                <ScrollView style={styles.container}>

                    <TouchableHighlight underlayColor="transparent" onPress={() => this.changeScene(Page, 'Page') } >
                        <View style={styles.menu}>
                            <Icon name="ios-checkbox"
                                  size={35}
                                  color="#000000"
                                  style={styles.icons}/>
                            <Text style={styles.textMenu}>Page</Text>
                        </View>
                    </TouchableHighlight>

                    <View style={{paddingBottom: 100}}/>

                </ScrollView>

        );

    }
}


const styles = {
    container: {
        flex: 1,
        height: config.dimension.height
    },
    header: {
        paddingTop: 16,
        paddingBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#FAFAFA'
    },
    menu: {
        flexDirection: 'row',
        flex: 1,
        paddingTop: 10,
        paddingBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#FAFAFA'
    },
    icons: {
        marginRight: 10,
        marginLeft: 10,
    },
    textHeader: {
        fontSize: 16
    },
    textMenu: {
        fontSize: 18,
        marginTop: 6
    }
};

LeftNav.propTypes = propTypes

export default LeftNav;





