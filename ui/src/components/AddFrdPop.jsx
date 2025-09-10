import React, { useState,useEffect } from 'react'
import "../css/AddFrdPop.css"
import axios from 'axios'
const AddFrdPop = ({setadd}) => {

const [email,setEmail] = useState("")
const [currentUser, setCurrentUser] = useState(null);
const bkuri = import.meta.env.VITE_BACK;
useEffect(() => {
    const u = JSON.parse(localStorage.getItem("user") || "null");
    if (u && u._id) {
      console.log("Current user:", u._id);
      setCurrentUser(u._id);
    }
  }, []);

const HandleAddfrdCkick=async ()=>{


try {

    const res = await axios.post(`${bkuri}/api/users/frds/${currentUser}`,{email})
    console.log(res)
} catch (error) {
    console.log(error)
}
    
}
const HandleAddfrdCkick2 =(e)=>{
    
    setadd(false)
    window.location.reload()
}

  return (
    <div className='mainbox1afp'>
    
            
        
        
        <div className="boxAfp2">
            <div className="namboxadp">Add Friend</div>
           
        
                <input className='inputaf' type="text" value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
                <button className='buttaf' onClick={HandleAddfrdCkick}>ADD</button>
                <button className='buttaf' onClick={HandleAddfrdCkick2}>CLOSE</button>
        </div>
    </div>
  )
}

export default AddFrdPop