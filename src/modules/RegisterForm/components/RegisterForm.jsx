import React from 'react';
import { Link } from 'react-router-dom'
import { Form } from 'antd'

import { Button, Block, FormInput } from 'components'


const RegisterForm = (
    {
        touched,
        errors,
        handleChange,
        handleBlur,
        handleSubmit,

    }) => {
    return (

        <div>
            <div className="auth__caption">
                <h2>Register</h2>
                <p>You need account to join</p>
            </div>
            <Block>
                <Form onSubmit={handleSubmit} className='form reg-form' >
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
                        name='fullname'
                        icon='user'
                        placeholder='Name Surname'
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
                    <FormInput
                        name='repeatPassword'
                        type='password'
                        icon='lock'
                        placeholder='Repeat Password'
                        handleChange={handleChange}
                        handleBlur={handleBlur}
                        touched={touched}
                        errors={errors}
                    />
                    <Form.Item>
                        <Button
                            kind='primary'
                            size='md'
                            type='submit'
                        >
                            Register
                        </Button>
                    </Form.Item>
                    <Form.Item className='form__link'>
                        <Link to="/signin">Log in</Link>
                    </Form.Item>
                </Form>
            </Block>
        </div>
    );
};

export default RegisterForm;