import React from 'react';
import s from './Header.module.css';
import { NavLink } from 'react-router-dom';
import no_ava from '../../imagas/no-avatar.png';
import logo from './../../svg/Henadzi.png';

const Header = (props) => {
  


    let srcOfImg = '';
    if (props.state.photos != null) {

        if (props.isAuth && props.state.photos.small != null) {
            srcOfImg = props.state.photos.small;
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

                    {props.state.photos
                        ? <NavLink to={'/Profile/' + props.state.userId}>
                            <img src={srcOfImg} alt="small-avatar" />
                        </NavLink>
                        : <div></div>
                    }




                    <div className={s.loginBlock}>
                        {props.isAuth
                            ? <div> <span className={s.loginEmail}>{props.login}</span>  <button onClick={props.LogoutThunk}>Logout</button></div>
                            : <NavLink to={'/Login'} >Login</NavLink>
                        }
                    </div>
            </div>
            </div>

        </header >
    );
}

export default Header;

