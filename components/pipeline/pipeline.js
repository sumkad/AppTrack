import { useState, useContext, createContext } from 'react'

import Tab from "../pipelineTab/tab"
import AddTab from '../addTab/addTab'

import styles from "./pipeline.module.css"
import Head from "next/head"

import JobList from "../jobList/jobList"
import { StageContext } from "../../pages/_app"
import FakeClient from '../../dummyData/fakePI'

export const CurrStageContext = createContext()

export const Pipeline = () => {
    const { stages } = useContext(StageContext)
    const [ currStage, setCurrStage] = useState(null)
    const [ jobsInStage, setJobs ] = useState([])

    const updateCurrStage = (val) => {
        setCurrStage(val)
        setJobs(FakeClient.getStage(val))
    }

    return (<>
        <Head>
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
            <link href="https://fonts.googleapis.com/css2?family=Lobster&family=Saira:ital,wght@0,100;0,200;0,400;0,500;1,100;1,200;1,400;1,500&display=swap" rel="stylesheet" />
        </Head>
        <CurrStageContext.Provider value = {{currStage, updateCurrStage, jobsInStage, setJobs}}>
            <h1 className = {styles.pipelineHeading}> Job Pipeline </h1>
            <div className = {styles.pipelineContainer}>
                {(stages ?? []).map((elem, i) => <Tab name = {elem} key = {i}></Tab>)}
                {(stages ?? []).length < 8 ? <AddTab /> : <></>}
            </div>
            {currStage && stages.includes(currStage) ? <JobList jobs = {jobsInStage} type = "pipeline"/>: <></>}
        </CurrStageContext.Provider>
    </>);
}

