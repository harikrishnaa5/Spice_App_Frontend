import React, { useEffect, useState } from 'react';
import './ProfileCard.css';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { getUser } from '../../Api/userRequest';
import { API } from '../../Api/chatRequest';


const ProfileCard = ({ location }) => {
 
  
  const { user } = useSelector((state) => state.authReducer.authData);
  const envData = process.env.REACT_APP_PUBLIC_FOLDER;
  const posts = useSelector((state) => state.postReducer.posts);
  const { id } = useParams();
  console.log(id, '--------search user id');
  const [nameSearch, setNameSearch] = useState(null);
  const [refresh, setRefresh] = useState(false);
  const [count, setCount] = useState([])
  console.log(id,' dddddddddddddddd');

  const fetchFollowers = async () => {
    if (id) {
     console.log(id,' dddddddddddddddd');
      const { data } = await API.get(`/user/${id}`);
      console.log(data, '-----------datasett');
      setNameSearch(data);
      setRefresh(true);
    }
  };
  useEffect(() => {
    fetchFollowers();
    userPost()
  }, [refresh]);
 const userPost = async() => {
console.log(id,"IIIIIIIIIIIIIIIIID")
 if(id)
 { const postCount = await getUser(id)
  console.log(postCount.data.allPosts,'-----------postCount--');
  setCount(postCount.data.allPosts)
 }
 }
  return (
    <div className="ProfileCard">
      <div className="ProfileImages">
        {!nameSearch ? (
          <img
            src={user.coverPicture ? envData + user.coverPicture : envData + 'cover.jpg'}
            alt=""
          />
        ) : (
          <img
            src={
              nameSearch.coverPicture ? envData + nameSearch.coverPicture : envData + 'cover.jpg'
            }
            alt=""
          />
        )}
        {!nameSearch ? (
          <img
            src={user.profilePicture ? envData + user.profilePicture : envData + 'profile.png'}
            alt=""
          />
        ) : (
          <img
            src={
              nameSearch.profilePicture
                ? envData + nameSearch.profilePicture
                : envData + 'profile.png'
            }
            alt=""
          />
        )}
      </div>

      <div className="ProfileName">
        {!nameSearch ? (
          <span>
            {user.firstname} {user.lastname}
          </span>
        ) : (
          <span>
            {nameSearch.firstname} {nameSearch.lastname}
          </span>
        )}
        {!nameSearch ? (
          <span>{user.worksAt ? user.worksAt : 'Complete Your Profile'}</span>
        ) : (
          <span>{nameSearch.worksAt ? nameSearch.worksAt : 'Complete Your Profile'}</span>
        )}
      </div>

      <div className="followStatus">
        <hr />
        <div>
          <div className="follow">
            {!nameSearch ? (
              <span>{user.following.length}</span>
            ) : (
              <span>{nameSearch.following.length}</span>
            )}
            <span>Following</span>
          </div>
          <div className="vl"></div>
          <div className="follow">
            {!nameSearch ? (
              <span>{user.followers.length}</span>
            ) : (
              <span>{nameSearch.followers.length}</span>
            )}
            <span>Followers</span>
          </div>

          {location === 'profilePage' && (
            <>
              <div className="vl"></div>
              <div className="follow">
                {/* <span>{posts.filter((post) => post.userId === user._id).length}</span> */}
                <span>{count.length}</span>
                <span>Posts</span>
              </div>
            </>
          )}
        </div>
        <hr />
      </div>

      {location === 'profilePage' ? (
        ''
      ) : (
        <span>
          <Link style={{ textDecoration: 'none', color: 'inherit' }} to={`/profile/${user._id}`}>
            My Profile
          </Link>
        </span>
      )}
    </div>
  );
};

export default ProfileCard;
