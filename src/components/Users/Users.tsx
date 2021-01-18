import { ErrorMessage, Field, Form, Formik } from 'formik';
import React from 'react';
import { UsersType } from '../../types/types';
import Paginator from '../Common/Paginator/Paginator';
import User from './User/User';
import s from './Users.module.css'


type PropsType = {
    pageSize: number
    currentPage: number
    totalItemsCount: number
    usersData: Array<UsersType>
    followingInProgress: Array<number>

    followThunk: (userId: number) => void
    unfollowThunk: (userId: number) => void
    onPageChanged: (pageNumber: number) => void
}

let Users: React.FC<PropsType> = ({
    followThunk, unfollowThunk, totalItemsCount,
    followingInProgress, usersData, pageSize,
    onPageChanged, currentPage }) => {

    return (
        <div className={s.usersWrapper}>
            <UsersSearchForm />
            <div className={s.paginatorDiv}>
                <Paginator
                    onPageChanged={onPageChanged}
                    currentPage={currentPage}
                    totalItemsCount={totalItemsCount}
                    pageSize={pageSize}
                />
            </div>
            <div className={s.usersDiv}>
                {usersData.map((u) =>
                    <User
                        key={u.id}
                        user={u}
                        followingInProgress={followingInProgress}
                        followThunk={followThunk}
                        unfollowThunk={unfollowThunk}
                    />
                )}
            </div>

        </div>
    )
}

const UsersSearchForm = () => {
    return (
        <div>
            <Formik
                initialValues={{ email: '', password: '' }}
                validate={values => {
                    const errors = {};
                    if (!values.email) {
                        errors.email = 'Required';
                    } else if (
                        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                    ) {
                        errors.email = 'Invalid email address';
                    }
                    return errors;
                }}
                onSubmit={(values, { setSubmitting }) => {
                    setTimeout(() => {
                        alert(JSON.stringify(values, null, 2));
                        setSubmitting(false);
                    }, 400);
                }}
            >
                {({ isSubmitting }) => (
                    <Form>
                        <Field type="email" name="email" />
                        <ErrorMessage name="email" component="div" />
                        <Field type="password" name="password" />
                        <ErrorMessage name="password" component="div" />
                        <button type="submit" disabled={isSubmitting}>
                            Submit
           </button>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default Users;