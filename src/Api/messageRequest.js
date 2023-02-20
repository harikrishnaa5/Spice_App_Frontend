import axios from 'axios';

// const API = axios.create({ baseURL: 'http://localhost:5000' });
const API = axios.create({ baseURL:process.env.REACT_APP_BASE_PORT });
API.interceptors.request.use((req) => {
    if (localStorage.getItem('profile')) {
      req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }
  
    return req;
  });
  API.interceptors.response.use((response) => response,
  err=>{
    if(err.response?.data==='user is blocked' || 'user-not-exist')
    {
      // alert('user is blocked')
      // localStorage.clear();
      // window.location.href='/login'
    }
  } )
export const getMessages = (id) => API.get(`/message/${id}`);

export const addMessage = (data) => API.post('/message/', data);
