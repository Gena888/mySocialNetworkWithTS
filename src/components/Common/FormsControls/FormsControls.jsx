import React from 'react';
import s from './FormsControls.module.css'
import { Field } from 'redux-form';



const FormControl = ({ input, meta: { touched, error }, ...props }) => {
    const hasError = touched && error;
    return (
        <div className={s.formControl + ' ' + (hasError ? s.error : '')}>
            <div>
                {props.children}
            </div>
            {hasError && <div className={s.formErrorDiv}>{error}</div>}
        </div>
    )
}


export const Textarea = (props) => {

    const { input, meta, child, ...restProps } = props
    return (
        <FormControl {...props}><textarea className={s.textarea} {...input} {...restProps} /></FormControl>
    )
}

export const Input = (props) => {

    const { input, meta, child, ...restProps } = props
    return (
        <FormControl {...props}><input className={s.input} {...input} {...restProps} /></FormControl>
    )
}

export const createField = (validate, placeholder, component, name, type, rows) => (
    <div>
        <Field
            validate={validate}
            placeholder={placeholder}
            component={component}
            name={name}
            type={type}
            rows={rows}
        />
    </div>
)


