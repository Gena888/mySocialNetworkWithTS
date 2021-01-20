import { Field, Form, Formik } from 'formik';
import React from 'react';
import { FilterType } from '../../redux/users-reducer';
import s from './Users.module.css'

const usersSearchFormValidate = (values: any) => {
    const errors = {};
    return errors;
};
type PropsType = {
    onFilterChanged: (filter: FilterType) => void
}


export const UsersSearchForm: React.FC<PropsType> = React.memo(({ onFilterChanged }) => {

    const submit = (values: FilterType, { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void; }) => {
        onFilterChanged(values)
        setSubmitting(false)
    };

    return (
        <div className={s.searchForm}>
            <Formik
                initialValues={{ term: '', friend: null }}
                validate={usersSearchFormValidate}
                onSubmit={submit}
            >
                {({ isSubmitting }) => (
                    <Form>
                        <div className={s.searchFormInner}>
                            <button className={s.searchButton} type="submit" disabled={isSubmitting}>
                                Find
                            </button>
                            <Field className={s.searchInput} type="text" name="term" />
                            <Field className={s.searchSelect} name='friend' as='select' placeholder=''>
                                <option value="null">All users</option>
                                <option value="true">Only followed</option>
                                <option value="false">Only unfollowed</option>
                            </Field >
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
})