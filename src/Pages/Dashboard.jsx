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
          <h2 className='m-3'>Welcome <span className='text-primary'>{existingUser.username} </span></h2>
          <Col>
            {/* my projects*/}
            <MyProject />
          </Col>
          <Col>
            {/* my projects*/}
            <MyProfile />
          </Col> 
        </Row>
        
        <Row>
          <Col>

            <Link to='/projects'>
              <div className='text-center'>
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
