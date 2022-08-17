import Job from './job'

import styles from './jobList.module.css'
import Addjob from "./addJob"

const JobList = (props) => {
    return <div className = {styles.jobContainer}>
        {props.jobs.map((elem, i) => <Job company = {elem["company"]} job = {elem["jobTitle"]} 
            image = {elem["selectedImage"]} notes = {elem["notes"]} id = {elem["id"]}
            key = {elem["id"]}/>)}  
        {props.type === "pipeline" ? <Addjob/> : <></>}
    </div>
}

export default JobList;