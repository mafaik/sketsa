import * as types from '../constants/types';
import * as config from '../constants/config';
//import * as Db from '../db/Db';
import { get, post, postJson } from '../api/api';


export function setStatus(status) {
	return (dispatch) => {
	    dispatch({
      		type: types.SET_STATUS,
      		status: status
	    });
	}
}






