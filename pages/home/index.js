import React from 'react';
import { Pipeline } from "../../components/pipeline/pipeline"
import Navbar from "../../components/navbar/navbar" 

const List = ["Item One", "Item Two", "Item Three", "Item Four"];

const Home = () => {
  return ( <>
    <Navbar currPage = "Home"/>
    <Pipeline />
  </>);
}

export default Home