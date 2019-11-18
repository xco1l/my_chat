import { withFormik } from 'formik'
import store from 'redux/store'


import LoginForm from '../components/LoginForm'
import {userActions} from 'redux/actions'



export default  withFormik({
    mapPropsToValues: () => ({ 
        email: '', 
        password: '' 
    }),
    enableReinitialize: true,
    validate: (values) => {
        let errors = {};

        if (!values.email)
            errors.email = 'Input E-Mail'
        if (!values.password)
            errors.password = 'Input password'

        return errors;
    },
    handleSubmit: (values, { setSubmitting, props }) => {
        store
            .dispatch(userActions.fetchUserSignIn(values))
            .then( status  => {
                console.log(props)
                console.log(status)
                if (status === 'success') {
                  props.history.push('/');
                }
                console.log(props)
                setSubmitting(false);
              })
    },

    displayName: 'LoginForm'
})(LoginForm);