import React, { useEffect, useState } from 'react';
import { Result } from 'antd'

import { userApi } from 'utils/api'
import { Block, Button } from 'components'

const VerifyEmailInfo = ({ location, history }) => {

    const hash = location.search.split('hash=')[1]
    const [verified, setVerified] = useState(false)
    const [status, setStatus] = useState('success')
    const [message, setMessage] = useState('')

    useEffect(() => {
        if (hash) {
            userApi.verifyUser(hash)
                .then( data => {
                    if (data.status=== 'success') {
                        setVerified(true)
                    }
                    setMessage(data.message)
                    setStatus(data.status)
                })
        }
    })

    return (
        <Block >
            <Result
                status={status}
                title={status === 'success' ? 'Great' : 'Error'}
                subTitle={status === 'error' ? message : !verified ? (
                    'A confirmation link has been sent on your email.'
                ) : message}
    extra= {verified ? (<Button kind = 'primary' size = 'md' onClick={() => history.pushState('/signin')}>Log In</Button>) : null}
            />
        </Block>
    );
};

export default VerifyEmailInfo;