import { dialogsApi } from 'utils/api'

const actions = {
    setDialogs: dialogs => ({
        type: 'DIALOGS:SET_DIALOGS',
        payload: dialogs
    }),
    setCurrentDialog: id => ({
        type: 'DIALOGS:SET_CURRENT_DIALOG_BY_ID',
        payload: id
    }),
    fetchDialogs: () => dispatch => {
        dialogsApi.getAll().then(({ data }) => {
            dispatch(actions.setDialogs(data))
        })
    },
    setDialogIsTyping: (payload) => ({
        type: 'DIALOGS:SET_DIALOGS_IS_TYPING',
        payload: payload
    })
}

export default actions