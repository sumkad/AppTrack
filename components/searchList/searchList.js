import SearchJob from './searchJob'
import styles from './searchList.module.css'

const SearchList = (props) => {
    return <div className = {styles.jobContainer}>
        {props.jobs.map(elem => <SearchJob company = {elem["company"]} job = {elem["jobTitle"]} 
            image = {elem["selectedImage"]} notes = {elem["notes"]} id = {elem["id"]}
            key = {elem["id"]}/>)}  
    </div>
}

export default SearchList;