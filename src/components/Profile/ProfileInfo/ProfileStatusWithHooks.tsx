import React, { useEffect, useState } from 'react';
import s from './ProfileInfo.module.css'

type PropsType = {
    status: string
    updateStatusThunk: (status: string) => void
}

const ProfileStatusWithHooks: React.FC<PropsType> = (props) => {


    let [editMode, setEditMode] = useState(false)
    let [status, setStatus] = useState(props.status)

    useEffect(() => {
        setStatus(props.status)
    }, [props.status])

    // хок useEffect вызывается при render компоненты 
    // в useEffect вторым параметром передаётся массив зависимостей 

    const activateEditMode = () => {
        setEditMode(true);
    }

    const deactivateEditMode = () => {
        setEditMode(false);
        props.updateStatusThunk(status);
    }

    const onStatusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setStatus(e.currentTarget.value);
    }

    return (
        <div className={s.statusBlock}>
            <div className={s.innerStatusBlock}>
                {!editMode &&
                    <span className={s.userStatus} onDoubleClick={activateEditMode}>{props.status || 'That user have got no status.'}</span>
                }
                {editMode &&

                    <input
                        onBlur={deactivateEditMode} onChange={onStatusChange} placeholder={'Enter your status'}
                        value={status} autoFocus={true} />
                }
            </div>
        </div>
    )

}

export default ProfileStatusWithHooks;