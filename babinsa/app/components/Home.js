import React, { Component, PropTypes } from 'react'; 
import { InteractionManager, ListView, View, Text, Platform, ActivityIndicator } from 'react-native';
var DeviceInfo = require('react-native-device-info');


import * as config from '../constants/config';
import {bindActionCreators} from 'redux';
import * as userActions from '../actions/userActions';
import { connect } from 'react-redux';


import EmptyItems from './EmptyItems';

const propTypes = {
    toRoute: PropTypes.func.isRequired
};


class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            loadingFooter: false,
            loading2: false
        }
        
    }


    componentWillMount() {

    }


    componentDidMount() {
        
        InteractionManager.runAfterInteractions(() => {
            

            this.setState({loading: false})

        });

    }

    componentWillReceiveProps(nextProps) {



    }


    renderLoading() {

        if( this.state.loading2 )
        {
          
            return (
                <View  style={config.styles.loadingContainer}>
                  <ActivityIndicator size="large" style={[styles.centering,styles.large]} color={'grey'}/>
                </View>
            );
          
        }

    }

  
    render() {

        if( !this.state.loading )
        {   


            return (
                <View style={styles.container}>
                  	<View style={styles.main}>
                    <Text>Home</Text>
                    </View>
                    {this.renderLoading()}
                </View>
            );
        }

        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" style={[config.styles.center,config.styles.large]} />
            </View>
        );
        
    }

}

const styles = {
    container: {
        flex: 1,
        backgroundColor: '#EEEEEE'
    },
    main: {
        flex: 1
    }

};



Home.propTypes = propTypes;

export default connect(state => ({
    account: state.user.data,
    statusUser: state.user.status
}),
(dispatch) => ({
    actions: bindActionCreators(userActions, dispatch)
})
)(Home);

