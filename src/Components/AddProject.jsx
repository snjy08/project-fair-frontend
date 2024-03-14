import React, { useContext, useEffect } from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import img from '../Assets/png-transparent-phone-icons-illustration-project-management-operations-management-business-project-manager-management-company-service-people-thumbnail.png'
import { addProjectApi } from '../services/allAPIs';
import { addProjectResponseContext } from '../ContextApi/ContextShare';

function AddProject() {

const{addProjectRes,setAddProjectRes} = useContext(addProjectResponseContext)

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true)

  //to hold the project details
  const [token, setToken] = useState("")

  useEffect(() => {
    if (sessionStorage.getItem('token')) {
      setToken(sessionStorage.getItem('token'))
    }
  }, [])

  //to hold the project details
  const [projectDetails, setProjectDetails] = useState({
    title: "", language: "", github: "", link: "", overview:
      "", projectimage: ""
  })
  console.log(projectDetails);
  //to hold the image url
  const [preview, setPreview] = useState("")
  console.log(preview);

  useEffect(() => {
    if (projectDetails.projectimage) {
      // convert it to a url
      setPreview(URL.createObjectURL(projectDetails.projectimage))
    }
  }, [projectDetails.projectimage])

  const projectAdd = async () => {
    const { title, language, github, link, overview, projectimage } = projectDetails
    if (!title || !language || !github || !link || !overview || !projectimage) {
      alert("please enter details")
    }
    else {
      //api call
      const reqBody = new FormData()
      reqBody.append("title", title)
      reqBody.append("language", language)
      reqBody.append("github", github)
      reqBody.append("link", link)
      reqBody.append("overview", overview)
      reqBody.append("projectimage", projectimage)

      const reqHeader = {
        "Content-Type": "multipart/form-data", // req contains a multipart from data
        'Authorization': `Bearer ${token}` //req contains token for baclend

      };
      //api call
      const result = await addProjectApi(reqBody, reqHeader)
      console.log(result);
      if (result.status === 200) {
        console.log(result);//succesful
        alert("project added succesfully")
        handleClose()
        setAddProjectRes(result.data)//context access the add project data
        setProjectDetails({
          //make the state value is empty
          title: "", language: "", github: "", link: "", overview: "", projectimage: ""
        })
        setPreview("")
      }
      else {
        alert(result.response.data)
        console.log(result.response.data);//error message
      }
    }
  }
  return (
    <div>
      <button className='btn btn-success' onClick={handleShow}>Add project</button>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        size='lg'
      >
        <Modal.Header closeButton>
          <Modal.Title>Project Description</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col">
              {/* image*/}
              <label >
                <input type="file" style={{ display: 'none' }} onChange={e => setProjectDetails({ ...projectDetails, projectimage: e.target.files[0] })} />
                <img src={preview ? preview : img} width={'100%'} alt="" />
              </label>

            </div>
            <div className="col">
              {/*input */}
              <div className='inp'>
                <input type="text" value={projectDetails.title} onChange={e => setProjectDetails({ ...projectDetails, title: e.target.value })} placeholder='project title' className='form-control mb-3' />
                <input type="text" value={projectDetails.language} onChange={e => setProjectDetails({ ...projectDetails, language: e.target.value })} placeholder='Language' className='form-control mb-3' />
                <input type="text" value={projectDetails.github} onChange={e => setProjectDetails({ ...projectDetails, github: e.target.value })} placeholder='Github Link' className='form-control mb-3' />
                <input type="text" value={projectDetails.link} onChange={e => setProjectDetails({ ...projectDetails, link: e.target.value })} placeholder='Website Link' className='form-control mb-3' />
                <input type="text" value={projectDetails.overview} onChange={e => setProjectDetails({ ...projectDetails, overview: e.target.value })} placeholder='project description' className='form-control mb-3' />
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div>
            <Button variant='primary' onClick={projectAdd}>
              Add
            </Button>
          </div>

        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default AddProject