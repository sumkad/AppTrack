import Image from 'next/Image'
import Head from 'next/head'

import styles from './addJob.module.css'
import { useState, useContext } from 'react'

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Form, Alert } from 'react-bootstrap';

import addJobModel from '../../public/addJob.jpg';
import { CurrStageContext } from "../pipeline/pipeline"
import FakeClient from '../../dummyData/fakePI';

let id = 0
const AddJob = () => {
    const [modalVisible, setModal] = useState(false);
    const toggleModalVisibility = () => {
        setModal(!modalVisible);
    };

    const {currStage, jobsInStage, setJobs} = useContext(CurrStageContext)
    const [company, setCompany] = useState("")
    const [jobTitle, setJob] = useState("")
    const [selectedImage, setSelectedImage] = useState(null);
    const [alertVisible, setAlert] = useState(false)
    const [jobNotes, setJobNotes] = useState("")

    const resetForm = () => {
        setCompany("")
        setJob("")
        setJobNotes("")
        setSelectedImage("")
        setAlert(false)
        toggleModalVisibility()
    }

    const submitForm = () => {
        if(!company || !jobTitle || !selectedImage) {
            setAlert(true)
        } else {
            FakeClient.editStage(currStage, [...(FakeClient.getStage(currStage)), 
                {company, selectedImage: (URL.createObjectURL(selectedImage)), jobTitle, notes: jobNotes, stage: currStage, id}])
            setJobs([...jobsInStage,  {company, selectedImage: (URL.createObjectURL(selectedImage)), jobTitle, notes: jobNotes, stage: currStage, id}])
            id += 1
            resetForm() 
        }
    }

    const changeImage = (e) => {
        setSelectedImage(e.target.files[0]);
    }

    const changeCompany = (e) => {
        setCompany(e.target.value)
    }
    const changeJob = (e) => {
        setJob(e.target.value)
    }

    return <>
        <Head>
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
            <link href="https://fonts.googleapis.com/css2?family=Lobster&family=Saira:ital,wght@0,100;0,200;0,400;0,500;1,100;1,200;1,400;1,500&display=swap" rel="stylesheet" />
        </Head>
        <div className = {styles.cardContainer} onClick = {toggleModalVisibility}>
            <h1 className = {styles.company}>Add Job</h1>
            <div className = {styles.logoImg}>
                <Image src = {addJobModel}/>
            </div>
        </div>
        <Modal show={modalVisible} onHide={resetForm}>
            <Modal.Header closeButton>
                <Modal.Title>Add Job to Stage</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {alertVisible ? <Alert key = "danger" variant = "danger">Invalid Input</Alert> : <></>}
                {selectedImage && (<>
                    <div className = {styles.imgContainer}>
                        <img alt="not fount" src={URL.createObjectURL(selectedImage)} />
                        <br />
                    </div>
                    <button onClick={()=>setSelectedImage(null)} style = {{width: "20%", marginLeft: "40%"}}>Remove</button>
                    </>)}
                <Form onSubmit = {(e) => e.preventDefault()}>
                    <Form.Group className="mb-3" controlId="company">
                        <Form.Label className = {styles.formLabel}>Company</Form.Label>
                        <Form.Control type="input" placeholder="Enter Company" className = {styles.formEntry}
                            value = {company} onChange = {changeCompany}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="job">
                        <Form.Label className = {styles.formLabel}>Job Title</Form.Label>
                        <Form.Control type="input" placeholder="Enter Job" className = {styles.formEntry}
                            value = {jobTitle} onChange = {changeJob}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="compPic">
                        <Form.Label className = {styles.formLabel}>Company Logo</Form.Label>
                        <Form.Control type="file" className = {styles.formEntry} onChange = {changeImage}/>
                    </Form.Group>
                    <Form.Group
                        className="mb-3"
                        controlId="addJob.Modal"
                        value = {jobNotes}
                        onChange = {(e) => 
                            setJobNotes(e.target.value)}>
                        <Form.Label>Job Notes</Form.Label>
                        <Form.Control as="textarea" rows={3} />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={resetForm}>
                    Close
                </Button>
                <Button variant="primary" onClick={submitForm}>
                    Add Job
                </Button>
            </Modal.Footer>
        </Modal>
    </>
}

export default AddJob