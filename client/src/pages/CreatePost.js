import React from 'react';
import '../App.css';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function CreatePost() {

    const navigate = useNavigate();

    const initialValues = {
        title: "",
        postText: "",
        username: ""
    }

    const validationSchema = Yup.object().shape({
        title: Yup.string().required("Title Required"),
        postText: Yup.string().required("Post Text Required"),
        username: Yup.string().min(3).max(15).required("Username Required"),
    })

    const onSubmit = (data) => {
        axios
            .post('http://localhost:3001/posts', data)
            .then((response) => {
                navigate('/');
            })
    }

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
                    <label>Username:</label>
                    <ErrorMessage name='username' component='span' />
                    <Field
                        autoomplete='off'
                        id="inputCreatePost"
                        name="username"
                        placeholder="Enter Username Here"
                    />
                    <button type='submit'>Create Post</button>
                </Form>
            </Formik>
        </div>
    )
}

export default CreatePost