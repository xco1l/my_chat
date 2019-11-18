import React from 'react';
import propTypes from 'prop-types'
import { Empty, Spin } from 'antd'


import './MessagesContainer.scss'
import { Message, DialogInfoBar } from 'components'


const MessagesContainer = ({ blockRef, isLoading, items, partner, user }) => {
  return (
    <div className="">
      <div className="chat__dialogInfo">
        <DialogInfoBar fullname={partner.fullname} isOnline={partner.isOnline} />
      </div>

      <div
        className='messages-container'
        ref={blockRef}
      >
        {isLoading ? (
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