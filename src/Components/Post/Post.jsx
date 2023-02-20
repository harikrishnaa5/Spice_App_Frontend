import React, { useRef } from "react";
import { Menu, Button, Modal } from "@mantine/core";
import "./Post.css";
import { UilTimes } from "@iconscout/react-unicons";
import Comment from "../../Image/comment.png";

import Heart from "../../Image/like.png";
import NotLike from "../../Image/notlike.png";
import ComentBox from "../ComentBox/ComentBox";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { deletePost, likePost, reportPost, updatePost } from "../../Api/postRequest";
import { getTimelinePosts } from "../../Actions/postAction";
const Post = ({ data, allpost }) => {
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.authReducer.authData);
  const [selectedValue, setSelectedValue] = useState("");
  const [report, setReport] = useState(false);
  const [liked, setLiked] = useState(data.likes.includes(user._id));
  const [likes, setLikes] = useState(data.likes.length);
  const [comment, setComent] = useState("");
   const [edit,setEdit] = useState(false);
   const[caption,setCaption] = useState(data.desc)
 
  const desc = useRef();

  const handleLike = () => {
    likePost(data._id, user._id);
    setLiked((prev) => !prev);
    liked ? setLikes((prev) => prev - 1) : setLikes((prev) => prev + 1);
  };

  const handleChange = (e) => {
    setSelectedValue(e.target.value);
  };

  const handleReport = async (e) => {
    e.preventDefault();
    setReport(false)
    const postId = data._id;
    const reportData = {
      userId: user._id,
      reason: selectedValue,
      postId
    };
    const response= await reportPost(reportData)
    allpost()
  };
  const handleUpdate = async (e) => {
    e.preventDefault();
    const body = desc.current.value;
    const posts = await updatePost(body,data._id)
    dispatch(getTimelinePosts(user._id));
    setEdit(false)
    setCaption(body)
     allpost()
  }
  const handleDelete = async (e) => {
    e.preventDefault()
    deletePost(data._id)
    allpost()
  }
  return (
    <div className="Post">
      <div className="details">
        <span>
          <h4>
            <span className="name-and-report">
              {data.userId.firstname} {data.userId.lastname}
              <Menu shadow="md" width={200}>
                <Menu.Target>
                  <b>. . .</b>
                </Menu.Target>

                <Menu.Dropdown>
                  {user._id === data.userId._id ? (
                    <Menu.Item onClick={handleDelete}
                      icon={
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          class="icon icon-tabler icon-tabler-trash"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="#2c3e50"
                          fill="none"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        >
                          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                          <line x1="4" y1="7" x2="20" y2="7" />
                          <line x1="10" y1="11" x2="10" y2="17" />
                          <line x1="14" y1="11" x2="14" y2="17" />
                          <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
                          <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
                        </svg>
                      }
                    >
                      Delete
                    </Menu.Item>
                  ) : (
                    <Menu.Item
                      onClick={() => setReport(!report)}
                      icon={
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          class="icon icon-tabler icon-tabler-message-report"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="#2c3e50"
                          fill="none"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        >
                          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                          <path d="M4 21v-13a3 3 0 0 1 3 -3h10a3 3 0 0 1 3 3v6a3 3 0 0 1 -3 3h-9l-4 4" />
                          <line x1="12" y1="8" x2="12" y2="11" />
                          <line x1="12" y1="14" x2="12" y2="14.01" />
                        </svg>
                      }
                    >
                      Report
                    </Menu.Item>
                  )}
                  {user._id === data.userId._id && (
                    <Menu.Item
                    onClick={()=>setEdit(!edit)}
                      icon={
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          class="icon icon-tabler icon-tabler-edit"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="#2c3e50"
                          fill="none"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        >
                          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                          <path d="M9 7h-3a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-3" />
                          <path d="M9 15h3l8.5 -8.5a1.5 1.5 0 0 0 -3 -3l-8.5 8.5v3" />
                          <line x1="16" y1="5" x2="19" y2="8" />
                        </svg>
                      }
                    >
                      Edit
                    </Menu.Item>
                  )}
                </Menu.Dropdown>
              </Menu>
            </span>
            <br />
            {report && (
              <Modal
                centered
                onClose={() => setReport(false)}
                opened={report}
                withCloseButton={true}
              >
                <div className="Report">
                  <form
                    action=""
                    className="reportForm"
                    onSubmit={handleReport}
                  >
                    <h3>Why are you reporting this post?</h3>
                    <li>
                      <input
                        type="radio"
                        name="report"
                        checked={selectedValue === "Spam"}
                        value="Spam"
                        onChange={handleChange}
                      />
                      <label htmlFor="">Spam</label>
                    </li>
                    <li>
                      <input
                        type="radio"
                        name="report"
                        value="Nudity or sexual activity"
                        onChange={handleChange}
                        checked={selectedValue === "Nudity or sexual activity"}
                      />
                      <label htmlFor="">Nudity or sexual activity</label>
                    </li>

                    <li>
                      <input
                        type="radio"
                        name="report"
                        value="Suicide or self-injury"
                        onChange={handleChange}
                        checked={selectedValue === "Suicide or self-injury"}
                      />
                      <label htmlFor="">Suicide or self-injury</label>
                    </li>

                    <li>
                      <input
                        type="radio"
                        name="report"
                        value="Scams or fraud"
                        onChange={handleChange}
                        checked={selectedValue === "Scams or fraud"}
                      />
                      <label htmlFor="">Scams or fraud</label>
                    </li>
                    <li>
                      <input
                        type="radio"
                        name="report"
                        value="False information"
                        onChange={handleChange}
                        checked={selectedValue === "False information"}
                      />
                      <label htmlFor="">False information</label>
                    </li>

                    {selectedValue === "" ? (
                      <button disabled className="button reportButton">
                        Report
                      </button>
                    ) : (
                      <button className="button reportButton">Report</button>
                    )}
                  </form>
                </div>
              </Modal>
            )}

  {edit ? <div className="edit">
          <UilTimes
            style={{ cursor: "pointer" }}
            onClick={() => setEdit((prev) => !prev)}
          />
          <input
            autoFocus
            required
            ref={desc}
            defaultValue={data.desc}
            type="text"
          />
          <div className="postOptions">
            <button onClick={handleUpdate} className="button ps-button" >
              Update
            </button>
          </div>
        </div>:
            <span className="small">{caption}</span>}
          </h4>
        </span> 
      </div>
      <img
        src={data.image ? `${process.env.REACT_APP_PUBLIC_FOLDER}/${data.image}`: ""}
      />

      <div className="postReact">
        <div>{data.firstname}</div>
        <img
          src={liked ? Heart : NotLike}
          alt=""
          style={{ cursor: "pointer" }}
          onClick={handleLike}
        />
        <img src={Comment} alt="" onClick={() => setComent(!comment)} style ={{cursor: "pointer"}}/>
      </div>

      <span style={{ color: "var(--gray)", fontSize: "12px" }}>
        {likes} likes
      </span>

      <div>{comment && <ComentBox postid={data._id} allposts={allpost} />}</div>
    </div>
  );
};

export default Post;
