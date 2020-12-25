import React from 'react';
import { connect } from 'react-redux';
import Profile from './Profile';
import { getProfileDataThunk, setUserProfile, updateStatusThunk, getStatusThunk, savePhotoThunk, saveProfileThunk, setIsValidInput } from '../../redux/profile-reducer';
import { withRouter } from 'react-router-dom';
import { withAuthRedirect } from '../../Hoc/withAuthRedirect';
import { compose } from 'redux';
import { ProfileType } from '../../types/types';
import { AppStateType } from '../../redux/redux-store';

type MapStatePropsType = {
    profile: ProfileType | null
    status: string
    isValidInput: boolean
    autorisedUserId: number | null
    isAuth: boolean
    
}

type MapDispatchPropsType = {
    getStatusThunk: (userId: number | null) => void
    getProfileDataThunk: (userId: number | null) => void
    updateStatusThunk: (status: string) => void
    setUserProfile: (profile: ProfileType | null) => void
    saveProfileThunk: (profile: ProfileType| null) => void
    savePhotoThunk: (file: any) => void
    setIsValidInput: (isValid: boolean) => void
}


type OwnPropsType = {
    match: any
    history: Array<string>
}

type PropsType = OwnPropsType & MapStatePropsType & MapDispatchPropsType

class ProfileContainer extends React.Component<PropsType> {

    refreshProfile() {
        let userId: number | null = this.props.match.params.userId;
        if (!userId) {
            userId = this.props.autorisedUserId;
            if (!userId) {
                this.props.history.push('/Login')
            }
        }
        this.props.getProfileDataThunk(userId);
        this.props.getStatusThunk(userId);
    }

    componentDidMount() {
        this.refreshProfile()
    }
    // .match пришёл в пропсы из HOC withRouter. это инфа связанная и URL
    componentDidUpdate(prevProps: PropsType, prevState: AppStateType) {
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
let mapStateToProps = (state: AppStateType): MapStatePropsType => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    autorisedUserId: state.auth.userId,
    isAuth: state.auth.isAuth,
    isValidInput: state.profilePage.isValidInput
})



export default compose(
    connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, AppStateType>
        (mapStateToProps,
            {
                setUserProfile, getProfileDataThunk, saveProfileThunk,
                updateStatusThunk, getStatusThunk, savePhotoThunk, setIsValidInput
            }),
    withRouter,
    // withAuthRedirect
)(ProfileContainer)