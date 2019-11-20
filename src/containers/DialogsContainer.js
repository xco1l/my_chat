import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux'

import { dialogsActions } from 'redux/actions'
import { DialogsContainer as DialogsContainerComponent } from 'components'
import socket from 'core/socket'

const DialogsContainer = ({ dialogs, user, setCurrentDialog, currentDialog, fetchDialogs, setDialogIsTyping }) => {

    const [userId, setUserId] = useState(null)
    const [value, setValue] = useState('')
    const [filteredDialogs, setFilteredDialogs] = useState(Array.from(dialogs))
    const [typingDialogs, setTypingDialogs] = useState([])

    const queue = array => {
        array.shift()
        return array
    }

    const push = (array, value) => {
        array.push(value)
        return array
    }

    const onChangeInput = value => {
        setFilteredDialogs(dialogs => {
            dialogs.filter(dialog => {
                if (value) {
                    const partner = dialog.chatters.filter(user => user._id !== userId)[0]
                    return partner.fullname.toLowerCase().indexOf(value.toLowerCase()) >= 0
                } else {
                    return dialog
                }
            })
        })

        setValue(value)
    }

    useEffect(() => {

        if (!dialogs.length) {
            fetchDialogs()
        }

        socket.on('SERVER:DIALOG_CREATED', (data) => {
            fetchDialogs()
        })

        setFilteredDialogs(dialogs)

        socket.on('DIALOG:TYPING', ({ dialogId }) => {
            setTypingDialogs(push(typingDialogs, dialogId))
            setDialogIsTyping({typingDialogs})
            setTimeout(() => {
                setTypingDialogs(queue(typingDialogs))
                setDialogIsTyping({typingDialogs})
            }, 3000)
        })



        return () => socket.removeListener('DIALOG:TYPING')
    }, [dialogs, fetchDialogs, setDialogIsTyping, typingDialogs])

    useEffect(() => {
        if (user)
            setUserId(user._id)
    }, [user])

    return <DialogsContainerComponent
        dialogs={filteredDialogs}
        userId={userId}
        onSearch={onChangeInput}
        inputValue={value}
        onSelectDialog={setCurrentDialog}
        currentDialogId={currentDialog._id}
    />
};

export default connect(({ dialogs, user }) => ({
    dialogs: dialogs.dialogs,
    user: user.data
}), dialogsActions)(DialogsContainer);