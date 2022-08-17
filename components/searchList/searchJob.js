import Head from 'next/head'
import styles from './searchJob.module.css'
import { useState, useContext } from 'react'
import { Form, Modal, Button } from 'react-bootstrap';

import { StageContext } from '../../pages/_app';
import FakeClient from '../../dummyData/fakePI';
import { SearchJobs } from '../../pages/search';

const SearchJob = (props) => {
    const [ modalVisible, setModal ] = useState(false);
    const { stages } = useContext(StageContext)
    const [ notes, setNotes ] = useState("")
    const [ selStage, setSelStage ] = useState(0)
    const { searchedJobs, setSearchedJobs } = useContext(SearchJobs)

    const resetForm = () => {
        setNotes("")
        setSelStage(0)
    }

    const toggleModalVisibility = () => {
        if (stages.length > 0) {
            setModal(!modalVisible);
            resetForm()
        } else {
            alert("Please Create A Stage Before Attempting to Add Job To Pipeline")
        }
        
    };

    const submitForm = (e) => {
        e.preventDefault()
        const stage = stages[selStage]
        const jobsInStage = FakeClient.getStage(stage)
        const job = searchedJobs.filter(elem => props.id == elem.id)[0]
        job.notes = notes
        jobsInStage.push(job)
        setSearchedJobs(searchedJobs.filter(elem => props.id != elem.id))
        FakeClient.removeUnusedJobs(props.id)
        FakeClient.editStage(stage, jobsInStage)
        toggleModalVisibility();
    }

    return <>
        <Head>
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
            <link href="https://fonts.googleapis.com/css2?family=Lobster&family=Saira:ital,wght@0,100;0,200;0,400;0,500;1,100;1,200;1,400;1,500&display=swap" rel="stylesheet" />
        </Head>
        <div className = {styles.cardContainer} onClick = {toggleModalVisibility}>
            <h1 className = {styles.company}>{props.company}</h1>
            <div className = {styles.logoImgContainer}>
                <img src = {props.image} className = {styles.logoImg}/>
            </div>
            <h2 className = {styles.jobName}>{props.job}</h2>
        </div>
        <Modal show={modalVisible} onHide={toggleModalVisibility}>
            <Modal.Header closeButton>
                <Modal.Title>{"Add Job to Pipeline"}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Select 
                        aria-label="Default select example"
                        value = {selStage}
                        onChange = {(e) => setSelStage(e.target.value)}>
                        <Form.Label>Choose Stage</Form.Label>
                        {stages.map((e, i) => 
                            <option value={i} key = {e}>{e}</option>
                        )}
                    </Form.Select>
                    <Form.Group
                        className="mb-3"
                        controlId="addJob.Modal">
                        <Form.Label>Job Notes</Form.Label>
                        <Form.Control 
                            as="textarea" 
                            rows={3} 
                            value = {notes}
                            onChange = {(e) => setNotes(e.target.value)}/>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={toggleModalVisibility}>
                    Close
                </Button>
                <Button variant="primary" onClick={submitForm}>
                    Add Job
                </Button>
            </Modal.Footer>
        </Modal>
    </>
}

export default SearchJob