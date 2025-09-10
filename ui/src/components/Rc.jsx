import React, { useState } from 'react'
import "../css/Rc.css"
import Notpop from './Notpop'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
const Rc = () => {
const nav = useNavigate()
const [name,setName] = useState("")
const [email,setEmail] = useState("")
const [pass,setPass] = useState("")
const[notpop,setNotpop] = useState(false)
const bkuri = import.meta.env.VITE_BACK;
const HandleRcClick =  async (e) =>{
  e.preventDefault()
  if(email && name && pass){
      
    console.log(name,"",email,"",pass)

const res = await axios.post(`${bkuri}/api/users/register`,{name:name,email:email,password:pass})

nav("/login")

  }setNotpop(true)
    
}
  return (
    <div className='Rcbox1'>
        <div className="Rcnamebox">REGISTER</div>
        <div className="Rcbox2">
            <input type="text" className='Rci' placeholder='Enter the name' value={name} onChange={(e)=>{setName(e.target.value)}}/>
            <input type="text" className='Rci'  placeholder='Enter the email' value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
            <input type="text" className='Rci' placeholder='Enter the password' value={pass} onChange={(e)=>{setPass(e.target.value)}}/>
        </div>
        <button onClick={HandleRcClick} className='RegiterBut'>Create Account</button>
        {notpop ? <Notpop setNotpop={setNotpop} /> : null }
    </div>
  )
}

export default Rc