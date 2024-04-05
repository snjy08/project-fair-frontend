import React, { useContext, useEffect, useState } from 'react'
import AddProject from './AddProject'
import { Col, Row } from 'react-bootstrap';
import { deleteUserProjectAPI, getUserProjectAPI } from '../services/allAPIs';
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

  const deleteProject = async (pid) => {

    const token = sessionStorage.getItem("token")
    console.log(token);

    if (token) {
      const reqHeader = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      }
      try {
        const result = await deleteUserProjectAPI(pid, reqHeader)
        console.log(result);
        if (result.status == 200) {
          // toast.error("Project deleted successfully")
          alert("Project Deleted Successfully")
          //to display rest of the projects after deleting
          allUserProjects()
        }
      }
      catch (err) {
        console.log("Cannot Delete Project");
        alert("Failed to delete Project")
      }


    }
  }

    return (
        <div className='container'>
            <h3>My Project</h3>
            <div className='ms-auto me-5'>
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
                                    <a href={item?.github} target="_blank" ><button className='btn btn-secondary m-2'><i className='fa-brands fa-github'></i></button></a>
                                    <button className='btn btn-danger m-2' onClick={() => deleteProject(item?._id)}><i class="fa-solid fa-trash"></i></button>
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
