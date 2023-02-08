import axios from "axios"

// const API = axios.create({baseURL:"http://localhost:5000"})
const API = axios.create({ baseURL: process.env.BASE_PORT });

export const logIn = (formData)=>API.post('/login',formData)

export const signUp = (formData)=>API.post('/register',formData)
//console.log('--------auth req API')

export const otpVerify =async (userId,otp) => await API.post('/otpverify', {userId,otp})
//console.log('---------otpverify authreq')


//admin

export const adminLogin=(FormData)=>API.post('/auth-admin/login',FormData);