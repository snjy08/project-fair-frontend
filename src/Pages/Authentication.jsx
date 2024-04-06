import React, { useState } from 'react'
import { Link ,json , useNavigate } from 'react-router-dom'
import { loginAPI, registerAPI } from '../services/allAPIs'
import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand
} from 'mdb-react-ui-kit';
function Authentication({ register }) {
  const location = useNavigate()

  const isRegisterfrom = register ? true : false

  //state creation-
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
    github:" ",
    link:" "
  })

//register
  const registerData=async()=>{
    const {username,email,password,github,link} = userData
    if(!username || !email || !password || !github || !link){
      alert('please fill the form ;)')
    }
    else{
      //apicall
      const result = await registerAPI(userData)
      console.log(result);
      if(result.status == 200){
        //api call
        alert(`${result.data}`)
        location('/login')
       
      }
      else{
        alert(result.response.data)
      }
    }
    console.log(userData);
  }

//login function
const loginData = async()=>{
  const {email,password} = userData;
  if (!email || !password) {
    alert("please enter valid details")
  }
  else{
    const result = await loginAPI(userData)
    console.log(result);
   if(result.status == 200){
    alert("login successfull")
    sessionStorage.setItem("existingUser",JSON.stringify(result.data.existingUser))
    sessionStorage.setItem("token",result.data.token)
    location("/dashboard")
   }
  }
}
  return (
    <div>
        <MDBNavbar light bgColor='dark'>
        <MDBContainer fluid>
          <MDBNavbarBrand href='#'>
           <i style={{color:'white'}} class="fa-solid fa-laptop-file fa-fade ex-3 fs-2 "></i>
            <h2>Project Fair</h2>
          </MDBNavbarBrand>
        </MDBContainer>
      </MDBNavbar>
    <div className='d-flex flex-column justify-content-center align-items-center' style={{ width: '100%', height: '850px' }}>
      <div style={{ height: '000px' }}>

      </div>

      <div className='container '>
        <div className="row">
          <div className="col">
            {/* image*/}
            <img src="https://t4.ftcdn.net/jpg/03/11/50/71/360_F_311507184_0mErEL2kUw7z4AbXhsxPjFE7hQnY7BLy.jpg" width={'100%'} height={'100%'} alt="" />
          </div>
          <div className="col shadow card p-5">
            {/*input*/}
            <h3 className='text-center'>project fair</h3>
            <h5 className='m-3 text-center'>
              {
                isRegisterfrom ? 'Sign Up' : 'Login Here'
              }
            </h5>

            <form>
              {
                isRegisterfrom &&
                <>
                <input type="text" value={userData.username} onChange={e=>setUserData({...userData, username: e.target.value})} className='form-control mb-3' placeholder='Enter Name' />
                <input type="text" value={userData.github} onChange={e => setUserData({ ...userData, github: e.target.value })} placeholder='github link' className='form-control mb-3' />
                <input type="text" value={userData.link} onChange={e => setUserData({ ...userData, link: e.target.value })} placeholder='Linkedin link' className='form-control mb-3' />
                </>
              }
              <input type="text" value={userData.email} onChange={e=>setUserData({...userData,email:e.target.value})} className='form-control mb-3' placeholder='Enter email' />
              <input type="text" value={userData.password} onChange={e=>setUserData({...userData,password:e.target.value})}  className='form-control mb-3' placeholder='Enter password' />

            </form>
            {
              isRegisterfrom ?
                <div className='text-center m-3'>
                  <button onClick={registerData} className='btn btn-success'>register</button>
                  <Link to={'/login'} style={{ textDecoration: 'none', color: 'white' }}>
                    <br />
                    <p className='m-3'>already register? please login from here</p>
                  </Link>
                </div>
                :
                <div className='text-center m-3'>
                  <button className='btn btn-success' onClick={loginData}>login</button>
                  <Link to={'/register'} style={{ textDecoration: 'none', color: 'white' }}>
                    <br />
                    <p className='m-3'>new to here? please resgister.</p>
                  </Link>
                </div>
            }
          </div>
        </div>
      </div>
      <br />
      <div className='text-center mb-5 '>
        <Link to={'/'}>
          <button className='btn btn-dark'>Back to Home</button>
        </Link>
        <br />
      </div>
    </div>
</div>
  )
}

export default Authentication
