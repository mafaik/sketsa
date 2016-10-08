import { Dimensions, StyleSheet } from 'react-native';

export const server = 'http://192.168.1.4';
export const api = server+'/api';
export const api2 = server+'/serverwebservice';

export const dimension = {
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height,
}

export const styles = StyleSheet.create({
	center: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center'
	},
	btn: {
	    marginTop: 50,
	    paddingTop: 15,
	    paddingBottom: 15,
	    backgroundColor: '#FFD600',
	    justifyContent: 'center'
  	},
  	textBtn: {
	    textAlign: 'center',
	    fontSize: 20,
	    fontWeight: 'bold',
	    color: '#FFFFFF'
  	},
	large: {
	    transform: [{scale: 1.5}]
  	},
  	loadingContainer: {
	    position: 'absolute',
	    top: 0,
	    width: dimension.width,
	    height: dimension.height,
	    alignItems: 'center',
	    justifyContent: 'center',
	    backgroundColor: 'rgba(0,0,0,0.4)'
  	}
});