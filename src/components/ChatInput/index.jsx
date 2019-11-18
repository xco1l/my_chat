import React, { useState, useRef } from 'react';
import { Input, Button } from 'antd'
import {UploadField} from '@navjobs/upload'
import {Picker} from 'emoji-mart'


import './ChatInput.scss'


const ChatInput = (props) => {
    const { onSendMessage, currentDialogId } = props
    const handleSendMessage = e => {
        if (e.keyCode === 13) {
            onSendMessage(value, currentDialogId)
            setValue('')
        }
    }

    const [value, setValue] = useState('')
    const [pickerIsVisible, setPickerIsVisible] = useState(false)
    const inputRef = useRef()
    const togglePicker = () => {
        setPickerIsVisible(!pickerIsVisible)
    }

    return (
        <div className='chat-input'>
            <div className="chat-input__smile-btn">
               {pickerIsVisible &&  <div className="chat-input__picker">
                    <Picker 
                    set='apple'
                    onSelect= {({native}) => setValue(value + native)}
                    />
                </div>}
                <Button type='link' shape='circle' icon='smile' onClick = {togglePicker} />
            </div>
            <Input
                onChange={e => setValue(e.target.value)}
                onKeyUp = {handleSendMessage}
                placeholder='Write a message...'
                size='large'
                value = {value}
                ref = {inputRef}
            />
            <div className="chat-input__actions">

                <UploadField
                    onFiles={files => console.log(files)}
                    containerProps={{
                        className: 'chat-input__actions-upload'
                    }}
                    uploadProps={{
                        accept: '.jpg,.jpeg,.png,.gif,.bmp',
                        multiple: true
                    }}
                    
                >
                    <Button type='link' shape='circle' icon='camera' />
                </UploadField>
                    
                    {value ? (
                        <Button type='link' shape='circle' icon="arrow-right" />
                    ) : (
                            <Button type='link' shape='circle' icon='audio' />
                        )}
            </div>
            </div>
            );
        };
        
export default ChatInput;