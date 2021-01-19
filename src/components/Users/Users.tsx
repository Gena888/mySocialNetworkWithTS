import React from 'react';
import { FilterType } from '../../redux/users-reducer';
import { UsersType } from '../../types/types';
import Paginator from '../Common/Paginator/Paginator';
import User from './User/User';
import s from './Users.module.css'
import { UsersSearchForm } from './usersSearchForm';


type PropsType = {
    pageSize: number
    currentPage: number
    totalItemsCount: number
    usersData: Array<UsersType>
    followingInProgress: Array<number>
    
    onFilterChanged: (filter: FilterType) => void 
    followThunk: (userId: number) => void
    unfollowThunk: (userId: number) => void
    onPageChanged: (pageNumber: number) => void
}

let Users: React.FC<PropsType> = ({
    followThunk, unfollowThunk, totalItemsCount,
    followingInProgress, usersData, pageSize,
    onPageChanged, currentPage, onFilterChanged }) => {

    return (
        <div className={s.usersWrapper}>
            <UsersSearchForm onFilterChanged={onFilterChanged} />
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