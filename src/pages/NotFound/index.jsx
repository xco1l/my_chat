import React from 'react';
import { Result } from 'antd'

import { Block, Button } from 'components'

import './NotFound.scss'

const NotFound = ({ history }) => {
    return (
        <section className='not-found'>
            <Block className='not-found__content' >
                <Result
                    status='error'
                    title='404'
                    subTitle='Page not found'
                    extra={<Button kind='primary' size='md' onClick={() => history.pushState('/')}>Home</Button>}
                />
            </Block>
        </section>

    );
};

export default NotFound;