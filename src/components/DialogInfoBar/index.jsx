import React, { Fragment } from 'react';
import classNames from 'classnames'
import PropTypes from 'prop-types';

import {Button} from 'antd'

const DialogInfoBar = ({fullname, isOnline}) => {
    //const partner = dialog.chatters.filter(user=> user._id !== userId)[0]
    return (
        <Fragment >
            <h3 className="chat__dialogInfo-userName">
                {fullname}
            </h3>
            <span className={classNames("chat__dialogInfo-status", {
                "chat__dialogInfo-status_online": isOnline
            })}> online </span>

            <Button icon='ellipsis' type='link' shape='circle' className='chat__dialogInfo-options' />
        </Fragment>
    );
};


DialogInfoBar.propTypes = {
    online: PropTypes.bool,
    fullname: PropTypes.string
};
  

export default DialogInfoBar;