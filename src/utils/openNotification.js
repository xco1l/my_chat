import {notification} from 'antd'
const title = {
    'success': 'Great!',
    'error': 'Erorr!',
    'warning': 'Warning!'
}
export default ({message, type = 'info', duration = 3}) => notification[type] && notification[type]({
    description: message,
    duration,
    message: title[type]
})