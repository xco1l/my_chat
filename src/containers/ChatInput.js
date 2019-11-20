import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux'
import find from 'lodash/find'


import { ChatInput as ChatInpuComponent } from 'components'
import { messagesActions } from 'redux/actions';
import socket from 'core/socket'



const ChatInput = ({ fetchSendMessage, currentDialog, user }) => {

    const [socketTimeout, setSocketTimeout] = useState(true)
    const [userId, setUserId] = useState(null)
    const [currentDialogId, setCurrentDialogId] = useState(null)
    const [partner, setPartner] = useState(null)
    const [value, setValue] = useState('')
    const [pickerIsVisible, setPickerIsVisible] = useState(false)


    const handleSendMessage = e => {
        if (value && socketTimeout) {
            setSocketTimeout(false)
            setTimeout(() => setSocketTimeout(true), 3000)
            socket.emit('DIALOG:TYPING', {dialogId:currentDialogId, partnerId: partner._id})
            if (e.keyCode === 13) {
                fetchSendMessage(value, currentDialogId)
                setValue('')
            }
        }
    }

    useEffect(() => {
        if (user)
            setUserId(user._id)
    }, [user])

    useEffect(() => {
        if (currentDialog) {
            setCurrentDialogId(currentDialog._id)
            setPartner(currentDialog.chatters.filter(user=> user._id !== userId)[0])
        }
            
    }, [currentDialog])

    const onSmileSelect =  ({native}) => setValue(value + native)
    const onChange = (e) => {if (currentDialogId) setValue(e.target.value)}
   
    
    const togglePicker = () => {
        setPickerIsVisible(!pickerIsVisible)
    }

    return <ChatInpuComponent
        onSendMessage = {fetchSendMessage}
        currentDialogId = {currentDialogId}
        handleSendMessage = {handleSendMessage}
        value = {value}
        onSmileSelect = {onSmileSelect}
        onChange={onChange}
        togglePicker={togglePicker}
        pickerIsVisible={pickerIsVisible}
    />
};

export default connect(
    ({ dialogs, user }) => ({
        currentDialog: dialogs.currentDialog,
        user: user.data
    }),
    messagesActions
)(ChatInput);