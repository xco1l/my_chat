import React from 'react';
import { Form } from 'antd'

import { Button, Block, FormInput } from 'components'
import { Link } from 'react-router-dom'

const LoginForm = (
    {
        values,
        touched,
        errors,
        isSubmitting,
        handleChange,
        handleBlur,
        handleSubmit,
        handleReset,
        dirty,
    }) => {
    return (
        <div>
            <div className="auth__caption">
                <h2>Log In</h2>
                <p>Please log in</p>
            </div>
            <Block>
                <Form onSubmit={handleSubmit} className='form login-form'>

                    <FormInput
                        name='email'
                        icon='mail'
                        placeholder='E-Mail'
                        handleChange={handleChange}
                        handleBlur={handleBlur}
                        touched={touched}
                        errors={errors}
                    />

                    <FormInput
                        name='password'
                        type='password'
                        icon='lock'
                        placeholder='Password'
                        handleChange={handleChange}
                        handleBlur={handleBlur}
                        touched={touched}
                        errors={errors}
                    />

                    <Form.Item>
                        <Button
                            disabled={isSubmitting}
                            kind='primary'
                            size='md'
                            type='submit'
                        >
                            log in
                    </Button>
                    </Form.Item>
                    <Form.Item className='form__link'>
                        <Link to="/signup">Registration</Link>
                    </Form.Item>
                </Form>
            </Block>
        </div>
    );
};

export default LoginForm;