import { connect, useSelector } from 'react-redux';
import React from 'react';
import { getUsersThunk, setCurrentPageThunk, unfollowThunk, followThunk, FilterType } from '../../redux/users-reducer';
import Preloader from '../Common/Preloader/Preloader';
import { compose } from 'redux';
import { getPageSize, getUsers, getTotalUsersCount, getcurrentPage, getIsFetching, getFollowingInProgress } from '../../redux/selectors/user-selectors';
import { UsersType } from '../../types/types';
import { AppStateType } from '../../redux/redux-store';
import { getUsersFilter } from './../../redux/selectors/user-selectors';
import Users from './Users';

type PropsType = {
}

export const UsersPage:React.FC<PropsType> = (props) => {

    const isFetching = useSelector(getIsFetching)

    return (
        <>
            {isFetching ? <Preloader /> : null}
            <Users />
        </>)
}





