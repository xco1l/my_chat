import { withFormik } from 'formik'


import RegisterForm from '../components/RegisterForm'
import {validateForm} from 'utils'
import store from 'redux/store'
import {userActions} from 'redux/actions'



export default withFormik({
    mapPropsToValues: () => ({ 
        email: '', 
        password: '', 
        repeatPassword: '', 
        fullname: ''
    }),
    enableReinitialize: true,
    validate: (values) => {
        let errors = {};

        validateForm({ values, errors})

        return errors;
    },

    handleSubmit: (values, { setSubmitting, props }) => {
        store
        .dispatch(userActions.fetchUserSignUp(values))
        .then(({status}) => {
            setSubmitting(false)
            if (status === 'success')
            setTimeout(()=> {
                props.history.push('/signin')
            }, 100)
                
        })
    },

    displayName: 'BasicForm', // helps with React DevTools
})(RegisterForm);  