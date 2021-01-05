import { connect } from 'react-redux';
import React from 'react';
import { getUsersThunk, setCurrentPage, unfollowThunk, followThunk } from '../../redux/users-reducer';
import Users from './Users';
import Preloader from '../Common/Preloader/Preloader';
import { compose } from 'redux';
import { getPageSize, getUsers, getTotalUsersCount, getcurrentPage, getIsFetching, getFollowingInProgress } from '../../redux/selectors/user-selectors';
import { UsersType } from '../../types/types';
import { AppStateType } from '../../redux/redux-store';

type MapStatePropsType = {
    currentPage: number
    pageSize: number
    isFetching: boolean
    totalItemsCount: number
    usersData: Array<UsersType>
    followingInProgress: Array<number>
}

type MapDispatchPropsType = {
    getUsersThunk: (currentPage: number, pageSize: number) => void
    setCurrentPage: (pageNumber: number) => void
    followThunk: (userId: number) => void
    unfollowThunk: (userId: number) => void
}

type OwnPropsType = {
}

type PropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType

class UsersContainer extends React.Component<PropsType> {

    componentDidMount = () => {
        const { getUsersThunk, currentPage, pageSize } = this.props
        getUsersThunk(currentPage, pageSize)
    }

    onPageChanged = (pageNumber: number) => {
        const { setCurrentPage, getUsersThunk, pageSize } = this.props
        setCurrentPage(pageNumber);
        getUsersThunk(pageNumber, pageSize)
    }

    render = () => {
        return (
            <>
                {this.props.isFetching ? <Preloader /> : null}
                <Users
                    totalItemsCount={this.props.totalItemsCount}
                    pageSize={this.props.pageSize}
                    currentPage={this.props.currentPage}
                    onPageChanged={this.onPageChanged}
                    usersData={this.props.usersData}
                    followingInProgress={this.props.followingInProgress}
                    unfollowThunk={this.props.unfollowThunk}
                    followThunk={this.props.followThunk}
                />
            </>)
    }
}

const mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        usersData: getUsers(state),
        pageSize: getPageSize(state),
        totalItemsCount: getTotalUsersCount(state),
        currentPage: getcurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state)
    }
}


export default compose(
    connect<MapStatePropsType,
        MapDispatchPropsType,
        OwnPropsType, AppStateType>
        (mapStateToProps, { getUsersThunk, setCurrentPage, unfollowThunk, followThunk }),
    // withAuthRedirect
)(UsersContainer) 