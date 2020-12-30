import React from 'react';
import s from './Header.module.css';
import { NavLink } from 'react-router-dom';
import no_ava from '../../imagas/no-avatar.png';
import logo from './../../svg/Henadzi.png';
import { PhotosType } from '../../types/types';

type PropsType = {
    login: string | nul
    isAuth: boolean
    profilePhotos: PhotosType
    userId: number | null

    LogoutThunk: () => void
}

const Header: React.FC<PropsType> = ({ login, isAuth, LogoutThunk, profilePhotos, userId }) => {

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
                    {profilePhotos
                        ? <NavLink to={'/Profile/' + userId}>
                            <img src={srcOfImg} alt="small-avatar" />
                        </NavLink>
                        : <div></div>
                    }
                    <div className={s.loginBlock}>
                        {isAuth
                            ? <div> <span className={s.loginEmail}>{login}</span>
                                <button onClick={LogoutThunk}>Logout</button></div>
                            : <NavLink to={'/Login'} >Login</NavLink>
                        }
                    </div>
                </div>
            </div>

        </header >
    );
}

export default Header;

