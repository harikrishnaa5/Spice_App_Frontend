import * as UploadApi from '../Api/uploadRequest';

export const uploadImg = (data) => async (dispatch) => {
  try {
    console.log("image uploading");
    await UploadApi.uploadImage(data);
  } catch (error) {
    console.log(error);
  }
};

export const uploadPost = (data) => 
  async (dispatch) => {
    dispatch({ type: 'UPLOAD_START' });
    try {
      const newPost = await UploadApi.uploadPost(data);
      dispatch({ type: 'UPLOAD_SUCCESS', data: newPost.data });
    } catch (error) {
      console.log(error);
      dispatch({ type: 'UPLOAD_FAILED' });
    }
  };

