import React from 'react';
import s from './Profile.module.css';
import MyPostsContainer from './MyPosts/MyPostsContainer';
import ProfileInfo from './ProfileInfo/ProfileInfo';
import { useSelector } from 'react-redux';
import { getProfile, getIsAuth, getIsValidInput } from './../../redux/selectors/profile-selectors';


type PropsType = {
    isOwner: boolean
}

const Profile: React.FC<PropsType> = ({ isOwner }) => {
    const profile = useSelector(getProfile)
    const isAuth = useSelector(getIsAuth)

    return (
        <div>
            <ProfileInfo
                isOwner={isOwner}
                profile={profile}
            />
            {isOwner && <MyPostsContainer profile={profile} />}
        </div>
    );
}

export default Profile;
