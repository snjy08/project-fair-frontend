import React from 'react'

function MyProfile() {
  return (
    <div className='text-center'>
        <h3>My Profile</h3>
<label>
<input type="file" style={{display:'none'}} />
        <br /> <br />
<br /></label>
<br />
<div className='w-50 ' style={{marginLeft:'240px'}}>
<input type="text" placeholder='User Name' className='form-control mb-3' />
<input type="text" placeholder='git hub' className='form-control mb-3' />
<input type="text" placeholder='LinkedIn' className='form-control mb-3' />
</div>
    </div>
  )
}

export default MyProfile