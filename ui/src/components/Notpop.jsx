import React from 'react'

const Notpop = ({setNotpop}) => {
  return (
    <div>
        <div className="boxntp1">
            Please enter full details
            <button onClick={(e)=>{
                e.preventDefault()
                setNotpop(false)
            }}>close</button>
        </div>
    </div>
  )
}

export default Notpop