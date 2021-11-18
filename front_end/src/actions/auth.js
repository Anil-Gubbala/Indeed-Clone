import axios from 'axios';
//import { setAlert } from './alert';
import{
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT
} from './types';
import setAuthToken from '../utils/setAuthToken';

export const loadUser = () =>async dispatch => {
    if(localStorage.token){
        setAuthToken(localStorage.token);
    }
    try {
        const res = await axios.get('/auth');
        dispatch({
            type: USER_LOADED,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: AUTH_ERROR
        })
    }
};

export const register = formData => async dispatch =>{


try{
    console.log(formData);
    const res = await axios.post('/user',formData);
    if(res.data==='failure'){
        alert("user already existed");
    }
    else{
        alert("user added")
    }
    dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data
    })
    //dispatch(loadUser());
}catch(err){
    const errors = err.response.data.errors;
    console.log(errors);
    if(errors){
        //errors.forEach(err => dispatch(setAlert(err.msg)));
    }
    dispatch({
        type: REGISTER_FAIL
    })
}
}

export const login = formData => async dispatch =>{
    console.log(formData);
    try{
        const res = await axios.get('/user',
            {
                params: {
                  emailId: formData.emailId,
                  password: formData.password
                }
        });
        console.log(res.data);
        if(res.data !== "failure"){{
            dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data
            });
            //dispatch(loadUser());
            
         }}
         else{
            dispatch({
                type: LOGIN_FAIL
            })
            alert("Invalid credentials!");
         }
        
        
    }catch(err){
        const errors = err.response.data.errors;
        console.log(errors);
        if(errors){
           // errors.forEach(err => dispatch(setAlert(err.msg)));
        }
        dispatch({
            type: LOGIN_FAIL
        })
    }
    };



export const logout = () => dispatch => {
    dispatch({type: LOGOUT});
}