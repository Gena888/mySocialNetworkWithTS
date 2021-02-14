import React from 'react';
import s from './Header.module.css';
import { NavLink } from 'react-router-dom';
import no_ava from '../../imagas/no-avatar.png';
import logo from './../../svg/Henadzi.png';
import { useSelector, useDispatch } from 'react-redux';
import { getIsAuth, getLogin, getProfilePhotos, getUserId } from '../../redux/selectors/header-selectors';
import { LogoutThunk } from '../../redux/auth-reducer';

type PropsType = {
}

const Header: React.FC<PropsType> = () => {

    let isAuth = useSelector(getIsAuth)
    let login = useSelector(getLogin)
    let profilePhotos = useSelector(getProfilePhotos)
    let userId = useSelector(getUserId)
    let dispatch = useDispatch()

    let Logout = () => {
        dispatch(LogoutThunk())
    }

    let srcOfImg = '';
    if (profilePhotos != null) {

        if (isAuth && profilePhotos.small != null) {
            srcOfImg = profilePhotos.small;
        } else {
            srcOfImg = no_ava;
        }
    }
    // const onLogoutClick = () => {

    // }
    return (
        <header className={s.header}>
            <div className={s.innerHeader}>
                <img src={logo} alt="" />
                <div className={s.loginBlock} >
                    {/* {profilePhotos
                        ? <NavLink to={'/Profile/' + userId}>
                            <img src={srcOfImg} alt="small-avatar" />
                        </NavLink>
                        : <div></div>
                    } */}
                    <div className={s.loginBlock}>
                        {isAuth
                            ? <div> <span className={s.loginEmail}>{login}</span>
                                <button onClick={Logout}>Logout</button></div>
                            : <NavLink to={'/Login'} >Login</NavLink>
                        }
                    </div>
                </div>
            </div>

        </header >
    );
}

export default Header;

