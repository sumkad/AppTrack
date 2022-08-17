import styles from "./basepage.module.css"
import Head from 'next/head'
import Link from 'next/link'
import { Button } from "react-bootstrap"

const DefaultHome = () => {
    return <>
        <Head>
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
            <link href="https://fonts.googleapis.com/css2?family=Lobster&family=Saira:ital,wght@0,100;0,200;0,400;0,500;1,100;1,200;1,400;1,500&display=swap" rel="stylesheet" />
        </Head>
        <div className = {styles.container}>
            <div className = {styles.rightHalf}>
                <h1>Welcome To AppTrack</h1>
                <h3 style = {{fontSize: "35px", marginTop: "50px"}}>Finding Jobs Has Never Been Easier</h3>
                <div style={{display: "flex", justifyContent: "center"}}> 
                    <Link href = "signup"><Button style = {{width: "200px", height: "60px", fontSize: "30px", marginRight: "60px", border: "solid white 2px"}}>Sign Up</Button></Link>
                    <Link href = "login"><Button style = {{width: "200px", height: "60px", fontSize: "30px", border: "solid white 2px"}}>Log In</Button></Link>
                </div>
            </div>
        </div>
    </>
}

export default DefaultHome