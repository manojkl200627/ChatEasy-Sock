// // import React, { useEffect, useState } from 'react';
// // import UsersList from '../components/UsersList';
// // import ChatWindow from '../components/ChatWindow';
// // import { io } from "socket.io-client";
// // import { useNavigate } from "react-router-dom";
// // import "../css/Home.css"
// // const Home = () => {
// //   const [socket, setSocket] = useState(null);
// //   const [selectedUser, setSelectedUser] = useState(null);
// //   const navigate = useNavigate();

// //   // Connect socket
// //   useEffect(() => {
// //     const user = JSON.parse(localStorage.getItem("user"));
// //     if (!user) {
// //       navigate("/");   // if no user, redirect to login
// //       return;
// //     }
// //     const s = io("http://localhost:5173");
// //     s.emit("add-user", user._id);
// //     setSocket(s);

// //     return () => {
// //       s.disconnect(); // cleanup on unmount
// //     };
// //   }, [navigate]);

// //   // Handle logout
// //   const handleLogout = () => {
// //     localStorage.removeItem("token");
// //     localStorage.removeItem("user");
// //     if (socket) socket.disconnect();
// //     navigate("/"); // back to login
// //   };

// //   return (
// //     <div className="home-container">
// //   {/* Sidebar */}
// //   <div className="sidebar">
// //   <div className="sidebar-header">
// //     <h2>Users</h2>
// //     <button onClick={handleLogout} className="logout-btn">Logout</button>
// //   </div>
// //   <div className="users-list">
// //     <UsersList onSelect={setSelectedUser} />
// //   </div>
// // </div>

// // {/* Chat Window */}
// // <div className="chat-window">
// //   {selectedUser ? (
// //     <ChatWindow socket={socket} selectedUser={selectedUser} />
// //   ) : (
// //     <div className="empty">Select a user to start chatting</div>
// //   )}
// // </div>

// // </div>

// //   );
// // };

// // export default Home;




// import React from 'react'
// import Hc from '../components/Hc'
// import { useNavigate,useEffect } from 'react-router-dom'
// const Home = () => {
//   const nav = useNavigate()
//   const[token,setToken] = useState("")
//   useEffect(()=>{
//       setToken(localStorage.getItem("token"));

//   },[])
//   // if(token===""){
//   //   return nav("/login")
//   // }
//     return ( 
//   token==="" ? nav("/login"):<div><Hc setToken={setToken} /></div>
//   )
  
  
// }

// export default Home

import React, { useEffect, useState } from 'react';
import Hc from '../components/Hc';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    
    if (!token) {
      navigate("/login");
    } else {
      setShouldRender(true);
    }
  }, [navigate]);

  // Don't render anything until we know if user is authenticated
  if (!shouldRender) {
    return null;
  }

  return <Hc/>;
};

export default Home;