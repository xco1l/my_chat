import React from 'react';
import { Input, Button } from 'antd'
import {UploadField} from '@navjobs/upload'
import {Picker} from 'emoji-mart'


import './ChatInput.scss'


const ChatInput = ({ 
    handleSendMessage,  
    onSmileSelect, 
    onChange, 
    value,
    togglePicker,
    pickerIsVisible
}) => {



    return (
        <div className='chat-input'>
            <div className="chat-input__smile-btn">
               {pickerIsVisible &&  <div className="chat-input__picker">
                    <Picker 
                    set='apple'
                    onSelect= {onSmileSelect}
                    />
                </div>}
                <Button type='link' shape='circle' icon='smile' onClick = {togglePicker} />
            </div>
            <Input
                onChange={onChange}
                onKeyUp = {handleSendMessage}
                placeholder='Write a message...'
                size='large'
                value = {value}
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