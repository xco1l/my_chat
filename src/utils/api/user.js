import {axios} from 'core'
import socket from 'core/socket'

export default {
    signIn: postData => axios.post('/user/signin', postData),
    singUp: postData => axios.post('/user/signup', postData),
    verifyUser: hash => axios.get(`/user/verify?hash=${hash}`),
    me: () => axios.get('/user/me', {params: { socketId: socket.id }})
}