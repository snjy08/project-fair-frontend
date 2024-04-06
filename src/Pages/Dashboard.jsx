import React from 'react'
import Col from 'react-bootstrap/esm/Col'
import Row from 'react-bootstrap/esm/Row'
import MyProject from '../Components/MyProject'
import MyProfile from '../Components/MyProfile'
import { Link } from 'react-router-dom'
import Header from '../Components/Header'

function Dashboard() {
  const existingUser = JSON.parse(sessionStorage.getItem("existingUser"));
  return (

    <div>
<Header/>
      <div>
        <Row>
          <h2 className='m-3 '>Welcome <span className='text-primary'>{existingUser.username} </span></h2>
          <Col className='m-3'>
            {/* my projects*/}
            <MyProject />
          </Col>
          <Col className='mt-3 col-12 col-sm-12 col-md-12 col-lg-6 col-xl-4 col-xxl-4'>
            {/* my projects*/}
            <MyProfile user={existingUser} />
          </Col> 
        </Row>
        
        <Row>
          <Col>

            <Link to='/projects'>
              <div className='text-center mx-auto my-5'>
                <button className='btn btn-outline-primary m-4 shadow '>View Projects</button>
              </div>
            </Link>

          </Col>
        </Row>
      </div>
    </div>
  )
}

export default Dashboard
