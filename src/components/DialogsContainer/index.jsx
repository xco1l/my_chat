import React from 'react';
import orderBy from 'lodash/orderBy'
import classNames from 'classnames'
import {Input, Empty} from 'antd'


import './DialogsContainer.scss'
import { Dialog } from 'components'




const DialogsContainer = ({ 
    dialogs, 
    userId, 
    onSearch,
    inputValue, 
    currentDialogId, 
    onSelectDialog,
}) => {
    return (
        <div className='dialogs-container'>
        <div className="dialogs-container__search">
          <Input.Search
            placeholder='Search'
            onChange={e => onSearch(e.target.value)}
            value = {inputValue}
          />
        </div>
            {dialogs.length ? (
                orderBy(dialogs, 'created_at', 'desc').map((dialog) => {
                    const partner = dialog.chatters.filter(user=> user._id !== userId)[0]
                    return(
                        <div
                    className={classNames("dialogs-container__dialog-wrap", {
                        'active': currentDialogId === dialog._id
                    })}
                    key = {dialog._id+1}
                >
                    <Dialog
                        {...dialog}
                        key={dialog._id}
                        isMe={dialog.lastMessage.user._id === userId}
                        onSelect = {onSelectDialog}
                        partner = {partner}
                    />
                    </div>
                       
                    )})) : (
                        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description='Nothing found' />
                    )
                }
        </div>
    );
};

export default DialogsContainer;