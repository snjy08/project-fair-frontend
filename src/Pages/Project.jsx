import React, { useContext, useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import ProjectCard from '../Components/ProjectCard'
import { getAllProjectAPI } from '../services/allAPIs'
import { Link } from 'react-router-dom'
import { editUserProjectResponseContext } from '../ContextApi/ContextShare'


function Project() {
//to hold search value from the input tag
const [searchKey,setSearchKey] = useState("")
console.log(searchKey);
const {editUserProjectRes,setEditUserProjectRes}=useContext(editUserProjectResponseContext)

  const [allProject, setAllProject] = useState([])// to hold all project
  //api call
  const allProjects = async () => {
    //get token from sessionstorage
    const token = sessionStorage.getItem("token")

    if (token) {
      const reqHeader = {
        'content-Type': 'multipart/form-data',
        "Authorization": `Bearer ${token}`
      };

      try {
        const result = await getAllProjectAPI(searchKey,reqHeader)
        console.log(result);
        if (result.status === 200) {
          setAllProject(result.data)
          console.log(allProject);
        }
        else {
          alert("failed to retrieve project")
        }
      } catch (error) {
        console.error('Error fetching projects:', error);
        alert('Failed to retrieve project')
      }
    }
  };
  useEffect(() => {
    allProjects()
  }, [searchKey])
  return (
    <div>
      <div className="container">
        <h1 className='text-center m-4'>All Projects</h1>
        <div className='d-flex justify-content-center'>
          <div className="d-flex ">
            <input type="text" onChange={e=>setSearchKey(e.target.value)} style={{ width: '400px' }} className='form-control' placeholder='Search by Name' />
            <i class="fa-solid fa-magnifying-glass fs-2 p-2"></i>
          </div>
        </div>
        <Row>
          {allProject.length > 0 ? (
            allProject.map((item, index) => (
              <Col key={index}>
                <ProjectCard project={item} />
              </Col>
            ))
          ) : (
            <div className='text-center'>No project found</div>
          )
          }
        </Row>
      </div>
    </div>

  )
}

export default Project