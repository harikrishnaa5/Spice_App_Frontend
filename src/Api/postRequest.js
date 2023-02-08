import axios from 'axios';
// const profile = localStorage?.getItem('profile');
// const { token } = JSON.parse(profile);
// const API = axios.create({ baseURL: 'http://localhost:5000', headers: { authorization: token } });
// const API = axios.create({ baseURL: 'http://localhost:5000' });
const API = axios.create({ baseURL: process.env.BASE_PORT });

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
      window.location.href='/login'
    }
  }
  )
export const getTimelinePosts = (id) => API.get(`/posts/${id}/timeline`);

export const likePost = (id, userId) => API.put(`/posts/${id}/like`, { userId: userId });

export const commentPost = (body, postid, userId) =>  API.post('/posts/addComment',{body,postid,userId})

export const showCommetn = (postid) => API.post('/posts/showComments',{postid})

export const showPost = () => API.post('/posts/showPosts')

export const getUserPost = (id) => API.get(`/posts/${id}/getUserPost`)

export const reportPost = id=>API.put(`/posts/${id}`)

export const deletePost = (id) => API.delete(`/posts/${id}`)

export const updatePost = (body, postId) => API.put(`/posts/`, {desc:body,postId})
