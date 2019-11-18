import React, { useEffect } from 'react';
import { Button } from 'antd'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'

import './Home.scss'
import { MessagesContainer, DialogsContainer, ChatInput } from 'containers'
import { dialogsActions, userActions } from 'redux/actions';

import{di} from 'redux'
const Home = props => {
  const { setCurrentDialogId, user, fetchUserData } = props;
  const userId = user && user._id

  useEffect(() => {
    if (!user)
      fetchUserData()
  }, [user, fetchUserData])

  useEffect(() => {
    const { pathname } = props.location;
    const dialogId = pathname.split('/').pop();
    setCurrentDialogId(dialogId);

  }, [props.location, setCurrentDialogId]);


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
          <DialogsContainer userId={userId} />
        </div>


        <div className="chat__messages-container-wrap">
          <MessagesContainer userId={userId} />
        </div>

        <div className="chat__messages-input-wrap">
          <ChatInput />
        </div>

      </div>
    </section>
  );
};

export default withRouter(
  connect(
    ({ user, dialogs }) => ({ user: user.data}, {dialogs: dialogs.dialogs}),
    {...userActions, ...dialogsActions},
  )(Home),
);