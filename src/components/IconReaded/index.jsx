import React from 'react'
import PropTypes from 'prop-types'


import readedSvg from 'assets/img/readed.svg'
import noReadedSvg from 'assets/img/noreaded.svg'


const IconReaded = ({ isReaded }) => {
    return (
        isReaded ? (
            <img
                className='message__icon'
                src={readedSvg}
                alt="Message readed icon" />
        ) : (
                <img
                    className='message__icon'
                    src={noReadedSvg}
                    alt="Message don't readed icon" />
            )
    )
}

IconReaded.propTypes = {
    isReaded: PropTypes.bool
}
export default IconReaded