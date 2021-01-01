import React, { FC } from 'react'
import s from './FormsControls.module.css'
import { Field, WrappedFieldMetaProps, WrappedFieldProps } from 'redux-form'
import { FieldValidatorType } from '../../../Utils/Validators/Validaors'

// из прорсов удалил input, 

type FormControlPropsType = {
    meta: WrappedFieldMetaProps
}

export function createField<FormKeysType extends string>(
    validate: Array<FieldValidatorType>,
    placeholder: string | undefined,
    component: React.FC<WrappedFieldProps> | "input" | "select" | "textarea" | undefined,
    name: FormKeysType,
    type: string,
    rows?: string
) {
    return (
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
}

const FormControl: React.FC<FormControlPropsType> = ({ meta: { touched, error }, children }) => {
    const hasError = touched && error;
    return (
        <div className={s.formControl + ' ' + (hasError ? s.error : '')}>
            <div>
                {children}
            </div>
            {hasError && <div className={s.formErrorDiv}>{error}</div>}
        </div>
    )
}

export const Textarea: React.FC<WrappedFieldProps> = (props) => {

    // const { input, meta, child, ...restProps } = props
    const { input, meta, ...restProps } = props
    return (
        <FormControl {...props}><textarea className={s.textarea} {...input} {...restProps} /></FormControl>
    )
}

export const Input: React.FC<WrappedFieldProps> = (props) => {

    // const { input, meta, child, ...restProps } = props
    const { input, meta, ...restProps } = props
    return (
        <FormControl {...props}><input className={s.input} {...input} {...restProps} /></FormControl>
    )
}



