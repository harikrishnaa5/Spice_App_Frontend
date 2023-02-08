import * as AuthApi from '../Api/authRequest';

export const logIn = (formData) => async (dispatch) => {
  dispatch({ type: 'AUTH_START' });
  try {
    const { data } = await AuthApi.logIn(formData);
    dispatch({ type: 'AUTH_SUCCESS', data: data });
  } catch (error) {
    console.log(error);
    dispatch({ type: 'AUTH_FAILED' });
  }
};

export const signUp = (formData) => async (dispatch) => {
  dispatch({ type: 'AUTH_START' });
  try {
    const { data } = await AuthApi.signUp(formData);
    dispatch({ type: 'AUTH_SUCCESS', data: data });
  } catch (error) {
    console.log(error);
    dispatch({ type: 'AUTH_FAILED' });
  }
};

export const logout = () => async (dispatch) => {
  dispatch({ type: 'LOG_OUT' });
};

export const otpVerification = (userId,otp) => async (dispatch)=>{
 

  dispatch({type:"OTP_START"})

  try {
      const { data } = await AuthApi.otpVerify(userId, otp)
      // console.log(data, "data at authaction otp verification")
      dispatch({ type: "OTP_SUCCESS", data: data })

  } catch (error) {
      console.log(error)
      dispatch({ type: "OTP_FAIL" })

  }
}

export const adminLogin = (FormData) => async (dispatch) => {
  dispatch({ type: "ADMIN_AUTH_START" });
  try {
    const { data } = await AuthApi.adminLogin(FormData);
    dispatch({ type: "ADMIN_AUTH_SUCCESS", data: data});

  } catch (error) {
    console.log(error);
    dispatch({ type: "ADMIN_AUTH_FAIL", message:error.message });
    toast.error(error.response.data)
  }
};

export const adminLogout=()=>async(dispatch)=>{
  dispatch({type:'ADMIN_LOGOUT'});
}