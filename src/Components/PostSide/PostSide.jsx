import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getTimelinePosts, getUserPost, showPost } from '../../Api/postRequest';
import Posts from '../Posts/Posts';
import PostShare from '../PostShare/PostShare';
import './PostSide.css';
import { useLocation } from 'react-router-dom';

const PostSide = ({select}) => {
  const [post, setpost] = useState([]);
  const location = useLocation()
  const { user } = useSelector((state) => state.authReducer.authData);
  let id = null
  
    
  const showallpost = async () => {
    if (select === 'profile') {
      id  = location.state.id
      const response = await getUserPost(id);
      
      setpost(response.data.showPost)
    }
    else{

      const response = await getTimelinePosts(user._id);
      console.log(response.data, 'lllll');
      setpost(response.data.currentUserPosts);
    }
    // const response = await showPost();
  };
  return (
    <div>
      <div className="PostSide">
        <PostShare showallpost={showallpost} />
        <Posts showallpost={showallpost} post={post} />
        {/* <Posts/> */}
      </div>
    </div>
  );
};

export default PostSide;
