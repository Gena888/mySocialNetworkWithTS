import React from 'react';
import s from './Profile.module.css';
import MyPostsContainer from './MyPosts/MyPostsContainer';
import { ProfileType } from '../../types/types';
import ProfileInfo from './ProfileInfo/ProfileInfo';
import { useDispatch, useSelector } from 'react-redux';
import { getProfile, getStatus, getAutorisedUserId, getIsAuth, getIsValidInput } from './../../redux/selectors/profile-selectors';
import { savePhotoThunk, profileReducerActions, saveProfileThunk } from './../../redux/profile-reducer';


type PropsType = {
    isOwner: boolean
}

const Profile: React.FC<PropsType> = ({ isOwner }) => {
    const profile = useSelector(getProfile)
    const isAuth = useSelector(getIsAuth)
    const isValidInput = useSelector(getIsValidInput)

    const dispatch = useDispatch()

    const setIsValidInput = (isValid: boolean) => {
        dispatch(profileReducerActions.setIsValidInput(isValid))
    }
    const savePhoto = (file: any) => {
        dispatch(savePhotoThunk(file))
    }
    const saveProfile = (profile: ProfileType | null) => {
        dispatch(saveProfileThunk(profile))
    }

    return (
        <div>
            <ProfileInfo
                setIsValidInput={setIsValidInput}
                saveProfileThunk={saveProfile}
                savePhotoThunk={savePhoto}
                isOwner={isOwner}
                profile={profile}
                isValidInput={isValidInput}
            />
            {isOwner && <MyPostsContainer profile={profile} />}
        </div>
    );
}

export default Profile;
