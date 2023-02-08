import axios from "axios"

// const API = axios.create({baseURL:"http://localhost:5000"})
const API = axios.create({ baseURL: process.env.BASE_PORT });

export const blockUser=(id)=>API.put(`/admin/block/${id}`);
export const activateUser=(id)=>API.put(`/admin/activate/${id}`);
export const getAllPosts=()=>API.get('/admin/posts');
export const removePost=(id)=>API.delete(`/admin/remove/${id}`);
export const getAlluser = () => API.get('/admin/user');
