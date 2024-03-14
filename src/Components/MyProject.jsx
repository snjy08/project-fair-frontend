import React, { useContext, useEffect, useState } from 'react'
import AddProject from './AddProject'
import { Col, Row } from 'react-bootstrap';
import { getUserProjectAPI } from '../services/allAPIs';
import { addProjectResponseContext, editUserProjectResponseContext } from '../ContextApi/ContextShare';
import Edit from './Edit'
function MyProject() {

 const {editUserProjectRes,setEditUserProjectRes} = useContext(editUserProjectResponseContext) 

//
 const{addProjectRes,setAddProjectRes} = useContext(addProjectResponseContext) 

//state creation

const [ allUserProject,setAllUserProject] = useState([])

//api call
const allUserProjects = async() =>{
    //get token from sessionstorage

    const token = sessionStorage.getItem("token")

    if (token) {
      const reqHeader = {
        'content-Type': 'application/json',
        "Authorization": `Bearer ${token} `
      };

      try {
        const result = await getUserProjectAPI(reqHeader)
        console.log(result);
        if (result.status === 200) {
            setAllUserProject(result.data)
          console.log(allUserProject);
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
    allUserProjects()
  }, [addProjectRes  ,editUserProjectRes   ])

    return (
        <div className='container'>
            <h3>My Project</h3>
            <div className='ms-auto'>
          {/* Add projects */}
          <AddProject />
        </div>
               
            <div className='d-flex'>
            <div className='mt-4 d-flex align-item-center justify-content-between p-4 border'>
                <Row>
                    {allUserProject.length > 0 ? (
                        allUserProject.map((item, index) => (
                            <div className='d-inline-flex justify-content-between'>
                                <h5 className='text-center mt-5 ms-4'>{item.title}</h5>
                                <div className='btn'>
                                    <button className='btn btn-primary m-2'><Edit project={item}/> </button>
                                    <button className='btn btn-secondary m-2'><i className='fa-brands fa-github'></i></button>
                                    <button className='btn btn-danger m-2'><i class="fa-solid fa-trash"></i></button>
                                </div >
                            </div>
                        ))
                    ) : (
                        <div className='text-center'>No Projects Found</div>
                    )}
                </Row>
            </div>
                        </div>
                          
                </div>
    )
}

export default MyProject
