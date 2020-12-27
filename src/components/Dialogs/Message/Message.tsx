import React from 'react';
import s from './Message.module.css'

type PropsType = {
    addresserYou: boolean
    message: string
    }


const Message: React.FC<PropsType> = (props) => {
    let addresser = ' '; // вместо ' ' было 0, но тс ругается, поменял на пустую строку, нужно проверить будет ли компелироваться, после устранения проблемы с профайлом и его типами филдов. 
    if (props.addresserYou) {
        addresser = s.ownMessage;
    } else {
        addresser = s.notOwnMessage;
    };

    return (
        <div className={s.messageArea + ' ' + addresser}>
            <div className={s.message}>{props.message}</div>
        </div>

    );
}

export default Message;