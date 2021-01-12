import React from 'react';
import s from './Profile.module.css';
import MyPostsContainer from './MyPosts/MyPostsContainer';
import { ProfileType } from '../../types/types';
import ProfileInfo from './ProfileInfo/ProfileInfo';


type PropsType = {
    status: string
    profile: ProfileType | null
    isOwner: boolean
    isValidInput: boolean

    setIsValidInput: (isValid: boolean) => void
    updateStatusThunk: (status: string) => void
    savePhotoThunk: (file: any) => void
    saveProfileThunk: (profile: ProfileType | null) => void
}



const Profile: React.FC<PropsType> = ({
    status, updateStatusThunk, profile,
    isOwner, savePhotoThunk, saveProfileThunk, isValidInput, setIsValidInput }) => {
    return (
        <div>
            <ProfileInfo
                setIsValidInput={setIsValidInput}
                saveProfileThunk={saveProfileThunk}
                savePhotoThunk={savePhotoThunk}
                isOwner={isOwner}
                profile={profile}
                status={status}
                updateStatusThunk={updateStatusThunk}
                isValidInput={isValidInput}
            />
            {isOwner && <MyPostsContainer profile={profile} />}
        </div>
    );
}

export default Profile;
