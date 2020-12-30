import React from 'react';
import { InjectedFormProps, reduxForm, submit } from 'redux-form';
import { Input } from '../components/Common/FormsControls/FormsControls';
import { required } from '../Utils/Validators/Validaors';
import { LoginThunk, setErrorThunk } from '../redux/auth-reducer';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import s from './Login.module.css'
import { createField } from '../components/Common/FormsControls/FormsControls';
import { AppStateType } from '../redux/redux-store';

type LoginFormOwnProps = {
    captchaUrl: string | null
    setErrorThunk: (error: string | null) => void
    inStateError: string | null
}

const LoginForm: React.FC<InjectedFormProps<LoginFormValuesType, LoginFormOwnProps> & LoginFormOwnProps> = ({ handleSubmit, error, captchaUrl, setErrorThunk, inStateError }) => {
    return (
        <form className={s.loginForm} onSubmit={handleSubmit}>
            {/* createField = (validate, placeholder, component, name, type) */}
            {createField([required], 'Email', Input, 'email', 'text')}
            {createField([required], 'Password', Input, 'password', 'text')}

            {captchaUrl && createField([required], 'Captha', Input, 'captcha', 'text')}
            <div className={s.buttonAndRemember}>
                <div className={s.loginButton}>
                    <button>LOGIN</button>
                </div>
                <div className={s.rememberMeDiv}>
                    <label >
                        {createField([], null, Input, 'rememberMe', 'checkbox')}
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


const LoginReduxForm = reduxForm<LoginFormValuesType, LoginFormOwnProps >({
    form: 'login'
})(LoginForm)

type MapStatePropsType = {
    isAuth: boolean
    captchaUrl: string | null
    inStateError: string | null
}


type MapDispatcPropsType = {
    LoginThunk: (email: string, password: string, rememberMe: boolean, captcha: string) => void
    setErrorThunk: (error: string | null) => void
}

type LoginFormValuesType = {
    email: string
    password: string
    rememberMe: boolean
    captcha: string
}

const Login: React.FC<MapStatePropsType & MapDispatcPropsType> = ({ LoginThunk, isAuth, captchaUrl, setErrorThunk, inStateError }) => {

    const onSubmit = (formData: LoginFormValuesType) => {
        LoginThunk(formData.email, formData.password, formData.rememberMe, formData.captcha)
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
                setErrorThunk={setErrorThunk}
                inStateError={inStateError}
            />
            <div>
                {captchaUrl && <img className={s.captcha} src={captchaUrl} alt="captchaImg" />}
            </div>
        </div>
    )
}

const mapStateToProps = (state: AppStateType): MapStatePropsType => ({
    isAuth: state.auth.isAuth,
    captchaUrl: state.auth.captchaUrl,
    inStateError: state.auth.inStateError

})

export default connect(mapStateToProps, { LoginThunk, setErrorThunk })(Login);