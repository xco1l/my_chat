import React from 'react';
import PropTypes from 'prop-types';
import differnceInMinutes from 'date-fns/differenceInMinutes'
import differenceInHours from 'date-fns/differenceInHours'
import differenceInDays from 'date-fns/differenceInDays'
import format from 'date-fns/format'

import { Button } from 'antd'

const DialogInfoBar = ({ fullname, isOnline, currentDialog, last_seen }) => {
    let lastSeen = ''
    if (differenceInDays(new Date(), new Date(last_seen)) > 7)
        lastSeen = `${format(new Date(last_seen), 'dd.MM.yy')}`
    else if (differenceInDays(new Date(), new Date(last_seen)) >= 2)
        lastSeen = `${differenceInDays(new Date(), new Date(last_seen))} days ago`
    else if (differenceInDays(new Date(), new Date(last_seen)) === 1)
        lastSeen = `yesterday at ${format(new Date(last_seen), 'hh.mm a..aaa')}`
    else if (differenceInHours(new Date(), new Date(last_seen)) >= 2)
        lastSeen = `${differenceInHours(new Date(), new Date(last_seen))} hours ago`
    else if (differenceInHours(new Date(), new Date(last_seen)) === 1)
        lastSeen = `${differenceInHours(new Date(), new Date(last_seen))} hour ago`
    else if (differnceInMinutes(new Date(), new Date(last_seen)) > 10)
        lastSeen = `${differnceInMinutes(new Date(), new Date(last_seen))} minutes ago`
    else
        lastSeen = 'recently'

    return (
        currentDialog ? (<div className="chat__dialogInfo">
            <h3 className="chat__dialogInfo-userName">
                {fullname}
            </h3>
            <span className="chat__dialogInfo-lastSeen">
                last seen {lastSeen}
            </span>

            <Button icon='ellipsis' type='link' shape='circle' className='chat__dialogInfo-options' />
        </div>) : null
    );
};


DialogInfoBar.propTypes = {
    online: PropTypes.bool,
    fullname: PropTypes.string
};


export default DialogInfoBar;