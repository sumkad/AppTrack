import { Button, Card, Container }  from 'react-bootstrap';
import { useRef, useState } from 'react'

import Image from 'next/image'
import Link from 'next/link'
import Head from 'next/head'

import Logo from "../../public/LogoV5.jpg"
import styles from "./index.module.css";
import { Form, Alert} from 'react-bootstrap';

const SignUp = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [ alert, setAlert ] = useState(false)
    const userRef = useRef(null)

    const changePassword = (e) => {
        setPassword(e.target.value)
    }

    const changeUsername = (e) => {
        setUsername(e.target.value)
    }

    const changeEmail = (e) => {
        setEmail(e.target.value)
    }

    const validateInput = ( username, password, email ) => {
        if(!username || !password || !email) {
            setAlert(true)
            return false;
        }  else {
            return true
        }
    }

    const authenticate = (e) => {
        if (validateInput(username, password, email)) {
            console.log(username)
            console.log(password)
            console.log(email)
        }
        userRef.current.focus()
        e.preventDefault()

    } 
    return <>
        <Head>
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
            <link href="https://fonts.googleapis.com/css2?family=Lobster&family=Saira:ital,wght@0,100;0,200;0,400;0,500;1,100;1,200;1,400;1,500&display=swap" rel="stylesheet" />
        </Head>
        <div className = {styles.container}>
            <div className = {styles.card}>
                <div className = {styles.cardContent}>
                    <Link href = "/">
                        <div className = {styles.logoHeader}>
                            <h1 className = {styles.logo}>AppTrack</h1>
                            <Image src = {Logo} width = "45px" height = "60px" margintop = "60px"/>
                        </div>
                    </Link>
                    <Form className = {styles.formContainer}>
                        {alert ? <Alert key = "danger" variant = "danger">Please Fill Out All Fields</Alert> : <></>}
                        <h4>Create an an account</h4>
                        <div className = {styles.formContent}>
                            <Form.Group className="mb-3" controlId="signupEmail">
                                <Form.Label className = {styles.formLabel}>Email</Form.Label>
                                <Form.Control type="email" placeholder="Email" className = {styles.formEntry} value = {email} onChange = {changeEmail} ref = {userRef}/>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="signupUsername">
                                <Form.Label className = {styles.formLabel}>Username</Form.Label>
                                <Form.Control type="username" placeholder="Username" className = {styles.formEntry} value = {username} onChange = {changeUsername}/>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="signupPassword">
                                <Form.Label className = {styles.formLabel}>Password</Form.Label>
                                <Form.Control type="password" placeholder="Password" className = {styles.formEntry} value = {password} onChange = {changePassword}/>
                            </Form.Group>
                        </div>
                        <Button variant="primary" type="submit" style = {{textAlign: "left"}} onClick = {authenticate}>
                            Submit
                        </Button>
                    </Form>
                    <Link href = "/login">
                        <u style = {{color: 'darkblue'}}>Already Have An Account?</u>
                    </Link>
                </div>
            </div>
        </div>
    </>
}

export default SignUp