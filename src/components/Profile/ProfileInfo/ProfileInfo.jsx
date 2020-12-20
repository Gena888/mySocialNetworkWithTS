import React, { useState, useEffect } from 'react';
import s from './ProfileInfo.module.css';
import Preloader from './../../Common/Preloader/Preloader';
import ProfileStatusWithHooks from './ProfileStatusWithHooks';
import { isUserImgLarge } from '../../Common/UserPhoto/UserPhoto';
import ProfileDataForm from './ProfileDataForm';
import ProfileData from './ProfileData'

const ProfileInfo = ({
    profile, updateStatusThunk, status, isOwner,
    savePhotoThunk, saveProfileThunk, isValidInput, setIsValidInput }) => {

    useEffect(() => {
        isValidInput && setEditMode(false);
        setIsValidInput(false)

    })

    const [editMode, setEditMode] = useState(false);

    if (!profile) {
        return <Preloader />
    }

    const onMainPhotoSelected = (e) => {
        if (e.target.files.length) {
            savePhotoThunk(e.target.files[0])
        }
    }

    const onSubmit = (formData) => {
        saveProfileThunk(formData);
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
                        <ProfileStatusWithHooks
                            status={status}
                            updateStatusThunk={updateStatusThunk} />
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
                                isOwner={isOwner}
                            />}
                    </div>

                </div>

            </div>

        </div>
    );
}





export default ProfileInfo;