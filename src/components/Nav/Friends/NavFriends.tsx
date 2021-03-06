import React from 'react';
import { NavLink } from 'react-router-dom';
import s from './NavFriends.module.css';

type PropsType = {
    name: string
    imgSrc: string
}

const NavFriends:React.FC<PropsType> = (props) => {
    return (


        <div className={s.navFriendsElement}>
            <div className={s.navFriendsElementImageDiv}>
                <img src={props.imgSrc} alt="avatar" />
            </div>
            <div className={s.navFriendsElementName}>{props.name}</div>
        </div>


    );
}

export default NavFriends;
