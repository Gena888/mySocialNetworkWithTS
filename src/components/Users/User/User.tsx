import React from 'react';
import s from './User.module.css';
import { NavLink } from 'react-router-dom';
import { isUserImgSmall } from '../../Common/UserPhoto/UserPhoto';
import { UsersType } from '../../../types/types';

type PropsType = {
    user: UsersType
    followingInProgress: Array<number>

    followThunk: (userId: number) => void
    unfollowThunk: (userId: number) => void
}

let User: React.FC<PropsType> = ({
    followThunk, unfollowThunk,
    followingInProgress, user, ...props }) => {

    return (
        <div className={s.userWrapp} >

            <div className={s.userPhoto}>
                <NavLink to={'/Profile/' + user.id}>
                    <img
                        src={isUserImgSmall(user)}
                        alt="userAva" />
                </NavLink>
            </div>

            <div className={s.userInfo} >

                <div className={s.userName}> <b>Name:</b> {user.name}</div>

                <div className={s.userStatus}><b> Status:</b> {user.status ? user.status : 'no status'}</div>

                <div className={s.button}>
                    {user.followed
                        ? <button
                            disabled={followingInProgress.some(id => id === user.id)}
                            onClick={() => {
                                unfollowThunk(user.id)
                            }} >unFollow</button>
                        : <button
                            disabled={followingInProgress.some(id => id === user.id)}
                            onClick={() => {
                                followThunk(user.id)
                            }} >Follow</button>}
                </div>
            </div>


        </div>
    )
}



export default User;