import React, { useState, useRef } from 'react';
import './PostShare.css';
import { UilScenery } from '@iconscout/react-unicons';
import { UilPlayCircle } from '@iconscout/react-unicons';
import { UilLocationPoint } from '@iconscout/react-unicons';
import { UilSchedule } from '@iconscout/react-unicons';
import { UilTimes } from '@iconscout/react-unicons';
import * as UploadApi from '../../Api/uploadRequest';
import { toast, Toaster } from "react-hot-toast";

import { useDispatch, useSelector } from 'react-redux';
import { uploadImg, uploadPost } from '../../Actions/uploadAction';

const PostShare = ({ showallpost }) => {
  const loading = useSelector((state) => state.postReducer.uploading);
  const [image, setImage] = useState(null);
  const imageRef = useRef();
  const dispatch = useDispatch();
  const desc = useRef();
  const { user } = useSelector((state) => state.authReducer.authData);
  const envData = process.env.REACT_APP_PUBLIC_FOLDER;

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      if(!img.name.match(/\.(jpg|jpeg|png|gif)$/)){
        toast.warning('File should be in image format', {
          
      });
      }
      else{
        setImage(img);
        toast.success('Uploaded successfully')
      }
      
    }
  };

  const reset = () => {
    setImage(null);
    desc.current.value = '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const description = desc.current.value.trim();

    const newPost = {
      userId: user._id,
      desc: description
    };
    
    if (image) {
      const data = new FormData();
      const filename = Date.now() + image.name;
      data.append('name', filename);
      data.append('file', image);
      newPost.image = filename;

      console.log(newPost, 'new');

      try {
        dispatch(uploadImg(data));
      } catch (error) {
        console.log(error);
      }
    }
    
    //  dispatch(uploadPost(newPost))
    if (!image && !description) return undefined;
    const res = await UploadApi.uploadPost(newPost);
    showallpost();
    reset();
  };

  return (
    <div className="PostShare">
      <img
        src={user.profilePicture ? `${envData}/${user.profilePicture}` : `${envData}/profile.png`}
        alt=""
      />
      <div>
        <input ref={desc} required type="text" placeholder="What's Happening" />
        <div className="postOptions">
          <div
            className="option"
            style={{ color: 'var(--photo)' }}
            onClick={() => imageRef.current.click()}>
            <UilScenery />
            Photos
          </div>
          <div className="option" style={{ color: 'var(--video)' }}>
            <UilPlayCircle />
            Videos
          </div>
          <div className="option" style={{ color: 'var(--location)' }}>
            <UilLocationPoint />
            Location
          </div>
          <div className="option" style={{ color: 'var(--schedule)' }}>
            <UilSchedule />
            Schedule
          </div>
          <button className="button ps-button" onClick={handleSubmit} disabled={loading}>
            {loading ? 'uploading...' : 'Share'}
          </button>
          <div style={{ display: 'none' }}>
            
            <input type="file" name="myImage" ref={imageRef} accept="image/png ,image/webp, image/png, image/jpg, image/jpeg" onChange={onImageChange} />
            <Toaster/>
          </div>
        </div>
        {image && (
          <div className="previewImage">
            <UilTimes onClick={() => setImage(null)} />
            <img src={URL.createObjectURL(image)} alt="" />
          </div>
        )}
      </div>
    </div>
  );
};

export default PostShare;
