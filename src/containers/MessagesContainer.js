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

    const messagesEndRef = useRef(null)
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
        messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }, [items, isLoading])




    return <MessagesContainerComponent
        items={items}
        isLoading={isLoading}
        blockRef={messagesEndRef}
        partner={partner}
        user={user}
        currentDialog = {currentDialog}
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