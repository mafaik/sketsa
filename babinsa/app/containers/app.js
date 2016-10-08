'use strict';

import React, { Component } from 'react'; 
import { View, StyleSheet, ActivityIndicator, InteractionManager } from 'react-native';


import * as config from '../constants/config';
//import {bindActionCreators} from 'redux';
//import * as simankaActions from '../actions/simankaActions';
//import { connect } from 'react-redux';

import SplashScreen from '@remobile/react-native-splashscreen';
import Router from 'react-native-simple-router';
import BackButton from '../components/icons/BackButton';
import Menu from '../components/icons/Menu';
import Close from '../components/icons/Close';
import Home from '../components/Home';



class App extends React.Component {
  

    static childContextTypes = {
        navigator: React.PropTypes.object
    };


    constructor(props) {
        super(props);
        this.state = {
            navigator: null,
            loading: true,
        }

    }

    getChildContext = () => {
        return {
            navigator: this.state.navigator
        }
    };
  
    componentDidMount() {
        SplashScreen.hide();
        this.setState({loading: false});
    }

    componentWillReceiveProps(nextProps) {

    }

    setNavigator(navigator) {
        this.setState({
            navigator: navigator
        });
    }


    render() {

        if( !this.state.loading )
        {
            const { navigator } = this.state;

            
            const firstRoute = {
                name: 'Home',
                component: Home,
                leftCorner: () => {
                    return (
                      <Menu navigator={this.state.navigator}/>
                    )
                }
                
            }
            
          
            return (

                <Router
                    firstRoute={firstRoute}
                    headerStyle={styles.header}
                    backButtonComponent={BackButton}
                    statusBarColor={'blue'}
                    handleBackAndroid={true}
                    noStatusBar={true}
                    statusBarProps={{backgroundColor: 'blue'}}
                    ref={(router) => { !this.state.navigator ? this.setNavigator(router) : null }}/>
                        
              
            );
        }


        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" style={[config.styles.center,config.styles.large]} />
            </View>
        );
    
    }

};


var styles = StyleSheet.create({
  container: {
    flex: 1
  },
  scene: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    backgroundColor: '#FFD600',
    elevation: 3
  },
  icon: {
    width: 25,
    height: 25,
    marginLeft: 8,
  }
});


export default App;




