import React, { useState, useRef } from 'react'
import './Signup.css'
import Logo from "../../Image/Letter-s-logo.png";
import { useFormik } from "formik"
import { signUpSchema } from "../../schemas";
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { signUp, otpVerification } from "../../Actions/authAction";


const SignUp = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const loading = useSelector((state) => state.authReducer.loading)
    const userData = useSelector((state) => state.authReducer.authData)
    const userId = userData?.user._id
    const [isSignUp, setIsSignUp] = useState(false)
    const [isOtp, setisOtp] = useState(false)
    const [show, setShow] = useState(false)
    const desc = useRef()

    const initialValues = {
        firstname: '',
        lastname: '',
        username: '',
        password: '',
        confirmpass: '',
    }
    const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
        initialValues: initialValues,
        validationSchema: signUpSchema,
        onSubmit: (values, action) => {
            console.log(values, '---------values')
            const user = values.username
            console.log(user, '-----------user')
            dispatch(signUp(values))
            setShow(true)
            action.resetForm()
        },
        onClick: (action) => {
            action.resetForm()
        }
    })
    // console.log(errors)  
    const handleSubmit2 = async (e) => {
        e.preventDefault()
        if (desc.current.value) {
            const otp = desc.current.value
            console.log(otp)
            console.log(userId,otp,'-----------user id and otp at signupu.jsx...............')
            dispatch(otpVerification(userId, otp))

        }
    }
    const handleLogin = () => {
        navigate('/login')
    }
    return (

        <div className="Auth">
            {/* Left side */}
            <div className="a-left">
                <img src={Logo} alt="" />
                <div className="Webname">
                    <h1>Spice App</h1>
                    <h6>Connecting world</h6>
                </div>
            </div>
            {/* Right Side */}
            <div className="a-right">
                {!show?
                    <form className="infoForm authForm" onSubmit={handleSubmit}>
                        <h3>SignUp</h3>
                        <div className="inputfields">
                            <div className="inputname">
                                <input
                                    type="text"
                                    name="firstname"
                                    id="firstname"
                                    placeholder="First Name"
                                    value={values.firstname}
                                    onChange={handleChange}
                                    onBlur={handleBlur}

                                    className="infoInput"

                                />
                                {errors.firstname && touched.firstname ? (
                                    <span className="form-error">{errors.firstname}</span>) : null}

                            </div>
                            <div className="inputname">
                                <input

                                    type="text"
                                    placeholder="Last Name"
                                    className="infoInput"
                                    name="lastname"
                                    id="lastname"
                                    value={values.lastname}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                {errors.lastname && touched.lastname ? (
                                    <span className="form-error">{errors.lastname}</span>) : null}
                            </div>

                        </div>


                        <div className="inputfields">
                            <div className="inputname">
                                <input
                                    type="email"
                                    placeholder="Email"
                                    className="infoInput"
                                    name="username"
                                    id="username"
                                    value={values.username}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                {errors.username && touched.username ? (
                                    <span className="form-error">{errors.username}</span>) : null}
                            </div>
                        </div>

                        <div className="inputfields">
                            <div className="inputname">
                                <input
                                    type="password"
                                    placeholder="Password"
                                    className="infoInput"
                                    name="password"
                                    id="password"
                                    value={values.password}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                {errors.password && touched.password ? (
                                    <span className="form-error">{errors.password}</span>) : null}
                            </div>

                            <div className="inputname">
                                <input

                                    type="password"
                                    placeholder="Confirm Password"
                                    className="infoInput"
                                    name="confirmpass"
                                    id="confirmpass"
                                    value={values.confirmpass}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                {errors.confirmpass && touched.confirmpass ? (
                                    <span className="form-error">{errors.confirmpass}</span>) : null}
                            </div>
                        </div>
                        <div>
                            <span style={{ fontSize: '12px', cursor: "pointer" }} onClick={handleLogin}>
                              Already Have Account Login here..!
                            </span>
                        </div>
                        <button className="button infoButton" type="submit" disabled={loading} >
                            Sign Up
                        </button>
                    </form>
                    :
                    <form onSubmit={handleSubmit2}>
                        <div className="inputfields">
                            <div className="inputname">
                                <input
                                    type="number"
                                    className="infoInput"
                                    name="otp"
                                    placeholder="OTP"
                                    ref={desc}
                                />
                            </div>
                        </div>
                        <button className="button infoButton" type="submit" >Otp Verify</button>
                    </form>
                }
            </div>
        </div>
    );
}

export default SignUp