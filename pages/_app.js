import 'bootstrap/dist/css/bootstrap.css';
import '../styles/globals.css'

import Amazon from '../public/amazon.png'

import { createContext, useState } from 'react'
import FakeClient from '../dummyData/fakePI';

const stageList = ["Queue", "Online Assessment", "Interview 1", "Interview 2", "Accepted", "Rejected"]
const unusedJobs = [
  {
      company: "Amongus",
      selectedImage: "/amazon.png",
      id: -1,
      jobTitle: "Gatekeeper",
      notes: "",
  },
  {
      company: "Amongus",
      selectedImage: "/amazon.png",
      id: -2,
      jobTitle: "Gatekeeper",
      notes: "",
  },
]
console.log(Amazon)

export const StageContext = createContext()
FakeClient.setStage(stageList)
FakeClient.setUnusedJobs(unusedJobs)

function MyApp({ Component, pageProps }) {
  const [stages, updateStage] = useState(stageList)

  return <StageContext.Provider value = {{stages, updateStage}}>
    <Component {...pageProps} />
  </StageContext.Provider>
}

export default MyApp
