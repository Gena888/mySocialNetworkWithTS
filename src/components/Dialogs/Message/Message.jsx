import React from 'react';
import s from './Message.module.css'


const Message = (props) => {
    let addresser = 0;
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