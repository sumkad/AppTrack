import styles from "./tab.module.css"
import { useContext } from 'react'
import { CurrStageContext } from "../pipeline/pipeline"
import { StageContext } from "../../pages/_app"

import { BsArrowRight } from 'react-icons/bs'
import FakeClient from "../../dummyData/fakePI"

const Tab = (props) => {
    const {currStage, updateCurrStage } = useContext(CurrStageContext)
    const { stages, updateStage, setJobs } = useContext(StageContext)

    const removeStage = () => {
        if (currStage == props.name) {
            updateCurrStage(null)
        }
        updateStage(stages.filter(elem => elem != props.name))
        FakeClient.deleteStage(props.name)
    }

    return (<>
        <button className = {styles.removeButton}
            onClick = {removeStage}>X</button>
        <button className = {props.name == currStage ? styles.tabChosen: styles.tabNormal} 
            onClick = {() => updateCurrStage(props.name)}>
            {props.name}
        </button>
        {props.name != stages[stages.length - 1] ? 
            <BsArrowRight className = {styles.arrowRight} size = {40}/> : 
            <div style = {{width: "50px", height: "30px"}} />}
    </>);
}

export default Tab