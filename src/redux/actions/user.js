import { userApi } from 'utils/api'
import { openNotification } from 'utils'


const actions = {
    setUserData: data => ({
        type: 'USER:SET_DATA',
        payload: data
    }),
    setIsAuth: bool => ({
        type: 'USER:SET_IS_AUTH',
        payload: bool
    }),
    fetchUserData: () => dispatch => {
        userApi.me()
            .then(({ data }) => {
                dispatch(actions.setUserData(data))
                dispatch(actions.setIsAuth(true))
            })
            .catch(err => {
                if (err.response.status === 403) {
                  dispatch(actions.setIsAuth(false));
                  delete window.localStorage.token;
                }
              });
    },
    fetchUserSignIn: postData => dispatch => {
        return userApi.signIn(postData).then(({ data }) => {
            const { status, token, message } = data
            if (status !== 'success') {
                openNotification({ message: message, type: status })
            } else {
                openNotification({ message: 'Successful authorization', type: 'success' })
                window.axios.defaults.headers.common.token = token;
                window.localStorage.token = token
                dispatch(actions.fetchUserData())
                dispatch(actions.setIsAuth(true))
            }
            return status
        })
    },
    fetchUserSignUp: postData => dispatch => {
        return userApi.signUp(postData).then(({ data }) => {
            const { status, token, message } = data
            if (status !== 'success') {
                openNotification({ message: message, type: status })
            } else {
                openNotification({ message: 'Successful registration', type: 'success' })
                window.localStorage.token = token
                dispatch(actions.fetchUserData())
            }
            return data
        })
    }
}

export default actions