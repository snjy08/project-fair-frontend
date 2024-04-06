import React from 'react'
import profile from '../Assets/profile.jpg'

function MyProfile({user}) {
  return (
    <div className=' bg-black p-3 text-center shadow rounded'>
        <h3>My Profile</h3>
<label>
<input type="file" style={{display:'none'}} />
     <img className='img-fluid' src={profile} alt="" style={{width:'200px'}} />
     </label>

<div>
            <input value={user.username} type="text" placeholder='Username' className='form-control mb-3 text-center bg-black text-white' disabled />
           <a href={`${user.github}`} target='_blank' style={{textDecoration:'none'}} className='bg py-2 px-5 rounded'>GitHub Link </a><br /><br />
           <a href={`${user.link}`} target='_blank' style={{textDecoration:'none'}} className='bg py-2 px-4 rounded'>LinkedIn Profile</a><br />
        </div>

    </div>
  )
}

export default MyProfile