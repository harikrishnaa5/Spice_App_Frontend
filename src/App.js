import './App.css';

import Home from './Pages/home/Home';
import Chat from './Pages/Chat/Chat';
import Profile from './Pages/Profile/Profile';
import { Navigate, Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Login from './Pages/Login/Login';
import SignUp from './Pages/Signup/Signup';
import AdminLogin from './Pages/Login/AdminLogin';
import Admin from './Pages/Admin/Admin';
import ErrorPage from './Pages/Error/ErrorPage';


function App() {
  const user = useSelector((state) => state.authReducer.authData);
 const admin = useSelector((state) => state.adminAuthReducer.adminAuthData);
 console.log(process.env.REACT_APP_BASE_PORT)
  return (
    <div className="App">
      <div className="blur" style={{ top: '-18%', right: '0' }}></div>
      <div className="blur" style={{ top: '36%', left: '-8rem' }}></div>
      <Routes>
        <Route path="/" element={user ?.user.verified? <Navigate to="home" /> : <Navigate to="login" />} />
        <Route path="/home" element={user ?.user.verified? <Home /> : <Navigate to="../login" />} />
        <Route path='/login' element = {user?.user.verified?<Navigate to = "../home"/>:<Login/> }/>
        <Route path='/signup' element = {user?.user.verified?<Navigate to = "../home"/>:<SignUp/> }/>
        <Route path="/profile" element={user ?.user.verified? <Profile /> : <Navigate to="../login" />} />
        <Route path="/chat" element={user ?.user.verified? <Chat /> : <Navigate to="../login" />} />
        {/* Admin route */}
        <Route path="/admin-login" element={admin? <Navigate to='/admin'/>: <AdminLogin />}/>
        <Route path="/admin" element={admin?<Admin />: <Navigate to='/admin-login'/>}/>
        <Route path='*' element={<ErrorPage/>}/>
      </Routes>
      {/* <Home /> */}
      {/* <Profile/> */}
      {/* <Auth /> */}
      {/* <Signin/> */}
     
    </div>
  );
}

export default App;
