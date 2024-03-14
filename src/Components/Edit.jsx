import React, { useContext, useEffect } from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import img from '../Assets/png-transparent-phone-icons-illustration-project-management-operations-management-business-project-manager-management-company-service-people-thumbnail.png'
import { baseUrl } from '../services/baseUrl';
import { editUserProject } from '../services/allAPIs';
import { editUserProjectResponseContext } from '../ContextApi/ContextShare'

function Edit({ project }) {


  const { editUserProjectRes, setEditUserProjectRes } = useContext(editUserProjectResponseContext)



  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true)

  //to hold the project details
  const [projectDetails, setProjectDetails] = useState({
    id: project._id,
    title: project.title,
    language: project.language,
    github: project.github,
    link: project.link,
    overview: project.overview,
    projectimage: ""
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

  //project update
  const uppdateProject = async () => {
    const { id, title, language, github, link, overview, projectimage } = projectDetails


    //api call
    const reqBody = new FormData()
    reqBody.append("title", title)
    reqBody.append("language", language)
    reqBody.append("github", github)
    reqBody.append("link", link)
    reqBody.append("overview", overview)
    preview ? reqBody.append("projectimage", projectimage) : reqBody.append("projectimage", project.projectimage)

    const token = sessionStorage.getItem("token")
    console.log(token);
    //api call
    if (preview) {
      const reqHeader = {
        "Content-Type": "multipart/form-data", // req contains a multipart from data
        'Authorization': `Bearer ${token}` //req contains token for baclend

      };
      //api call
      const result = await editUserProject(id, reqBody, reqHeader)
      console.log(result);
      if (result.status == 200) {

        setEditUserProjectRes(result.data)
        console.log(result.data);
        alert("Project Details updated succesfully")
        handleClose()
      }
      else {
        console.log(result.response.data);
      }
    }
    else {
      const reqHeader = {
        "Content-Type": "application/json",
        "Authorization": ` Bearer ${token}`
      }

      //Api call
      const result = await editUserProject(id, reqBody, reqHeader)
      console.log(result);
      if (result.status == 200) {
        setEditUserProjectRes(result.data)

        handleClose()
      }
      else {
        console.log(result.response.data);
      }
    }
    console.log(projectDetails);
  }
  return (
    <div>
      <div>
        <button className='btn btn-primary' onClick={handleShow}><i class="fa-solid fa-pen"></i></button>
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
                  <img src={preview ? preview : `${baseUrl}/uploads/${project.projectimage}`} width={'100%'} alt="" />
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
              <Button variant='primary' onClick={uppdateProject} >
                update
              </Button>
            </div>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  )
}

export default Edit
