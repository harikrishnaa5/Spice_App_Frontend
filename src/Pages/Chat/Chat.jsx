import React, { useEffect, useRef, useState } from 'react';
import LogoSearch from '../../Components/LogoSearch/LogoSearch';
import { useDispatch, useSelector } from 'react-redux';
import './Chat.css';
import { userChats } from '../../Api/chatRequest';
import Conversation from '../../Components/Conversation/Conversation';
import { Link } from 'react-router-dom';
import { UilSetting } from '@iconscout/react-unicons';
import Home from '../../Image/home.png';
import Notification from '../../Image/noti.png';
import Comment from '../../Image/comment.png';
import ChatBox from '../../Components/ChatBox/ChatBox';
import { io } from 'socket.io-client';

const Chat = () => {
  const { user } = useSelector((state) => state.authReducer.authData);
  const [chats, setChats] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [sendMessage, setSendMessage] = useState(null);
  const [recieveMessage, setRecieveMessage] = useState(null);
  const socket = useRef();

  //send Message to Socket Server
  useEffect(() => {
    console.log(sendMessage,"oooooooooooooooooooooooooo")
    if (sendMessage !== null) {
      socket.current.emit('send-message', sendMessage);
    }
  }, [sendMessage]);

  useEffect(() => {
    socket.current = io(process.env.REACT_APP_BASE_PORT);
    socket.current.emit('new-user-add', user._id);
    socket.current.on('get-users', (users) => {
      setOnlineUsers(users);
      console.log(onlineUsers, 'onlineUsers');
    });
  }, [user]);

  //recieve Message from Socket Server
  useEffect(() => {
    socket.current.on('recieve-message', (data) => {
      setRecieveMessage(data);
    });
  }, []);

  useEffect(() => {
    const getChats = async () => {
      try {
        
        const { data } = await userChats(user._id);
        setChats(data);
      } catch (error) {
        console.log(error);
      }
    };
    getChats();
  }, [user]);

  const checkOnlineStatus = (chat) => {
    const chatMember = chat.members.find((member) => member !== user._id)
    const online = onlineUsers.find((user) => user.userId === chatMember)
    return online ? true : false;
  };

  return (
    // LEFT SIDE
    <div className="Chat">
      <div className="Left-Side-Chat">
        <LogoSearch />
        <div className="Chat-Container">
          <h2>Chats</h2>
          <div className="Chat-List">
            {chats.map((chat) => (
              <div onClick={() => setCurrentChat(chat)}>
                <Conversation data={chat} currentUserId={user._id} online={checkOnlineStatus(chat)} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="Right-Side-Chat">
        <div style={{ width: '20rem', alignSelf: 'flex-end' }}>
          <div className="navIcons">
            <Link to="../home">
              <img src={Home} alt="" />
            </Link>
            <UilSetting />
            <img src={Notification} alt="" />
            <Link to="../chat">
              <img src={Comment} alt="" />
            </Link>
          </div>
        </div>

        {/* CHAT BODY */}
        <ChatBox
          chat={currentChat}
          currentUser={user._id}
          setSendMessage={setSendMessage}
          recieveMessage={recieveMessage}
        />
      </div>
    </div>
  );
};

export default Chat;


