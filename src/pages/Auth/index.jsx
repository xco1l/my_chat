import React from 'react';
import { Route, Switch } from 'react-router-dom'

import './Auth.scss'
import { NotFound } from 'pages'
import { LoginForm, RegisterForm } from 'modules'
import VerifyEmailInfo from './components/VerifyEmailInfo'



const Auth = (props) => {
    return (
        <section className='auth'>
            <div className="auth__content">
                <Switch >
                    <Route exact path={['/', '/signin']} component={LoginForm} />
                    <Route exact path="/signup" component={RegisterForm} />
                    <Route exact path='/signup/verify' component={VerifyEmailInfo} />
                    <Route path='*' component={NotFound} />
                </Switch>
            </div>
        </section>
    );


};

export default Auth