import React, { useEffect, useState } from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import ProjectCard from '../Components/ProjectCard'
import TitleImage from '../Assets/pexels-christina-morillo-1181427.jpg'
import { Link } from 'react-router-dom'
import { getHomeProjectAPI } from '../services/allAPIs'
import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand
} from 'mdb-react-ui-kit';

function Home() {
  // to hold the 3 api project details
  const [homeProject, setHomeProject] = useState([])

  // api call to get the home project details from the mongodb
  const getHomeProject = async () => {
    const result = await getHomeProjectAPI();
    console.log(result);
    if (result.status == 200) {
      setHomeProject(result.data)
    } else {
      console.log(result.response.message);
    }
  }

  console.log(homeProject);

  useEffect(() => {
    getHomeProject()
  }, [])


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
      <div className="container">
        <div className="row">
          <div className="col-6 ">
            <h1 className='text-center m-4'>Project Fair</h1>
            <p>Project management is the use of specific knowledge, skills, tools and techniques to deliver something of value to people.The development of software for an improved business process, the construction of a building, the relief effort after a natural disaster, the expansion of sales into a new geographic market—these are all examples of projects.</p>
            <div className='text-center'>
              <Link to={'/login'}>
                <button className='btn btn-outline m-3 shadow '>Get Started</button>
              </Link>
            </div>
          </div>
          <div className="col-6">
            <img src={TitleImage} alt="" height={'320px'} style={{ margin: '5px' }} />
          </div>
        </div>
        <div className="row">
          <div className="col">
            <h2 className='text-center m-4'>Explore our Projects</h2>
            <marquee >
              <div>
              <Row>
                  {
                    homeProject.length > 0 ? homeProject.map((item) => (

                      <Col>
                        <ProjectCard project={item} />
                      </Col>

                    )) : "empty"
                  }
                </Row>
              </div>
            </marquee>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
