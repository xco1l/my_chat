import React, { useEffect } from 'react'
import { Button } from 'antd'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'

import './Home.scss'
import { MessagesContainer, DialogsContainer, ChatInput } from 'containers'
import { userActions } from 'redux/actions'
import socket from 'core/socket'

const Home = props => {
  const { user, fetchUserData } = props

  useEffect(() => {
    socket.on('connect', () => {
      if (!user)
      fetchUserData()
    })

  })

  return (
    <section className='home'>
      <div className="chat">

        <div className="chat__header">
          <div>
            <Button icon='team' type='link' shape='circle' />
            <span className='chat__header-sectionName'>Dialogs list</span>
          </div>
          <Button icon='form' type='link' shape='circle' />
        </div>

        <div className="chat__dialogs-container">
          <DialogsContainer />
        </div>


        <div className="chat__messages-container-wrap">
          <MessagesContainer />
        </div>

        <div className="chat__messages-input-wrap">
          <ChatInput />
        </div>

      </div>
    </section>
  )
}

export default withRouter(
  connect(
    ({ user }) => ({user: user.data}),
    userActions,
  )(Home),
)