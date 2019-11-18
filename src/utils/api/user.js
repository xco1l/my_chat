import {axios} from 'core'

export default {
    signIn: postData => axios.post('/user/signin', postData),
    singUp: postData => axios.post('/user/signup', postData),
    verifyUser: hash => axios.get(`/user/verify?hash=${hash}`),
    me: () => axios.get('/user/me')
}