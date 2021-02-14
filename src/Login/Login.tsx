import React from 'react';
import { InjectedFormProps, reduxForm, submit } from 'redux-form';
import { Input } from '../components/Common/FormsControls/FormsControls';
import { required } from '../Utils/Validators/Validaors';
import { LoginThunk, setErrorThunk } from '../redux/auth-reducer';
import { connect, useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router';
import s from './Login.module.css'
import { createField } from '../components/Common/FormsControls/FormsControls';
import { AppStateType } from '../redux/redux-store';
import { getIsAuth, getCaptchaUrl, getInStateError } from '../redux/selectors/login-selectors';

type LoginFormOwnProps = {
    captchaUrl: string | null
    setErrorThunk: (error: string | null) => void
    inStateError: string | null
}

export type LoginFormValuesType = {
    email: string
    password: string
    rememberMe: boolean
    captcha: string
}

type LoginFormValuesTypeKeys = Extract<keyof LoginFormValuesType, string>

const LoginForm: React.FC<InjectedFormProps<LoginFormValuesType, LoginFormOwnProps> & LoginFormOwnProps> = ({ handleSubmit, error, captchaUrl, setErrorThunk, inStateError }) => {
    return (
        <form className={s.loginForm} onSubmit={handleSubmit}>
            {/* createField = (validate, placeholder, component, name, type) */}
            {createField<LoginFormValuesTypeKeys>([required], 'Email', Input, 'email', 'text')}
            {createField<LoginFormValuesTypeKeys>([required], 'Password', Input, 'password', 'text')}

            {captchaUrl && createField<LoginFormValuesTypeKeys>([required], 'Captha', Input, 'captcha', 'text')}
            <div className={s.buttonAndRemember}>
                <div className={s.loginButton}>
                    <button>LOGIN</button>
                </div>
                <div className={s.rememberMeDiv}>
                    <label >
                        {createField<LoginFormValuesTypeKeys>([], undefined, Input, 'rememberMe', 'checkbox')}
                        <span>remember me</span>
                    </label>
                </div>
            </div>
            {error ? setErrorThunk(error) : null}
            <div className={inStateError || captchaUrl ? s.formSummeryError : ''}>
                {inStateError || captchaUrl && <div>{inStateError}</div>}
            </div>

        </form>
    )
}

const LoginReduxForm = reduxForm<LoginFormValuesType, LoginFormOwnProps>({
    form: 'login'
})(LoginForm)




const Login = () => {

    const isAuth = useSelector(getIsAuth)
    const captchaUrl = useSelector(getCaptchaUrl)
    const inStateError = useSelector(getInStateError)
    const dispatch = useDispatch()

    const callbackSetErrorThunk = (error: string | null) => {
        dispatch(setErrorThunk(error))
    }

    const onSubmit = (formData: LoginFormValuesType) => {
        dispatch(LoginThunk(formData.email, formData.password, formData.rememberMe, formData.captcha))
    }

    if (isAuth) {
        return <Redirect to={'/profile'} />
    }

    return (
        <div className={s.loginInner}>
            <h1>login</h1>
            <LoginReduxForm
                onSubmit={onSubmit}
                captchaUrl={captchaUrl}
                setErrorThunk={callbackSetErrorThunk}
                inStateError={inStateError}
            />
            <div>
                {captchaUrl && <img className={s.captcha} src={captchaUrl} alt="captchaImg" />}
            </div>
        </div>
    )
}


export default Login;