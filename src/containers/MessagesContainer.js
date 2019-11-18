import React, { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux'
import find from 'lodash/find'

import { messagesActions } from 'redux/actions'
import { MessagesContainer as MessagesContainerComponent } from 'components'
import socket from 'core/socket'


const MessagesContainer = ({ items, currentDialog, fetchMessages, isLoading, dialogs, user, addMessage }) => {

    const onNewMessage = data => {
        addMessage(data);
    };

    const messageRef = useRef(null)
    const [partner, setPartner] = useState({})


    useEffect(() => {
        if (currentDialog) {
            fetchMessages(currentDialog._id)
            setPartner(currentDialog.chatters.find(chatter => chatter.id === user._id))
        }

        socket.on('SERVER:NEW_MESSAGE', onNewMessage);

        return () => socket.removeListener('SERVER:NEW_MESSAGE', onNewMessage);
    }, [currentDialog]
    )

    useEffect(() => {
        messageRef.current.scrollTo(0, 999999999999999)
    }, [items])




    return <MessagesContainerComponent
        items={items}
        isLoading={isLoading}
        blockRef={messageRef}
        partner={partner}
        user={user}
    />
};



export default connect(
    ({ messages, dialogs, user }) => ({
        currentDialog: find(dialogs.dialogs, { _id: dialogs.currentDialogId }),
        dialogs: dialogs.dialogs,
        items: messages.items,
        isLoading: messages.isLoading,
        user: user.data
    }),
    messagesActions
)(MessagesContainer);