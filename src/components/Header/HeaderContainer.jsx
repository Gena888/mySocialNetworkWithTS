import React from 'react';
import Header from './Header.tsx';
import { connect } from 'react-redux';
import { LogoutThunk } from './../../redux/auth-reducer';
import { withAuthRedirect } from './../../Hoc/withAuthRedirect';
import { compose } from 'redux';
import { Redirect } from 'react-router';


class HeaderContainer extends React.Component {


    render() {

        return (
            <Header {...this.props} />
        )
    }

}

let mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login,
    profilePhotos: state.profilePage.profile.photos,
    userId: state.auth.userId
})



export default compose(
    connect(mapStateToProps, { LogoutThunk }),
    // withAuthRedirect
)(HeaderContainer)


