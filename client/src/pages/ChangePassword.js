import React from 'react';
import '../App.css';
import { Formik, Form, Field, ErrorMessage } from 'formik';
// import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup';
import axios from 'axios';

function ChangePassword() {


    const initialValues = {
        oldPassword: "",
        newPassword: "",
    }

    const validationSchema = Yup.object().shape({
        oldPassword: Yup.string().min(3).max(15).required("Old Password Required"),
        newPassword: Yup.string().min(4).max(20).required('NEw Password Required')
    })

    const onSubmit = (data) => {
        console.log(data);
        axios
            .put("http://localhost:3001/auth/changepassword",
                { oldPassword: data.oldPassword, newPassword: data.newPassword },
                { headers: { accessToken: localStorage.getItem("accessToken") } })

            .then((response) => {
                console.log(response.data)
            })
    }

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
        >
            <Form className='formContainer'>
                <h1>ChangePassword</h1>
                <label>Old Password:</label>
                <ErrorMessage name='oldPassword' component='span' />
                <Field
                    autoomplete='off'
                    id="inputCreatePost"
                    name="oldPassword"
                    placeholder="Enter Old Password Here"
                />
                <label>New Password:</label>
                <ErrorMessage name='newPassword' component='span' />
                <Field
                    autoomplete='off'
                    id="inputCreatePost"
                    name="newPassword"
                    placeholder="Enter New Password Here"
                />
                <button type='submit'>Save Changes</button>
            </Form>
        </Formik>
    )
}

export default ChangePassword