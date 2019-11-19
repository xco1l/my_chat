import React, { Fragment } from 'react';
import classNames from 'classnames'
import PropTypes from 'prop-types';

import {Button} from 'antd'

const DialogInfoBar = ({fullname, isOnline, currentDialog}) => {
    //const partner = dialog.chatters.filter(user=> user._id !== userId)[0]
    return (
        currentDialog ? (      <div className="chat__dialogInfo">
            <h3 className="chat__dialogInfo-userName">
                {fullname}
            </h3>
            <span className={classNames("chat__dialogInfo-status", {
                "chat__dialogInfo-status_online": isOnline
            })}> {isOnline ? 'online' : 'Заходил 15 назад'} </span>

            <Button icon='ellipsis' type='link' shape='circle' className='chat__dialogInfo-options' />
        </div>) : null
    );
};


DialogInfoBar.propTypes = {
    online: PropTypes.bool,
    fullname: PropTypes.string
};
  

export default DialogInfoBar;