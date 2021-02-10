import React, { useState, useEffect, ChangeEvent } from 'react';
import s from './ProfileInfo.module.css';
import Preloader from '../../Common/Preloader/Preloader';
import ProfileStatusWithHooks from './ProfileStatusWithHooks';
import { isUserImgLarge } from '../../Common/UserPhoto/UserPhoto';
import ProfileDataForm from './ProfileDataForm';
import ProfileData from './ProfileData'
import { ProfileType } from '../../../types/types';
import { savePhotoThunk, profileReducerActions, saveProfileThunk } from './../../../redux/profile-reducer';
import { useDispatch, useSelector } from 'react-redux';
import { getIsValidInput } from './../../../redux/selectors/profile-selectors';


type PropsType = {
    profile: ProfileType | null
    isOwner: boolean
}



const ProfileInfo: React.FC<PropsType> = ({
    profile, isOwner,  }) => {

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


    useEffect(() => {
        isValidInput && setEditMode(false);
        setIsValidInput(false)
    })

    const [editMode, setEditMode] = useState(false);

    if (!profile) {
        return <Preloader />
    }
    // e.target.files?.length - если files не null то берём длинну и выполняем тело. (вопросительный знак!!!)
    // такая же запись по старому if (e.target.files && e.target.files.length)
    const onMainPhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.length) {
            savePhoto(e.target.files[0])
        }
    }

    const onSubmit = (formData: ProfileType) => {
        saveProfile(formData);
        // isValidInput && setEditMode(false);
    }

    return (
        <div className={s.profileInfo}>
            <div className={s.descriptionBlock}>
                <div className={s.imageBlock} >
                    {/* img */}
                    <div className={s.innetImageBlock}>
                        <img className={s.userPhoto}
                            src={isUserImgLarge(profile)} alt="profilePhoto" />
                        <div className={s.onImgButtons}>
                            <div className={s.changePhotoBtn}>
                                {/* changePhoto button */}
                                {isOwner && <input id='upload' type={'file'} title=' ' onChange={onMainPhotoSelected} />}
                                <label htmlFor='upload'>Change photo</label>
                            </div>
                            <div>
                                {/* eddit button */}
                                {isOwner &&
                                    <div className={s.editButton}>
                                        <button onClick={() => { setEditMode(true) }}>Edit info</button>
                                    </div>}
                            </div>
                        </div>
                    </div>

                </div>

                <div className={s.infoBlock}>
                    {/* status */}
                    <div>
                        <ProfileStatusWithHooks />
                    </div>
                    <div>
                        {editMode
                            ? <ProfileDataForm
                                profile={profile}
                                initialValues={profile}
                                onSubmit={onSubmit}
                            />
                            : <ProfileData
                                profile={profile}
                            // isOwner={isOwner}
                            />}
                    </div>

                </div>

            </div>

        </div>
    );
}





export default ProfileInfo;