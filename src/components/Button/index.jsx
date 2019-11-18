import React from 'react';
import classNames from 'classnames'
import './Button.scss'

const Button = ({className, size, kind, children, ...other}) => {
    return(  
    <button {...other} className = {classNames('button', className, {
        [`button_size-${size}`]: size !== undefined,
        [`button_kind-${kind}`]: kind !== undefined,
    })}>
        {children}
    </button>
)};

export default Button;