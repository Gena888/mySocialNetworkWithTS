import React from 'react';
import { NavLink } from 'react-router-dom';
import s from './Nav.module.css';
import NavFriends from './Friends/NavFriends';
import { NavInitialStateType } from '../../redux/nav-reducer';

type PropsType = {
    navPage: NavInitialStateType
    isAuth: boolean
}

const Nav: React.FC<PropsType> = (props) => {
    let navFriend =
        props.navPage.navFriendsData.map(navFriendEl =>
            <NavFriends key={navFriendEl.id} imgSrc={navFriendEl.imgSrc} name={navFriendEl.name} />);

    return (
        <nav className={s.nav}>
            <div className={s.navInner}>
                <div className={s.item}>
                    <NavLink activeClassName={s.active} to="/Profile">Profile</NavLink>
                </div>
                <div className={s.item}>
                    <NavLink activeClassName={s.active} to="/Dialogs">Messages</NavLink>
                </div>
                <div className={s.item}>
                    <NavLink activeClassName={s.active} to="/Users">Users</NavLink>
                </div>
                <div className={s.item}>
                    <NavLink activeClassName={s.active} to="/News">News</NavLink>
                </div>
                <div className={s.item}>
                    <NavLink activeClassName={s.active} to="/Settings">Settings</NavLink>
                </div>
                <div className={s.line}></div>
            </div>

            {props.isAuth
                ? <div className={s.navFriends}>
                    <div>
                        <h2>Friends</h2>
                    </div>
                    <div className={s.navFriendsInner}>
                        {navFriend}
                    </div>
                </div>
                : <div></div>
            }

        </nav>
    );
}

export default Nav;


