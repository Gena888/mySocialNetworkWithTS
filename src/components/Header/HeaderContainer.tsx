import React from 'react';
import Header from './Header';
import { connect } from 'react-redux';
import { LogoutThunk } from '../../redux/auth-reducer';
import { withAuthRedirect } from '../../Hoc/withAuthRedirect';
import { compose } from 'redux';
import { AppStateType } from '../../redux/redux-store';
import { PhotosType } from '../../types/types';

type MapStateType = {
    isAuth: boolean
    login: string | null
    profilePhotos: PhotosType
    userId: number | null
}

type MapDispatchType = {
    LogoutThunk: () => void
}

type OwnPropsType = {}

type PropsType = MapStateType & MapDispatchType & OwnPropsType

class HeaderContainer extends React.Component<PropsType> {
    render() {
        return (
            <Header {...this.props} />
        )
    }
}

let mapStateToProps = (state: AppStateType): MapStateType => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login,
    // @ts-ignore
    profilePhotos: state.profilePage.profile.photos, // как сделать чтобы был нал но ошибки ту не было??  убрать игнор! 
    userId: state.auth.userId
})


export default compose(
    connect<MapStateType, MapDispatchType, OwnPropsType, AppStateType>
        (mapStateToProps, { LogoutThunk }),
    // withAuthRedirect
)(HeaderContainer)


