import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FilterType, followThunk, setCurrentPageThunk } from '../../redux/users-reducer';
import Paginator from '../Common/Paginator/Paginator';
import User from './User/User';
import s from './Users.module.css'
import { UsersSearchForm } from './usersSearchForm';
import { getcurrentPage, getPageSize, getTotalUsersCount, getUsers, getFollowingInProgress, getUsersFilter } from './../../redux/selectors/user-selectors';
import { getUsersThunk, unfollowThunk } from './../../redux/users-reducer';


type PropsType = {
}

let Users: React.FC<PropsType> = (props) => {

    const usersData = useSelector(getUsers)
    const pageSize = useSelector(getPageSize)
    const totalItemsCount = useSelector(getTotalUsersCount)
    const currentPage = useSelector(getcurrentPage)
    const followingInProgress = useSelector(getFollowingInProgress)
    const filter = useSelector(getUsersFilter)

    const dispatch = useDispatch()

    const onPageChanged = (pageNumber: number) => {
        dispatch(setCurrentPageThunk(pageNumber))
        dispatch(getUsersThunk(pageNumber, pageSize, filter))
    }
    const onFilterChanged = (filter: FilterType) => {
        dispatch(getUsersThunk(1, pageSize, filter))
    }
    const follow = (userId: number) => {
        dispatch(followThunk(userId))
    }
    const unfollow = (userId: number) => {
        dispatch(unfollowThunk(userId))
    }

    useEffect(() => {
        dispatch(getUsersThunk(currentPage, pageSize, filter))
    }, [])


    return (
        <div className={s.usersWrapper}>
            <div>
                <UsersSearchForm onFilterChanged={onFilterChanged} />
            </div>
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
                        followThunk={follow}
                        unfollowThunk={unfollow}
                    />
                )}
            </div>
        </div>
    )
}


export default Users;