import React from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Col from 'react-bootstrap/esm/Col';
import Row from 'react-bootstrap/esm/Row';
import img from '../Assets/pexels-shvets-production-7191982.jpg'
import { baseUrl } from '../services/baseUrl';


function ProjectCard({project}) {
 
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    console.log(project);
  return (
    <div>
    
             <Card onClick={handleShow} style={{ width: '18rem' }}>
      <Card.Img variant="top" src={project?`${baseUrl}/uploads/${project?.projectimage}`:'null'} />
      <Card.Body>
        <Card.Title>{project?.title}</Card.Title>
      </Card.Body>
    </Card>
    <Modal
      show={show}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>{project?.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
            <h3>project details</h3>
            <Col>
            <img src={project?`${baseUrl}/uploads/${project?.projectimage}`:'null'} width={'100%'} alt="" />
            </Col>
            <Col>
            <h3>{project?.title}</h3>
            <span><p>project overview:<b>{project?.overview}</b>
           
            </p></span>
            <p>language used : <span><b>{project?.language}</b></span> </p>
            </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer className='d-flex justify-content-evenly'>
      <Button target='_blank' href={`${project?.github}`} variant="secondary">
      <i class="fa-brands fx-2 fa-github fa-beat-fade text-dark"></i>
      </Button>

          
      <Button target='_blank' href={`${project?.link}`} variant="primary" >
            <i class="fa-solid fa-link fa-beat-fade "></i>
          </Button>
      </Modal.Footer> 
    </Modal>
    </div>
    
  )
}

export default ProjectCard
