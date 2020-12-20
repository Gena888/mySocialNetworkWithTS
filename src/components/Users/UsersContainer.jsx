import { connect } from 'react-redux';
import React from 'react';
import { setCurrentPage, getUsersThunk, unfollowThunk, followThunk } from './../../redux/users-reducer';
import Users from './Users';
import Preloader from '../Common/Preloader/Preloader';
import { compose } from 'redux';
import { getPageSize, getUsers, getTotalUsersCount, getcurrentPage, getIsFetching, getFollowingInProgress } from './../../redux/selectors/user-selectors';


class UsersContainer extends React.Component {


    componentDidMount = () => {
        const { getUsersThunk, currentPage, pageSize } = this.props
        getUsersThunk(currentPage, pageSize)
    }

    onPageChanged = (pageNumber) => {
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


const mapStateToProps = (state) => {
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
    connect(mapStateToProps, { setCurrentPage, getUsersThunk, unfollowThunk, followThunk }),
    // withAuthRedirect
)(UsersContainer) 