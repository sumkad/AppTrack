import styles from "./navbar.module.css"

import Head from 'next/head'
import Link from 'next/link'

import { BsSearch, BsFillHouseFill } from 'react-icons/bs'
import { GiExitDoor } from "react-icons/gi";

const Navbar = (props) => {
    return ( 
        <div className={styles.navbarContainer}>
            <Head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
                <link href="https://fonts.googleapis.com/css2?family=Lobster&family=Saira:ital,wght@0,100;0,200;0,400;0,500;1,100;1,200;1,400;1,500&display=swap" rel="stylesheet" />
            </Head>
            <navbar>
                <Link href = "home">
                    <h1 className = {styles.logo}>AppTrack</h1>
                </Link>
                <div className={styles.textTabs}>
                    <Link href = "home"><h1 className = {styles.text}>Home</h1></Link>
                    <Link href = "search"><h1 className = {styles.text}>Search</h1></Link>
                    <Link href = "logout"><h1 className = {styles.text}>Log Out</h1></Link>
                </div>
                <div className = {styles.iconTabs}>
                    <Link href = "logout"><GiExitDoor className = {styles.icon} size = {40}></GiExitDoor></Link>
                </div>
                <div>

                </div>
            </navbar>
        </div>
    );
}

export default Navbar;