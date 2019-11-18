import React from 'react';
import { Route } from 'react-router-dom'

import './Auth.scss'
import { LoginForm, RegisterForm } from 'modules'
import VerifyEmailInfo from './components/VerifyEmailInfo'



const Auth = (props) => {
    return (
        <section className='auth'>
            <div className="auth__content">
                <Route exact path = {['/', '/signin']} component = {LoginForm}/>
                <Route exact path = "/signup" component = {RegisterForm}/>
                <Route exact path = '/signup/verify' component = {VerifyEmailInfo} />
            </div>
        </section>
    );


};

export default Auth