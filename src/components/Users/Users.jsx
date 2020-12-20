import React from 'react';
import Paginator from '../Common/Paginator/Paginator';
import User from './User/User';
import s from './Users.module.css'


let Users = ({
    followThunk, unfollowThunk, totalItemsCount,
    followingInProgress, usersData, pageSize,
    onPageChanged, currentPage, ...props }) => {



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