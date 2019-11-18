import React from 'react';
import { Form, Icon, Input } from 'antd'


import './FormInput.scss'


const FormInput = ({
    touched,
    errors,
    isSubmitting,
    handleChange,
    handleBlur,
    placeholder,
    name,
    type,
    icon
}) => {
    return (
        
        <Form.Item
            validateStatus={
                !touched[name] ? '' : isSubmitting ? '' : errors[name] ? 'error' : 'success'
            }
            help={!touched[name] ? '' : errors[name]}
            hasFeedback
        >
        <Input
            id={name}
            type={type}
            size='large'
            prefix={isSubmitting ? (
                <Icon type={icon} style={{ color: 'rgba(#000, 0.25)' }} />
            ) : (
                <Icon type={icon} style={{ color: 'rgba(#000, 0.25)' }} />
            )}
            placeholder={placeholder}
            onChange={handleChange}
            onBlur={handleBlur}
        />
    </Form.Item>
    );
};

export default FormInput;                    