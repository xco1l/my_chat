import React from 'react';
import propTypes from 'prop-types'
import { Empty, Spin } from 'antd'


import './MessagesContainer.scss'
import { Message, DialogInfoBar } from 'components'


const MessagesContainer = ({ blockRef, isLoading, items, partner, user, currentDialog }) => {
  return (
    <div className="">

        <DialogInfoBar fullname={partner.fullname} isOnline={partner.isOnline} currentDialog = {currentDialog} />


      <div
        className='messages-container'
        ref={blockRef}
      >
        {!currentDialog ? <Empty description='Please select a dialog or start ne one!' /> : isLoading ? (
          <Spin
            tip='Loading messages...'
            size='large'
          />
        ) : items.length && !isLoading ? (
          items.map(item => {
            const isMe = user.id === item.user.id
            return (
              <Message {...item} key={item._id} isMe = {isMe} />
            )
          })
        ) : (
              <Empty description='No messages found. Send a message first!' />
            )}

      </div>
    </div>
  )

};

MessagesContainer.propTypes = {
  items: propTypes.array
}

export default MessagesContainer;