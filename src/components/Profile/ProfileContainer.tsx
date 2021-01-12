import React from 'react';
import { connect } from 'react-redux';
import Profile from './Profile';
import { profileReducerActions, getProfileDataThunk, updateStatusThunk, getStatusThunk, savePhotoThunk, saveProfileThunk } from '../../redux/profile-reducer';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { withAuthRedirect } from '../../Hoc/withAuthRedirect';
import { compose } from 'redux';
import { ProfileType } from '../../types/types';
import { AppStateType } from '../../redux/redux-store';

type MapStatePropsType = ReturnType<typeof mapStateToProps>

type MapDispatchPropsType = {
    getStatusThunk: (userId: number | null) => void
    getProfileDataThunk: (userId: number | null) => void
    updateStatusThunk: (status: string) => void
    saveProfileThunk: (profile: ProfileType | null) => void
    savePhotoThunk: (file: File) => void
    setUserProfile: (profile: ProfileType | null) => void
    setIsValidInput: (isValid: boolean) => void
}
type PathParamsType = {
    userId: string
}
type RoutePropsType = RouteComponentProps<PathParamsType>
type PropsType = RoutePropsType & MapStatePropsType & MapDispatchPropsType

// + преобразование 
class ProfileContainer extends React.Component<PropsType> {
    refreshProfile() {
        let userId: number | null = +this.props.match.params.userId;
        if (!userId) {
            userId = this.props.autorisedUserId;
            if (!userId) {
                this.props.history.push('/Login')
                // push history в любом месте кода берёт и меняет URL. условной альтернативой может быть redirect
            }
        } 
        this.props.getProfileDataThunk(userId);
        this.props.getStatusThunk(userId);
    }

    componentDidMount() {
        this.refreshProfile()
    }
    // .match пришёл в пропсы из HOC withRouter. это инфа связанная и URL
    componentDidUpdate(prevProps: PropsType, prevState: PropsType) {
        if (this.props.match.params.userId != prevProps.match.params.userId) {
            this.refreshProfile()
        }
    }

    render() {
        return (
            <div>
                <Profile
                    {...this.props}
                    setIsValidInput={this.props.setIsValidInput}
                    savePhotoThunk={this.props.savePhotoThunk}
                    isOwner={!this.props.match.params.userId}
                    profile={this.props.profile}
                    status={this.props.status}
                    isValidInput={this.props.isValidInput}
                    updateStatusThunk={this.props.updateStatusThunk} />
            </div>
        )
    }
}
let mapStateToProps = (state: AppStateType) => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    autorisedUserId: state.auth.userId,
    isAuth: state.auth.isAuth,
    isValidInput: state.profilePage.isValidInput
})



export default compose<React.ComponentType>(
    connect<MapStatePropsType, MapDispatchPropsType, RoutePropsType, AppStateType>
        (mapStateToProps,
            {
                setUserProfile: profileReducerActions.setUserProfile, getProfileDataThunk,
                saveProfileThunk, updateStatusThunk, getStatusThunk, savePhotoThunk,
                setIsValidInput: profileReducerActions.setIsValidInput
            }),
    withRouter,
    // withAuthRedirect
)(ProfileContainer)