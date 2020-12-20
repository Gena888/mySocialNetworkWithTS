import React from 'react';
import { connect } from 'react-redux';
import Profile from './Profile';
import { getProfileDataThunk, setUserProfile, updateStatusThunk, getStatusThunk, savePhotoThunk, saveProfileThunk, setIsValidInput} from './../../redux/profile-reducer';
import { withRouter } from 'react-router-dom';
import { withAuthRedirect } from './../../Hoc/withAuthRedirect';
import { compose } from 'redux';



class ProfileContainer extends React.Component {

    refreshProfile() {
        let userId = this.props.match.params.userId;
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
    componentDidUpdate(prevProps, prevState) {
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
let mapStateToProps = (state) => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    autorisedUserId: state.auth.userId,
    isAuth: state.auth.isAuth,
    isValidInput: state.profilePage.isValidInput
})



export default compose(
    connect(mapStateToProps,
        {
            setUserProfile, getProfileDataThunk, saveProfileThunk,
            updateStatusThunk, getStatusThunk, savePhotoThunk, setIsValidInput
        }),
    withRouter,
    // withAuthRedirect
)(ProfileContainer)