import { connect } from 'react-redux';
import React from 'react';
import { getUsersThunk, setCurrentPageThunk, unfollowThunk, followThunk, FilterType } from '../../redux/users-reducer';
import Users from './Users';
import Preloader from '../Common/Preloader/Preloader';
import { compose } from 'redux';
import { getPageSize, getUsers, getTotalUsersCount, getcurrentPage, getIsFetching, getFollowingInProgress } from '../../redux/selectors/user-selectors';
import { UsersType } from '../../types/types';
import { AppStateType } from '../../redux/redux-store';
import { getUsersFilter } from './../../redux/selectors/user-selectors';

type MapStatePropsType = {
    currentPage: number
    pageSize: number
    isFetching: boolean
    totalItemsCount: number
    usersData: Array<UsersType>
    followingInProgress: Array<number>
    filter: FilterType
}

type MapDispatchPropsType = {
    getUsersThunk: (currentPage: number, pageSize: number, term: string) => void
    // setCurrentPage: (pageNumber: number) => void
    followThunk: (userId: number) => void
    unfollowThunk: (userId: number) => void
    setCurrentPageThunk: (page: number) => void
}

type OwnPropsType = {
}

type PropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType

class UsersContainer extends React.Component<PropsType> {

    componentDidMount = () => {
        const { getUsersThunk, currentPage, pageSize } = this.props
        getUsersThunk(currentPage, pageSize, '')
    }

    onPageChanged = (pageNumber: number) => {
        const { setCurrentPageThunk, getUsersThunk, pageSize, filter } = this.props
        setCurrentPageThunk(pageNumber);
        getUsersThunk(pageNumber, pageSize, filter.term)
    }

    onFilterChanged = (filter: FilterType) => {
        const { getUsersThunk, pageSize } = this.props
        getUsersThunk(1, pageSize, filter.term)
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
                    onFilterChanged={this.onFilterChanged}
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
        followingInProgress: getFollowingInProgress(state),
        filter: getUsersFilter(state)
    }
}


export default compose(
    connect<MapStatePropsType,
        MapDispatchPropsType,
        OwnPropsType, AppStateType>
        (mapStateToProps, { getUsersThunk, setCurrentPageThunk, unfollowThunk, followThunk }),
    // withAuthRedirect
)(UsersContainer) 