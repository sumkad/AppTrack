import Head from 'next/head'
import styles from './job.module.css'
import { useState, useContext, useEffect } from 'react'
import { Form, Modal, Button } from 'react-bootstrap';
import Amazon from "../../public/amazon.png"

import { StageContext } from '../../pages/_app';
import { CurrStageContext } from '../pipeline/pipeline';
import FakeClient from '../../dummyData/fakePI';

let persistentState = {
    notes: "",
    selStage: 0
}

const Job = (props) => {
    const [modalVisible, setModal] = useState(false);
    const [notes, setNotes] = useState(props.notes)
    const {stages} = useContext(StageContext)
    const { currStage, setJobs }  = useContext(CurrStageContext)
    const [selStage, setSelStage] = useState(Math.max(stages.indexOf(currStage), 0))

    const resetForm = () => {
        setNotes(persistentState["notes"] + "")
        setSelStage(persistentState["selStage"])
    }

    const toggleModalVisibility = () => {
        if (stages.length > 0) {
            setModal(!modalVisible);
            resetForm()
        } else {
            alert("Please Create A Stage Before Attempting to Add Job To Pipeline")
        }
        
    };

    const deleteJob = (e) => {
        e.preventDefault()
        const curr = stages[persistentState.selStage]
        const job = FakeClient.getStage(curr).filter(elem => elem["id"] == props.id)[0]
        FakeClient.editStage(curr, FakeClient.getStage(curr).filter(elem => elem["id"] != props.id))
        setJobs(FakeClient.getStage(curr))
        const jobs = FakeClient.getUnusedJobs()
        jobs.push(job)
        FakeClient.setUnusedJobs(jobs)
        toggleModalVisibility()
    }

    const submitForm = (e) => {
        e.preventDefault()
        if (persistentState.selStage != selStage) {
            const job = FakeClient.getStage(stages[persistentState.selStage]).filter(elem => elem["id"] == props.id)[0]
            FakeClient.editStage(stages[persistentState.selStage], FakeClient.getStage(stages[persistentState.selStage]).filter(elem => elem["id"] != job["id"]))
            setJobs(FakeClient.getStage(stages[persistentState.selStage]))
            const otherStageJobs = FakeClient.getStage(stages[selStage])
            otherStageJobs.push(job)
            FakeClient.editStage(stages[selStage], otherStageJobs)
        }
        persistentState = {
            notes,
            selStage
        }
        toggleModalVisibility();
    }
    
    useEffect(() => {
        persistentState = {
            notes: props.notes,
            selStage: Math.max(stages.indexOf(currStage), 0)
        }
    
    }, [])

    return <>
        <Head>
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
            <link href="https://fonts.googleapis.com/css2?family=Lobster&family=Saira:ital,wght@0,100;0,200;0,400;0,500;1,100;1,200;1,400;1,500&display=swap" rel="stylesheet" />
        </Head>
        <div className = {styles.cardContainer} onClick = {toggleModalVisibility}>
            <h1 className = {styles.company}>{props.company}</h1>
            <div className = {styles.logoImgContainer}>
                <img src = {Amazon} className = {styles.logoImg}/>
            </div>
            <h2 className = {styles.jobName}>{props.job}</h2>
        </div>
        <Modal show={modalVisible} onHide={toggleModalVisibility}>
            <Modal.Header closeButton>
                <Modal.Title>{"Edit Job Details"}</Modal.Title>
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
                <Button variant="danger" onClick={deleteJob}>
                    Delete Job
                </Button>
                <Button variant="primary" onClick={submitForm}>
                    Update Job
                </Button>
            </Modal.Footer>
        </Modal>
    </>
}

export default Job