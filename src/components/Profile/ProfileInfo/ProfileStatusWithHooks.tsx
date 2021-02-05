import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateStatusThunk } from '../../../redux/profile-reducer';
import { getStatus } from '../../../redux/selectors/profile-selectors';
import s from './ProfileInfo.module.css'

type PropsType = {

}

const ProfileStatusWithHooks: React.FC<PropsType> = () => {
    const status = useSelector(getStatus)
    const dispatch = useDispatch()
    const updateStatus = (status: string) => {
        dispatch(updateStatusThunk)
    }

    let [editMode, setEditMode] = useState(false)
    let [newStatus, setStatus] = useState(status)

    useEffect(() => {
        setStatus(status)
    }, [status])

    // хок useEffect вызывается при render компоненты 
    // в useEffect вторым параметром передаётся массив зависимостей 

    const activateEditMode = () => {
        setEditMode(true);
    }

    const deactivateEditMode = () => {
        setEditMode(false);
        updateStatus(newStatus);
    }

    const onStatusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setStatus(e.currentTarget.value);
    }

    return (
        <div className={s.statusBlock}>
            <div className={s.innerStatusBlock}>
                {!editMode &&
                    <span className={s.userStatus} onDoubleClick={activateEditMode}>{status || 'That user have got no status.'}</span>
                }
                {editMode &&

                    <input
                        onBlur={deactivateEditMode} onChange={onStatusChange} placeholder={'Enter your status'}
                        value={newStatus} autoFocus={true} />
                }
            </div>
        </div>
    )

}

export default ProfileStatusWithHooks;