import React, { useEffect, useContext } from 'react';
import '../App.css';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../helpers/AuthContext'

function CreatePost() {

    const navigate = useNavigate();
    const { authState } = useContext(AuthContext);

    const initialValues = {
        title: "",
        postText: "",
    }

    const validationSchema = Yup.object().shape({
        title: Yup.string().required("Title Required"),
        postText: Yup.string().required("Post Text Required"),
    })

    const onSubmit = (data) => {
        axios
            .post('http://localhost:3001/posts', data, { headers: { accessToken: localStorage.getItem('accessToken') } })
            .then((response) => {
                navigate('/');
            })
    }

    useEffect(() => {
        if (!authState.status) {
            navigate('/login')
        }
    }, [])


    return (
        <div className='createPostPage'>
            <Formik
                initialValues={initialValues}
                onSubmit={onSubmit}
                validationSchema={validationSchema}
            >
                <Form className='formContainer'>
                    <label>Title:</label>
                    <ErrorMessage name='title' component='span' />
                    <Field
                        autoomplete='off'
                        id="inputCreatePost"
                        name="title"
                        placeholder="Enter Title Here"
                    />
                    <label>Post Text:</label>
                    <ErrorMessage name='postText' component='span' />
                    <Field
                        autoomplete='off'
                        id="inputCreatePost"
                        name="postText"
                        placeholder="Enter Post Text Here"
                    />
                    <button type='submit'>Create Post</button>
                </Form>
            </Formik>
        </div>
    )
}

export default CreatePost