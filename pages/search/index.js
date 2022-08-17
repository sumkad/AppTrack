import Navbar  from "../../components/navbar/navbar"
import { useState, createContext } from 'react'
import { BsSearch } from 'react-icons/bs'

import styles from "./index.module.css"
import SearchList from "../../components/searchList/searchList"
import FakeClient from "../../dummyData/fakePI"

export const SearchJobs = createContext()


const Search = () => {
    const [filter, setFilter] = useState("")
    const [searchedJobs, setSearchedJobs] = useState(FakeClient.getUnusedJobs())

    return (
        <div className = {styles.background}>
            <Navbar/> 
            <h1 className = {styles.inputHeading}>Discover New Jobs</h1>
            <div className = {styles.searchbar}>
                <input className = {styles.input} value = {filter} onChange = {(e) => setFilter(e.target.value)}></input>
                <BsSearch className = {styles.search} size = {30}/>
            </div>
            <SearchJobs.Provider value = {{searchedJobs, setSearchedJobs}}>
                <SearchList jobs = {searchedJobs.filter(elem => 
                    (elem["company"].toLowerCase()).includes(filter.toLowerCase()) || 
                    (elem["jobTitle"].toLowerCase()).includes(filter.toLowerCase()) 
                )}></SearchList>
            </SearchJobs.Provider>
        </div>

    )
};

export default Search
