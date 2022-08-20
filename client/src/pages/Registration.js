import React from 'react';
import '../App.css';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup';
import axios from 'axios';



function Registration() {

    const navigate = useNavigate();

    const initialValues = {
        username: "",
        password: ""
    }

    const validationSchema = Yup.object().shape({
        username: Yup.string().min(3).max(15).required("Username Required"),
        password: Yup.string().min(4).max(20).required('Password Required')
    })

    const onSubmit = (data) => {
        axios
            .post('http://localhost:3001/auth', data)
            .then(() => {
                console.log(data)
                navigate('/login')
            })
    }

    return (
        <div>
            <Formik
                initialValues={initialValues}
                onSubmit={onSubmit}
                validationSchema={validationSchema}
            >
                <Form className='formContainer'>
                    <label>Username:</label>
                    <ErrorMessage name='username' component='span' />
                    <Field
                        autoomplete='off'
                        id="inputCreatePost"
                        name="username"
                        placeholder="Enter Username Here"
                    />
                    <label>Password:</label>
                    <ErrorMessage name='password' component='span' />
                    <Field
                        autoomplete='off'
                        type='password'
                        id="inputCreatePost"
                        name="password"
                        placeholder="Enter Password Here"
                    />
                    <button type='submit'>Register</button>
                </Form>
            </Formik>
        </div>
    )
}

export default Registration