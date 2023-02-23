import React from 'react'
import './ErrorPage.css'
import { Link } from 'react-router-dom';

const ErrorPage = () => {
  return (
    <div className='error-container'>
        <h1>Oops ..... something went wrong!!!</h1>
        
            <Link className='back-home' to="../home">
            Back to home page
        </Link>
    </div>
  )
}

export default ErrorPage