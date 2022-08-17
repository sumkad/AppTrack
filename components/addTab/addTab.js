import styles from "./addTab.module.css"
import { useContext, useState } from 'react'
import { StageContext } from "../../pages/_app"

import Modal from 'react-bootstrap/Modal';
import { Form, Alert, Button } from 'react-bootstrap';
import fakeClient from "../../dummyData/fakePI";

const AddTab = () => {
    const { stages, updateStage } = useContext(StageContext)
    const [ modalVisible, setModalVisible ] = useState(false)
    const [ stageName, setStageName ] = useState("")
    const [ errMsg, setErr ] = useState("")

    const closeForm = () => {
        setModalVisible(false)
        setStageName("")
        setErr("")
    }

    const submitForm = () => {
        if (stageName === "") {
            setErr("Please Input a Name")
        } else if (stages.includes(stageName)) {
            setErr("Stage Already Exists")
        } else {
            const newStages = [...stages, stageName]
            fakeClient.addStage(stageName)
            updateStage(newStages)
            closeForm()
        }
    }

    return (<>
        <button className = {styles.tabButton} onClick = {() => setModalVisible(true)}>Add Stage</button>
        <Modal show={modalVisible} onHide={closeForm}>
            <Modal.Header closeButton>
                <Modal.Title>Add Stage</Modal.Title>
            </Modal.Header>
            {errMsg ? <Alert key = "danger" variant = "danger">{errMsg}</Alert> : <></>}
            <Modal.Body>
                <Form onSubmit={(e) => e.preventDefault()}>
                    <Form.Group className="mb-3" controlId="stageName">
                        <Form.Label className = {styles.formLabel}>Stage Name</Form.Label>
                        <Form.Control type="input" placeholder="Enter Stage Name" 
                            value = {stageName} 
                            onChange = {(e) => setStageName(e.target.value)}/>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={closeForm}>
                    Close
                </Button>
                <Button variant="primary" onClick={submitForm}>
                    Add Stage
                </Button>
            </Modal.Footer>
        </Modal>
    </>);
}

export default AddTab