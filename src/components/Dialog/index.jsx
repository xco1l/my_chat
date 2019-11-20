import React from 'react';
import format from 'date-fns/format'
import isToday from 'date-fns/isToday'
import isThisYear from 'date-fns/isThisYear'
import classNames from 'classnames'

import './Dialog.scss'
import { IconReaded, Avatar } from 'components'


const getMessageTime = created_at => {
    if (isToday(created_at)) {
        return format(created_at, 'HH:mm')
    } else if (isThisYear(created_at)) {
        return format(created_at, 'dd.MM')
    } else {
        return format(created_at, 'dd.MM.yy')
    }
}

const Dialog = ({
    partner,
    isTyping,
    isMe,
    lastMessage,
    onSelect,
    _id,
}) => {
    return (
        <div
        className={classNames('dialog', { 
            'dialog_online': partner.isOnline,
        })}
        onClick={onSelect.bind(this, _id)}
        >
            <div className="dialog__item-avatar-wrap">
                <Avatar user = {partner} />
            </div>
            
            <div className="dialog__item dialog__item-info">
                <p className="dialog__author">{partner.fullname}</p>
                <span className='dialog__date'>{getMessageTime(new Date(lastMessage.createdAt))}</span>
            </div>
            <div className="dialog__item dialog__item-body">
                
                <p className="dialog__lastMessage">{isTyping ? 'typing...' : lastMessage.text}</p>
                {
                !isTyping && ( isMe ?  (<IconReaded isReaded={lastMessage.isReaded} />) :
                    (lastMessage.unreaded > 0 && <span className="dialog__count">{lastMessage.unreaded}</span>))
                }

            </div>
        </div>
    );
};

export default Dialog;