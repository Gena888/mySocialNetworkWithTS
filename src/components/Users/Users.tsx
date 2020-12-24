import React from 'react';
import { UsersType } from '../../types/types';
import Paginator from '../Common/Paginator/Paginator';
import User from './User/User';
import s from './Users.module.css'

type PropsType = {
    pageSize: number
    currentPage: number
    totalItemsCount: number
    usersData: Array<UsersType>
    followingInProgress: Array<number>

    followThunk: (userId: number) => void
    unfollowThunk: (userId: number) => void
    onPageChanged: (pageNumber: number) => void
}

let Users: React.FC<PropsType> = ({
    followThunk, unfollowThunk, totalItemsCount,
    followingInProgress, usersData, pageSize,
    onPageChanged, currentPage }) => {

    return (
        <div className={s.usersWrapper}>
            <div className={s.paginatorDiv}>
                <Paginator
                    onPageChanged={onPageChanged}
                    currentPage={currentPage}
                    totalItemsCount={totalItemsCount}
                    pageSize={pageSize}
                />
            </div>
            <div className={s.usersDiv}>
                {usersData.map((u) =>
                    <User
                        key={u.id}
                        user={u}
                        followingInProgress={followingInProgress}
                        followThunk={followThunk}
                        unfollowThunk={unfollowThunk}
                    />
                )}
            </div>

        </div>
    )
}



export default Users;