import React from 'react';
import s from './DialogItem.module.css'
import { NavLink } from 'react-router-dom';


const DialogItem = (props) => {
    return (
        <div className={s.dialog}>

            <NavLink to={"/Dialogs/" + props.id}>
                <div className=
                    {props.paramsUserId == props.id ? s.active : s.noActive + ' ' + s.avaImg} >
                    <img src={props.imgSrc} alt="avatar" />
                </div>
                <div className={s.name}>
                    {props.name}
                </div>
            </NavLink>

            {/* jsx элемент принимает данные для отрисовки из props, которые туда попали из массива данных через .map */}
        </div>
    );
}

export default DialogItem;