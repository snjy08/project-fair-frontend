import React from 'react'
import {
    MDBContainer,
    MDBNavbar,
    MDBNavbarBrand
  } from 'mdb-react-ui-kit';
import { useNavigate } from 'react-router-dom';

function Header() {
  const location = useNavigate()
  const logout=()=>{
    sessionStorage.clear();
    location('/')
  }
  return (
    <div>
       <MDBNavbar light bgColor='dark'>
        <MDBContainer fluid>
          <MDBNavbarBrand href='#'>
           <i style={{color:'white'}} class="fa-solid fa-laptop-file fa-fade ex-3 fs-2 "></i>
            <h2>Project Fair</h2>
          </MDBNavbarBrand>
       <button onClick={logout}><i className='fa-solid fa-right-from-bracket m-2'></i></button>
        </MDBContainer>
      </MDBNavbar>
    </div>
  )
}

export default Header
