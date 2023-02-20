import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { followUser, unfollowUser } from '../../Actions/userAction';
import './User.css';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const User = ({ person }) => {
  const dispatch = useDispatch();
  const envData = process.env.REACT_APP_PUBLIC_FOLDER;
  const { user } = useSelector((state) => state.authReducer.authData);
  const [following, setFollowing] = useState(person.followers.includes(user._id));
  const navigate = useNavigate()

  const handleFollow = () => {
    following ? dispatch(unfollowUser(person._id, user)) : dispatch(followUser(person._id, user));
    setFollowing((prev) => !prev);
  };
  return (
    <div className="follower">
      <div>
        <img
          src={person.profilePicture ? `${envData}/${person.profilePicture}` : `${envData}/profile.png`}
          alt=""
          className="followerImg"
        />
        <button style={{ textDecoration: 'none', color: 'inherit' , cursor: "pointer", border: 'none' }} onClick={() => navigate('/profile',{state: {id: person._id}})}>
          <div className="name">
            <span>{person.firstname}</span>
            <span>@{person.username}</span>
          </div>
        </button >
      </div>
      <button 
        className={following ? 'button fc-button unfollowButton size' : 'button fc-button size'}
        onClick={handleFollow}>
        {following ? 'Unfollow' : 'Follow'}
      </button>
    </div>
  );
};

export default User;
