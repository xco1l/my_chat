import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux'

import { dialogsActions } from 'redux/actions'
import { DialogsContainer as DialogsContainerComponent } from 'components'
import socket from 'core/socket'

const DialogsContainer = ({ dialogs, user, setCurrentDialogId, currentDialogId, fetchDialogs }) => {

    const [userId, setUserId] = useState(null)
    const [value, setValue] = useState('')
    const [filtered, setFilteredDialogs] = useState(Array.from(dialogs))
    const onChangeInput = value => {

        setFilteredDialogs(
            dialogs.filter(
                dialog => {
                    const partner = dialog.chatters.filter(user=> user._id !== userId)[0]
                    return partner.fullname.toLowerCase().indexOf(value.toLowerCase()) >= 0
                }
            )
        )
        
        setValue(value)
    }

    useEffect(() => {
        if (!dialogs.length) {
            fetchDialogs()
        }
        socket.on('SERVER:DIALOG_CREATED', (data) =>{
            fetchDialogs()
        })
        setFilteredDialogs(dialogs)
    }, [dialogs, fetchDialogs])

    useEffect(() => {
        if (user)
            setUserId(user._id)
    },[user])  



    return <DialogsContainerComponent
        dialogs={filtered}
        userId={userId}
        onSearch={onChangeInput}
        inputValue={value}
        onSelectDialog={setCurrentDialogId }
        currentDialogId = {currentDialogId}
    />
};

export default connect(({ dialogs, user }) => ({
    dialogs: dialogs.dialogs,
    user: user.data
}), dialogsActions)(DialogsContainer);